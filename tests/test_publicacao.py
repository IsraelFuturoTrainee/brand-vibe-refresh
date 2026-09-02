"""Testes isolados: nenhuma chamada à Locaweb, FTP ou GitHub real."""

import contextlib
import importlib.util
import io
import json
import os
from pathlib import Path
import tarfile
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError

spec = importlib.util.spec_from_file_location('publicacao', Path(__file__).resolve().parents[1] / 'scripts/publicacao.py')
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)


class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        previous = Path.cwd()
        os.chdir(self.tmp.name)
        self.addCleanup(os.chdir, previous)
        self.env = patch.dict(os.environ, {
            'AUDIT_MODE': 'oficial', 'AUDIT_TAG': 'transparencia-2026-1',
            'GITHUB_REF': 'refs/heads/main', 'AUDIT_BRANCH': 'main',
            'GITHUB_SHA': 'a' * 40, 'GITHUB_RUN_ID': '123', 'GITHUB_RUN_NUMBER': '8',
            'GITHUB_RUN_ATTEMPT': '2', 'GITHUB_EVENT_NAME': 'workflow_dispatch',
            'GITHUB_REPOSITORY': 'owner/repo', 'AUDIT_ACTOR': 'autor',
            'AUDIT_TRIGGERING_ACTOR': 'executor', 'GITHUB_STEP_SUMMARY': 'summary.md',
        }, clear=True)
        self.env.start()
        self.addCleanup(self.env.stop)
        self.stdout = contextlib.redirect_stdout(io.StringIO())
        self.stdout.__enter__()
        self.addCleanup(self.stdout.__exit__, None, None, None)
        self.pdf = 'assets/relatorio-tudobom-1-semestre-2026.pdf'
        Path('html-version/assets').mkdir(parents=True)
        Path('html-version/css').mkdir()
        Path('html-version/index.php').write_text('<?php /* ' + self.pdf + ' */ ?>')
        Path('html-version/config.php').write_text('<?php return [];')
        Path('html-version/.htaccess').write_text('Options -Indexes')
        Path('html-version/css/style.css').write_text('body {color: black}')
        Path('html-version', self.pdf).write_bytes(b'%PDF-1.4\ntest')

    def response(self, url):
        base = 'https://tudobom.com.br/'
        if url == base:
            body = f'<html><div id="transparencia"><a href="{self.pdf}">PDF</a></div></html>'.encode()
            return 200, 'text/html; charset=utf-8', body, url
        return 200, 'application/octet-stream', Path('html-version', url.removeprefix(base)).read_bytes(), url

    def validated(self):
        audit.prepare()
        with patch.object(audit, 'fetch', side_effect=self.response):
            audit.validate(attempts=1, delay=0)
        os.environ.update(FTP_OUTCOME='success', VALIDATION_OUTCOME='success')
        audit.finish()

    def test_snapshot_metadata_hashes_and_hidden_files(self):
        audit.prepare()
        manifest = audit.read_json('manifest.json')
        self.assertEqual(manifest['github_actor'], 'autor')
        self.assertEqual(manifest['github_triggering_actor'], 'executor')
        self.assertEqual(manifest['run_attempt'], '2')
        self.assertTrue(manifest['prepared_at']['utc'].endswith('+00:00'))
        self.assertTrue(manifest['prepared_at']['america_sao_paulo'].endswith('-03:00'))
        with tarfile.open('evidence/site-snapshot.tar.gz') as archive:
            self.assertIn('html-version/.htaccess', archive.getnames())
            for entry in manifest['files']:
                body = archive.extractfile('html-version/' + entry['path']).read()
                self.assertEqual(audit.hashlib.sha256(body).hexdigest(), entry['sha256'])
        self.assertEqual(audit.digest(Path('evidence/site-snapshot.tar.gz')), manifest['snapshot_sha256'])

    def test_missing_semester_stops_before_snapshot(self):
        os.environ['AUDIT_TAG'] = 'transparencia-2026-2'
        with self.assertRaisesRegex(ValueError, 'Nenhum PDF'):
            audit.prepare()
        self.assertFalse(Path('evidence').exists())

    def test_invalid_tag(self):
        os.environ['AUDIT_TAG'] = 'transparencia-2026-3; echo unsafe'
        with self.assertRaises(ValueError):
            audit.prepare()

    def test_non_main_cannot_deploy(self):
        os.environ['GITHUB_REF'] = 'refs/heads/feature'
        with self.assertRaisesRegex(ValueError, 'main'):
            audit.prepare()

    def test_official_cannot_be_automatic(self):
        os.environ['GITHUB_EVENT_NAME'] = 'push'
        with self.assertRaisesRegex(ValueError, 'manual'):
            audit.prepare()

    def test_simulation_never_calls_api(self):
        os.environ.update(AUDIT_MODE='simulacao', GITHUB_REF='refs/heads/test')
        with patch.object(audit, 'api') as api:
            audit.prepare()
            audit.finish()
            api.assert_not_called()
        self.assertEqual(audit.read_json('result.json')['status'], 'simulacao')
        self.assertFalse(Path('evidence/production.html').exists())

    def test_success_captures_html_and_never_requests_php_source(self):
        self.validated()
        self.assertTrue(Path('evidence/production.html').exists())
        self.assertEqual(audit.read_json('result.json')['status'], 'validado')
        urls = [c['url'] for c in audit.read_json('validation.json')['checks']]
        self.assertFalse(any('.php' in u for u in urls))

    def test_hash_mismatch_fails_and_keeps_evidence(self):
        audit.prepare()
        Path('html-version', self.pdf).write_bytes(b'%PDF-1.4\nwrong version')
        with patch.object(audit, 'fetch', side_effect=self.response):
            with self.assertRaisesRegex(ValueError, 'Validação falhou'):
                audit.validate(attempts=1, delay=0)
        self.assertFalse(audit.read_json('validation.json')['success'])
        os.environ.update(FTP_OUTCOME='success', VALIDATION_OUTCOME='failure')
        audit.finish()
        self.assertEqual(audit.read_json('result.json')['status'], 'falhou')
        self.assertTrue(Path('evidence/EVIDENCE-SHA256SUMS.txt').exists())

    def test_stale_marker_fails(self):
        audit.prepare()
        Path('html-version', audit.read_json('manifest.json')['marker_path']).write_text('{}')
        with patch.object(audit, 'fetch', side_effect=self.response), self.assertRaises(ValueError):
            audit.validate(attempts=1, delay=0)

    def test_http_200_without_report_link_fails(self):
        audit.prepare()
        response = (200, 'text/html', b'<div id="transparencia"></div>', 'https://tudobom.com.br/')
        with patch.object(audit, 'fetch', return_value=response), self.assertRaises(ValueError):
            audit.validate(attempts=1, delay=0)

    def test_http_error_retries_then_fails(self):
        audit.prepare()
        with patch.object(audit, 'fetch', side_effect=HTTPError('url', 503, 'error', {}, None)) as fetch:
            with self.assertRaises(ValueError):
                audit.validate(attempts=2, delay=0)
            self.assertEqual(fetch.call_count, 2)
        self.assertEqual(audit.read_json('validation.json')['checks'][0]['error'], 'HTTP 503')

    def test_preflight_rejects_advanced_main(self):
        audit.prepare()
        with patch.object(audit, 'api', return_value={'object': {'sha': 'b' * 40}}):
            with self.assertRaisesRegex(ValueError, 'main avançou'):
                audit.preflight()

    def test_tag_exists_and_permission_errors_block(self):
        with patch.object(audit, 'api', return_value={}):
            with self.assertRaisesRegex(ValueError, 'já existe'):
                audit.ensure_unused('transparencia-2026-1')
        with patch.object(audit, 'api', side_effect=HTTPError('url', 403, 'forbidden', {}, None)):
            with self.assertRaises(RuntimeError):
                audit.ensure_unused('transparencia-2026-1')

    def test_release_uploads_before_publishing_at_exact_commit(self):
        self.validated()
        calls = []

        def fake_api(path, method='GET', data=None, binary=None):
            calls.append((path, method, data, binary))
            if method == 'GET':
                raise HTTPError('url', 404, 'missing', {}, None)
            if path == 'releases':
                return {'id': 42}
            return {'html_url': 'https://github.com/owner/repo/releases/tag/test', 'immutable': True}

        with patch.object(audit, 'api', side_effect=fake_api):
            audit.release()
        creation = next(c for c in calls if c[0] == 'releases')
        tag_creation = next(c for c in calls if c[0] == 'git/refs')
        self.assertEqual(tag_creation[2]['sha'], 'a' * 40)
        self.assertEqual(creation[2]['target_commitish'], 'a' * 40)
        self.assertTrue(creation[2]['draft'])
        self.assertEqual(calls[-1][1], 'PATCH')
        self.assertFalse(calls[-1][2]['draft'])
        self.assertTrue(any(self.pdf.split('/')[-1] in c[0] for c in calls))

    def test_tampered_evidence_blocks_release_without_api(self):
        self.validated()
        Path('evidence/production.html').write_text('changed')
        with patch.object(audit, 'api') as api, self.assertRaisesRegex(ValueError, 'Integridade'):
            audit.release()
        api.assert_not_called()

    def test_upload_failure_leaves_unpublished_draft(self):
        self.validated()
        calls = []

        def fake_api(path, method='GET', data=None, binary=None):
            calls.append(method)
            if method == 'GET':
                raise HTTPError('url', 404, 'missing', {}, None)
            if path == 'releases':
                return {'id': 42}
            if path == 'git/refs':
                return {}
            raise OSError('upload failed')

        with patch.object(audit, 'api', side_effect=fake_api), self.assertRaises(OSError):
            audit.release()
        self.assertNotIn('PATCH', calls)


if __name__ == '__main__':
    unittest.main()
