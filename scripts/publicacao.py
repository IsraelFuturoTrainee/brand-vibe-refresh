"""Registro permanente de publicações após o deploy FTP."""

import json
import os
from datetime import datetime, timezone
from pathlib import Path
import re
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urljoin, urlsplit
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

SITE = Path('html-version')
HISTORY = Path('historico-publicacoes')
PDF_PATTERN = re.compile(r"['\"]([^'\"]+\.pdf(?:\?[^'\"]*)?)['\"]", re.IGNORECASE)


def clock():
    now = datetime.now(timezone.utc)
    return {
        'utc': now.isoformat(),
        'america_sao_paulo': now.astimezone(ZoneInfo('America/Sao_Paulo')).isoformat(),
    }


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def read_json(path):
    return json.loads(path.read_text(encoding='utf-8'))


def history_dir():
    run_id = os.environ.get('GITHUB_RUN_ID', 'local')
    if not re.fullmatch(r'[A-Za-z0-9-]+', run_id):
        raise ValueError('Identificador de execução inválido')
    return HISTORY / run_id


def published_pdf_urls(index, production_url):
    urls = []
    for value in PDF_PATTERN.findall(index.read_text(encoding='utf-8')):
        parsed = urlsplit(value)
        if parsed.scheme or parsed.netloc:
            raise ValueError('Os PDFs publicados devem usar caminhos relativos do site')
        if not parsed.path or '..' in Path(parsed.path).parts:
            raise ValueError('Caminho de PDF inválido no index.php')
        url = urljoin(production_url, quote(value, safe='/%?=&'))
        if url not in urls:
            urls.append(url)
    return urls


def prepare():
    index = SITE / 'index.php'
    if not index.is_file():
        raise ValueError('Página inicial index.php ausente')

    destination = history_dir()
    if destination.exists():
        raise ValueError('Já existe histórico para esta execução')

    repository = os.environ.get('GITHUB_REPOSITORY', 'local/teste')
    production_url = os.environ.get('PRODUCTION_URL', 'https://tudobom.com.br').rstrip('/') + '/'
    pdf_urls = published_pdf_urls(index, production_url)
    destination.mkdir(parents=True)
    write_json(destination / 'contexto.json', {
        'repository': repository,
        'github_actor': os.environ.get('GITHUB_ACTOR', 'local'),
        'github_triggering_actor': os.environ.get('GITHUB_TRIGGERING_ACTOR', 'local'),
        'commit_sha': os.environ.get('GITHUB_SHA', 'local'),
        'run_id': os.environ.get('GITHUB_RUN_ID', 'local'),
        'run_attempt': os.environ.get('GITHUB_RUN_ATTEMPT', '1'),
        'run_url': f"https://github.com/{repository}/actions/runs/{os.environ.get('GITHUB_RUN_ID', 'local')}",
        'production_url': production_url,
        'public_pdf_urls': pdf_urls,
        'prepared_at': clock(),
    })
    print(f'Histórico preparado em {destination}')


def fetch(url):
    request = Request(url, headers={
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'identity',
        'User-Agent': 'Tudobom-Publication-Register/1.0',
    })
    with urlopen(request, timeout=30) as response:
        final = response.geturl()
        if urlsplit(final).scheme != 'https':
            raise ValueError('Redirecionamento fora de HTTPS')
        if urlsplit(final).hostname not in ('tudobom.com.br', 'www.tudobom.com.br'):
            raise ValueError('Redirecionamento fora do domínio de produção')
        return response.status, response.read(), final


def fetch_with_retry(url, attempts=3, delay=5):
    last_error = None
    for attempt in range(1, attempts + 1):
        try:
            status, body, final_url = fetch(url)
            if status != 200:
                raise ValueError(f'HTTP {status}, esperado 200')
            return body, {'url': url, 'http_status': status, 'final_url': final_url, 'attempt': attempt}
        except (HTTPError, URLError, OSError, ValueError) as error:
            last_error = error
            if attempt < attempts:
                time.sleep(delay)
    detail = f'HTTP {last_error.code}' if isinstance(last_error, HTTPError) else str(last_error)
    raise ValueError(f'URL pública indisponível: {url} ({detail})') from None


def capture(attempts=3, delay=5):
    destination = history_dir()
    context = read_json(destination / 'contexto.json')
    html, page = fetch_with_retry(context['production_url'], attempts, delay)
    (destination / 'production.html').write_bytes(html)

    pdfs = []
    for url in context['public_pdf_urls']:
        _body, result = fetch_with_retry(url, attempts, delay)
        pdfs.append(result)

    registro = {
        'schema_version': 1,
        'recorded_at': clock(),
        'github_actor': context['github_actor'],
        'github_triggering_actor': context['github_triggering_actor'],
        'commit_sha': context['commit_sha'],
        'run_url': context['run_url'],
        'production_url': context['production_url'],
        'public_pdf_urls': context['public_pdf_urls'],
        'production_capture': page,
        'pdf_checks': pdfs,
    }
    write_json(destination / 'registro.json', registro)
    (destination / 'contexto.json').unlink()
    print(f"HTML histórico salvo; PDFs públicos verificados: {len(pdfs)}")


def main():
    commands = {'prepare': prepare, 'capture': capture}
    try:
        commands[sys.argv[1]]()
    except IndexError:
        raise SystemExit('Uso: publicacao.py prepare|capture') from None
    except KeyError:
        raise SystemExit('Comando inválido: use prepare ou capture') from None


if __name__ == '__main__':
    main()
