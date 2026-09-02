"""Evidências de publicação, usando apenas a biblioteca padrão do Python 3.11+."""

import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import sys
import tarfile
import time
from datetime import datetime, timezone
from html.parser import HTMLParser
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urljoin, urlsplit
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

SITE = Path('html-version')
OUT = Path('evidence')
TAG_PATTERN = r'transparencia-(20\d{2})-([12])'


def clock():
    now = datetime.now(timezone.utc)
    return {'utc': now.isoformat(), 'america_sao_paulo': now.astimezone(
        ZoneInfo('America/Sao_Paulo')).isoformat()}


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def read_json(name):
    return json.loads((OUT / name).read_text(encoding='utf-8'))


def digest(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def prepare():
    mode = os.environ.get('AUDIT_MODE', 'simulacao')
    tag = os.environ.get('AUDIT_TAG', '').strip()
    if mode not in ('simulacao', 'normal', 'oficial'):
        raise ValueError('Modo inválido')
    match = re.fullmatch(TAG_PATTERN, tag) if tag else None
    if (tag and not match) or (mode == 'oficial' and not tag):
        raise ValueError('Use transparencia-AAAA-S, com semestre 1 ou 2')
    if mode == 'normal' and tag:
        raise ValueError('Deploy normal não recebe tag oficial')
    if mode != 'simulacao' and os.environ.get('GITHUB_REF') != 'refs/heads/main':
        raise ValueError('Deploy real permitido somente a partir de main')
    if mode == 'oficial' and os.environ.get('GITHUB_EVENT_NAME') != 'workflow_dispatch':
        raise ValueError('Publicação oficial exige execução manual')
    if not (SITE / 'index.php').is_file():
        raise ValueError('Página inicial index.php ausente')
    if OUT.exists():
        raise ValueError('Diretório evidence já existe; use um checkout limpo')
    for path in SITE.rglob('*'):
        if path.is_symlink() or any(c in str(path) for c in '\n\r\\'):
            raise ValueError('Snapshot não aceita symlinks ou nomes ambíguos')
    pdfs = sorted(p.relative_to(SITE).as_posix() for p in SITE.rglob('*.pdf'))
    reports = pdfs
    if match:
        year, semester = match.groups()
        reports = [p for p in pdfs if re.fullmatch(
            rf'relatorio-.+-{semester}-semestre-{year}\.pdf', Path(p).name)]
        if not reports:
            raise ValueError('Nenhum PDF corresponde ao semestre/ano solicitado')
    source = (SITE / 'index.php').read_text(encoding='utf-8')
    if not reports or any(p not in source for p in reports):
        raise ValueError('Os PDFs do relatório devem estar referenciados em index.php')
    for pdf in reports:
        with (SITE / pdf).open('rb') as stream:
            if stream.read(5) != b'%PDF-':
                raise ValueError('Arquivo de relatório não tem assinatura PDF')
    if len({Path(p).name for p in reports}) != len(reports):
        raise ValueError('PDFs precisam de nomes distintos para anexos da Release')

    run_id = os.environ.get('GITHUB_RUN_ID', 'local')
    attempt = os.environ.get('GITHUB_RUN_ATTEMPT', '1')
    if not re.fullmatch(r'[A-Za-z0-9-]+', run_id + '-' + attempt):
        raise ValueError('Identificador de execução inválido')
    repo = os.environ.get('GITHUB_REPOSITORY', 'local/teste')
    base = os.environ.get('PRODUCTION_URL', 'https://tudobom.com.br').rstrip('/')
    manifest = {
        'schema_version': 1, 'mode': mode, 'official_tag': tag or None,
        'repository': repo,
        'github_actor': os.environ.get('AUDIT_ACTOR', 'local'),
        'github_triggering_actor': os.environ.get('AUDIT_TRIGGERING_ACTOR', 'local'),
        'commit_sha': os.environ.get('GITHUB_SHA', 'local'),
        'branch': os.environ.get('AUDIT_BRANCH', 'local'),
        'ref': os.environ.get('GITHUB_REF', 'local'),
        'run_id': run_id, 'run_number': os.environ.get('GITHUB_RUN_NUMBER', '0'),
        'run_attempt': attempt, 'event': os.environ.get('GITHUB_EVENT_NAME', 'local'),
        'prepared_at': clock(),
        'run_url': f'https://github.com/{repo}/actions/runs/{run_id}/attempts/{attempt}',
        'production_url': base + '/',
        'release_url': f'https://github.com/{repo}/releases/tag/{tag}' if tag else None,
        'report_paths': reports,
        'report_urls': [base + '/' + quote(p) for p in reports],
    }
    marker = SITE / 'auditoria' / f'deploy-{run_id}-{attempt}.json'
    if marker.exists():
        raise ValueError('Marcador desta execução já existe')
    marker.parent.mkdir(exist_ok=True)
    write_json(marker, manifest)
    manifest['marker_path'] = marker.relative_to(SITE).as_posix()
    manifest['marker_url'] = base + '/' + manifest['marker_path']
    OUT.mkdir()
    files = sorted(p for p in SITE.rglob('*') if p.is_file())
    manifest['files'] = [
        {'path': p.relative_to(SITE).as_posix(), 'bytes': p.stat().st_size, 'sha256': digest(p)}
        for p in files
    ]
    (OUT / 'SHA256SUMS.txt').write_text(''.join(
        f"{f['sha256']}  html-version/{f['path']}\n" for f in manifest['files']), encoding='utf-8')
    with tarfile.open(OUT / 'site-snapshot.tar.gz', 'w:gz') as archive:
        archive.add(SITE, arcname='html-version')
    manifest['snapshot_sha256'] = digest(OUT / 'site-snapshot.tar.gz')
    write_json(OUT / 'manifest.json', manifest)
    for report in reports:
        shutil.copyfile(SITE / report, OUT / Path(report).name)
    print(f"Preparado: {mode}; commit {manifest['commit_sha']}; "
          f"actor {manifest['github_actor']}; triggering_actor {manifest['github_triggering_actor']}; "
          f"UTC {manifest['prepared_at']['utc']}; São Paulo {manifest['prepared_at']['america_sao_paulo']}")


def api(path, method='GET', data=None, binary=None):
    # Nunca imprimir token, cabeçalhos de autenticação ou corpo de erros da API.
    repo = os.environ['GITHUB_REPOSITORY']
    url = f'https://api.github.com/repos/{repo}/{path}'
    headers = {'Authorization': 'Bearer ' + os.environ['GH_TOKEN'],
               'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28'}
    body = None
    if binary is not None:
        url = f'https://uploads.github.com/repos/{repo}/{path}'
        headers['Content-Type'] = 'application/octet-stream'
        body = binary
    elif data is not None:
        headers['Content-Type'] = 'application/json'
        body = json.dumps(data).encode()
    with urlopen(Request(url, data=body, headers=headers, method=method), timeout=60) as response:
        return json.load(response)


def ensure_unused(tag):
    for path in (f'git/ref/tags/{tag}', f'releases/tags/{tag}'):
        try:
            api(path)
        except HTTPError as error:
            if error.code != 404:
                raise RuntimeError(f'Não foi possível consultar tag/Release: HTTP {error.code}') from None
        else:
            raise ValueError('Tag/Release já existe; não será sobrescrita')


def preflight():
    manifest = read_json('manifest.json')
    if manifest['mode'] == 'simulacao' or manifest['ref'] != 'refs/heads/main':
        raise ValueError('Preflight de produção exige main e modo real')
    current = api('git/ref/heads/main')['object']['sha']
    if current != manifest['commit_sha']:
        raise ValueError('main avançou; inicie uma nova execução para não publicar versão antiga')
    if manifest['official_tag']:
        ensure_unused(manifest['official_tag'])
    print('Preflight aprovado; ainda não houve FTP')


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.hrefs.extend(value for key, value in attrs if key == 'href' and value)


def fetch(url):
    request = Request(url, headers={'Cache-Control': 'no-cache', 'Accept-Encoding': 'identity',
                                    'User-Agent': 'Tudobom-Publication-Audit/1.0'})
    with urlopen(request, timeout=30) as response:
        final = response.geturl()
        if urlsplit(final).scheme != 'https':
            raise ValueError('Redirecionamento fora de HTTPS')
        if urlsplit(final).hostname not in ('tudobom.com.br', 'www.tudobom.com.br'):
            raise ValueError('Redirecionamento fora do domínio de produção')
        return response.status, response.headers.get('Content-Type', ''), response.read(), final


def validate(attempts=3, delay=5):
    manifest = read_json('manifest.json')
    base = manifest['production_url']
    evidence = {'started_at': clock(), 'success': False, 'checks': []}
    # PHP é executado pelo servidor; seu código-fonte não deve ser baixado por HTTP.
    public = [f for f in manifest['files'] if f['path'].startswith(('assets/', 'css/', 'js/'))
              and Path(f['path']).suffix.lower() not in ('.php', '.md')]
    marker = next(f for f in manifest['files'] if f['path'] == manifest['marker_path'])
    targets = [('', None), (marker['path'], marker['sha256'])]
    targets += [(f['path'], f['sha256']) for f in public]
    try:
        for path, expected in targets:
            url = base + quote(path)
            passed = False
            for attempt in range(1, attempts + 1):
                record = {'url': url, 'attempt': attempt, 'checked_at': clock(), 'success': False}
                try:
                    # A URL sem query também é testada: é a que RH e visitantes usarão.
                    status, content_type, body, final = fetch(url)
                    record.update(http_status=status, content_type=content_type, final_url=final,
                                  sha256=hashlib.sha256(body).hexdigest(), expected_sha256=expected)
                    if status != 200:
                        raise ValueError(f'HTTP {status}, esperado 200')
                    if expected and record['sha256'] != expected:
                        raise ValueError('SHA-256 diferente do snapshot')
                    if not path:
                        (OUT / 'production.html').write_bytes(body)
                        html = body.decode('utf-8')
                        if 'text/html' not in content_type or 'id="transparencia"' not in html or '<?php' in html:
                            raise ValueError('HTML não contém o portal esperado ou expõe PHP')
                        links = Links()
                        links.feed(html)
                        linked_paths = {urlsplit(urljoin(final, h)).path for h in links.hrefs
                                        if urlsplit(urljoin(final, h)).netloc == urlsplit(final).netloc}
                        if any('/' + quote(p) not in linked_paths for p in manifest['report_paths']):
                            raise ValueError('HTML público não contém links para os PDFs esperados')
                    record['success'] = True
                    passed = True
                except (HTTPError, URLError, OSError, ValueError) as error:
                    record['error'] = f'HTTP {error.code}' if isinstance(error, HTTPError) else str(error)
                evidence['checks'].append(record)
                write_json(OUT / 'validation.json', evidence)
                if passed:
                    break
                if attempt < attempts:
                    time.sleep(delay)
            if not passed:
                raise ValueError(f'Validação falhou: {url}')
        evidence['success'] = True
    finally:
        evidence['finished_at'] = clock()
        write_json(OUT / 'validation.json', evidence)
    print(f"Produção validada: {len(targets)} URLs; HTML e hashes registrados")


def seal():
    files = sorted(p for p in OUT.rglob('*') if p.is_file() and p.name != 'EVIDENCE-SHA256SUMS.txt')
    (OUT / 'EVIDENCE-SHA256SUMS.txt').write_text(''.join(
        f'{digest(p)}  {p.relative_to(OUT).as_posix()}\n' for p in files), encoding='utf-8')


def finish():
    manifest = read_json('manifest.json')
    valid = read_json('validation.json') if (OUT / 'validation.json').exists() else {'success': False}
    success = (os.environ.get('FTP_OUTCOME') == 'success'
               and os.environ.get('VALIDATION_OUTCOME') == 'success' and valid['success'])
    status = 'simulacao' if manifest['mode'] == 'simulacao' else 'validado' if success else 'falhou'
    result = {'status': status, 'finished_at': clock(),
              'ftp_outcome': os.environ.get('FTP_OUTCOME', 'skipped'),
              'validation_outcome': os.environ.get('VALIDATION_OUTCOME', 'skipped'),
              'job_status_before_evidence': os.environ.get('JOB_STATUS', 'unknown'),
              'ftp_started_at': read_json('ftp-start.json') if (OUT / 'ftp-start.json').exists() else None,
              'validation_finished_at': valid.get('finished_at')}
    write_json(OUT / 'result.json', result)
    summary = (
        f"## Publicação: {status}\n\n"
        f"- Modo: `{manifest['mode']}`; tag solicitada: `{manifest['official_tag'] or 'nenhuma'}`\n"
        f"- Responsável (`github.actor`): **{manifest['github_actor']}**\n"
        f"- Executor (`github.triggering_actor`): **{manifest['github_triggering_actor']}**\n"
        f"- Commit: `{manifest['commit_sha']}`; branch: `{manifest['branch']}`\n"
        f"- Run: {manifest['run_id']}; número: {manifest['run_number']}; tentativa: {manifest['run_attempt']}; evento: {manifest['event']}\n"
        f"- Preparação UTC: {manifest['prepared_at']['utc']}\n"
        f"- Preparação America/Sao_Paulo: {manifest['prepared_at']['america_sao_paulo']}\n"
        f"- Conclusão UTC: {result['finished_at']['utc']}\n"
        f"- Conclusão America/Sao_Paulo: {result['finished_at']['america_sao_paulo']}\n"
        f"- FTP: {result['ftp_outcome']}; validação: {result['validation_outcome']}\n"
        f"- [Execução]({manifest['run_url']}) | [Produção]({manifest['production_url']})\n\n"
        "Baixe o artifact desta execução: snapshot, manifest, hashes, PDFs, resultado e validação/HTML quando disponíveis.\n\n"
        "Simulação não comprova publicação. Em modo oficial, confira também o job Release; este resumo não comprova sua criação.\n"
    )
    (OUT / 'summary.md').write_text(summary, encoding='utf-8')
    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf-8') as stream:
            stream.write(summary)
    seal()
    print(summary)


def release():
    manifest = read_json('manifest.json')
    tag = manifest['official_tag']
    if (manifest['mode'] != 'oficial' or os.environ.get('AUDIT_MODE') != 'oficial'
            or os.environ.get('GITHUB_EVENT_NAME') != 'workflow_dispatch'
            or os.environ.get('GITHUB_REF') != 'refs/heads/main'
            or not re.fullmatch(TAG_PATTERN, tag or '')
            or tag != os.environ.get('AUDIT_TAG')
            or manifest['commit_sha'] != os.environ['GITHUB_SHA']
            or manifest['run_id'] != os.environ['GITHUB_RUN_ID']
            or manifest['run_attempt'] != os.environ['GITHUB_RUN_ATTEMPT']
            or read_json('result.json')['status'] != 'validado'
            or not read_json('validation.json')['success']):
        raise ValueError('Release exige publicação oficial validada desta execução/commit')
    for line in (OUT / 'EVIDENCE-SHA256SUMS.txt').read_text().splitlines():
        expected, name = line.split('  ', 1)
        path = OUT / name
        if not path.resolve().is_relative_to(OUT.resolve()) or digest(path) != expected:
            raise ValueError('Integridade da evidência inválida')
    ensure_unused(tag)
    # Reserva o nome no commit validado, inclusive se a criação/upload do draft falhar.
    api('git/refs', 'POST', {'ref': f'refs/tags/{tag}', 'sha': manifest['commit_sha']})
    # target_commitish fixa o SHA exato; draft permite anexar tudo antes da imutabilidade.
    draft = api('releases', 'POST', {
        'tag_name': tag, 'target_commitish': manifest['commit_sha'], 'name': tag,
        'draft': True, 'prerelease': False,
        'body': (OUT / 'summary.md').read_text(encoding='utf-8') +
                '\n\nPDFs públicos: ' + ', '.join(manifest['report_urls']) +
                '\n\nHTML capturado e validation.json comprovam as verificações naquela execução; '
                'não atestam disponibilidade contínua.\n',
    })
    for path in sorted(p for p in OUT.rglob('*') if p.is_file()):
        api(f"releases/{draft['id']}/assets?name={quote(path.name)}", 'POST', binary=path.read_bytes())
    published = api(f"releases/{draft['id']}", 'PATCH', {'draft': False, 'make_latest': 'false'})
    immutable = published.get('immutable', False)
    summary = f"\n## Release oficial\n\n[{tag}]({published['html_url']})\n\nImutabilidade GitHub: {immutable}\n"
    if not immutable:
        summary += '\nHabilite release immutability para bloquear alterações em publicações futuras.\n'
    with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf-8') as stream:
        stream.write(summary)
    print(summary)


def main():
    commands = {'prepare': prepare, 'preflight': preflight, 'validate': validate,
                'finish': finish, 'release': release,
                'start': lambda: write_json(OUT / 'ftp-start.json', clock())}
    if len(sys.argv) != 2 or sys.argv[1] not in commands:
        raise ValueError('Use prepare, preflight, start, validate, finish ou release')
    commands[sys.argv[1]]()


if __name__ == '__main__':
    try:
        main()
    except HTTPError as error:
        print(f'Falha de API/HTTP: {error.code}; publicação não concluída', file=sys.stderr)
        sys.exit(1)
    except (ValueError, RuntimeError, OSError, URLError) as error:
        print(f'Falha: {error}', file=sys.stderr)
        sys.exit(1)
