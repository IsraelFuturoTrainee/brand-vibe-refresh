# PRD — Simplificação do registro de publicações

## Objetivo

Manter no Git um registro permanente de cada publicação FTP, sem Releases, tags,
hashes, snapshots ou consulta de metadados do FTP.

## Fluxo

1. O Git versiona `html-version/`, incluindo páginas e PDFs.
2. Um push na `main` que altere `html-version/**` executa o FTP.
3. Após o FTP, o workflow captura `https://tudobom.com.br/` e verifica as URLs
   públicas completas dos PDFs referenciados em `html-version/index.php`.
4. O resultado é salvo em `historico-publicacoes/<run-id>/production.html` e
   `registro.json`, que são commitados automaticamente na `main`.

## Registro

`registro.json` guarda data/hora, `github.actor`, `github.triggering_actor`, commit
de origem, URL da execução, URL pública do site e URLs públicas dos PDFs. O commit
de histórico não dispara novo FTP porque o gatilho só observa `html-version/**`.

## Fora do escopo

Os logs nativos de criação/modificação de arquivos no FTP são fornecidos pela
Locaweb e não podem ser comprovados por este repositório.

## Critérios de aceite

- O HTML público e o registro permanecem no Git.
- PDFs indisponíveis impedem a criação do registro, sem alterar o site após o FTP.
- Simulações (PR e execução manual) não usam FTP nem fazem commit.
