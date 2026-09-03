"""Testes isolados: nenhuma chamada real ao FTP, Git ou GitHub."""

import contextlib
import importlib.util
import io
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError

spec = importlib.util.spec_from_file_location(
    'publicacao', Path(__file__).resolve().parents[1] / 'scripts/publicacao.py')
publication = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publication)


class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        previous = Path.cwd()
        os.chdir(self.tmp.name)
        self.addCleanup(os.chdir, previous)
        self.env = patch.dict(os.environ, {
            'GITHUB_REPOSITORY': 'owner/repo', 'GITHUB_ACTOR': 'autor',
            'GITHUB_TRIGGERING_ACTOR': 'executor', 'GITHUB_SHA': 'a' * 40,
            'GITHUB_RUN_ID': '123', 'GITHUB_RUN_ATTEMPT': '2',
            'PRODUCTION_URL': 'https://tudobom.com.br',
        }, clear=True)
        self.env.start()
        self.addCleanup(self.env.stop)
        self.stdout = contextlib.redirect_stdout(io.StringIO())
        self.stdout.__enter__()
        self.addCleanup(self.stdout.__exit__, None, None, None)
        Path('html-version/assets').mkdir(parents=True)
        Path('html-version/index.php').write_text("""<?php
$reports = [
  ['url' => 'assets/relatorio 2026.pdf'],
  ['url' => 'assets/relatorio-2025.pdf'],
];
""", encoding='utf-8')

    def response(self, url):
        responses = {
            'https://tudobom.com.br/': b'<html><body>HTML publicado</body></html>',
            'https://tudobom.com.br/assets/relatorio%202026.pdf': b'%PDF-1.4 2026',
            'https://tudobom.com.br/assets/relatorio-2025.pdf': b'%PDF-1.4 2025',
        }
        if url not in responses:
            raise AssertionError(f'URL inesperada: {url}')
        return 200, responses[url], url

    def test_capture_saves_html_and_complete_pdf_urls_in_permanent_record(self):
        publication.prepare()
        with patch.object(publication, 'fetch', side_effect=self.response):
            publication.capture(attempts=1, delay=0)

        directory = Path('historico-publicacoes/123')
        self.assertEqual((directory / 'production.html').read_bytes(), b'<html><body>HTML publicado</body></html>')
        registro = json.loads((directory / 'registro.json').read_text(encoding='utf-8'))
        self.assertTrue(registro['recorded_at']['utc'].endswith('+00:00'))
        self.assertEqual(registro['github_actor'], 'autor')
        self.assertEqual(registro['github_triggering_actor'], 'executor')
        self.assertEqual(registro['commit_sha'], 'a' * 40)
        self.assertEqual(registro['run_url'], 'https://github.com/owner/repo/actions/runs/123')
        self.assertEqual(registro['production_url'], 'https://tudobom.com.br/')
        self.assertEqual(registro['public_pdf_urls'], [
            'https://tudobom.com.br/assets/relatorio%202026.pdf',
            'https://tudobom.com.br/assets/relatorio-2025.pdf',
        ])
        self.assertEqual([item['http_status'] for item in registro['pdf_checks']], [200, 200])
        self.assertFalse((directory / 'contexto.json').exists())

    def test_unavailable_public_url_fails_without_creating_record(self):
        publication.prepare()
        with patch.object(publication, 'fetch', side_effect=HTTPError('url', 503, 'error', {}, None)):
            with self.assertRaisesRegex(ValueError, 'URL pública indisponível'):
                publication.capture(attempts=1, delay=0)

        directory = Path('historico-publicacoes/123')
        self.assertFalse((directory / 'registro.json').exists())

    def test_simulation_prepares_only_local_files_without_ftp_or_git(self):
        publication.prepare()
        directory = Path('historico-publicacoes/123')
        self.assertTrue((directory / 'contexto.json').exists())
        self.assertFalse((directory / 'production.html').exists())
        self.assertFalse((directory / 'registro.json').exists())

    def test_workflow_runs_ftp_and_history_commit_only_on_push(self):
        workflow = (Path(__file__).resolve().parents[1] / '.github/workflows/main.yml').read_text()
        self.assertEqual(workflow.count("if: github.event_name == 'push'"), 3)
        self.assertNotIn('upload-artifact', workflow)
        self.assertNotIn('release', workflow.lower())

    def test_rejects_external_or_unsafe_pdf_paths(self):
        Path('html-version/index.php').write_text("<?php $x = 'https://elsewhere.example/report.pdf';")
        with self.assertRaisesRegex(ValueError, 'caminhos relativos'):
            publication.prepare()
        Path('html-version/index.php').write_text("<?php $x = '../private/report.pdf';")
        with self.assertRaisesRegex(ValueError, 'inválido'):
            publication.prepare()


if __name__ == '__main__':
    unittest.main()
