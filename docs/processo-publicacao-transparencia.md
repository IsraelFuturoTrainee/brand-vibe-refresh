# Registro de publicação — Transparência Salarial

O workflow mantém somente as evidências necessárias de cada publicação:

1. data e hora em UTC e `America/Sao_Paulo`;
2. commit, branch, execução e versão;
3. usuário responsável (`github.actor`) e usuário que iniciou uma reexecução;
4. backup completo de `html-version/` e cópia do HTML entregue pela página inicial;
5. URL permanente da Release oficial no GitHub.

Ele não valida individualmente assets, CSS, JavaScript ou PDFs e não publica arquivos
de auditoria dentro do site.

## Modos

- `simulacao`: gera o registro e o snapshot como artifact, sem FTP e sem Release.
- `normal`: executa o FTP, captura o HTML publicado e guarda o registro como artifact por 90 dias.
- `oficial`: executa o mesmo fluxo e cria uma tag e uma Release permanente com as evidências.

A publicação oficial deve ser iniciada manualmente na branch `main`, informando uma
versão no formato `transparencia-AAAA-S`, por exemplo `transparencia-2026-1`.

## Evidências

O artifact e a Release contêm:

- `manifest.json`: datas, usuários, commit, branch, execução e URLs;
- `site-snapshot.tar.gz`: backup completo do diretório publicado;
- `production.html`: HTML capturado após o FTP;
- `capture.json`: horário, URL, status e hash da captura;
- `result.json`: resultado e horários do FTP e da captura;
- `SHA256SUMS.txt` e `EVIDENCE-SHA256SUMS.txt`: integridade dos backups;
- `summary.md`: resumo legível da publicação.

O histórico oficial fica em [GitHub Releases](https://github.com/IsraelFuturoTrainee/brand-vibe-refresh/releases).
A URL estável de cada comprovação é:

`https://github.com/IsraelFuturoTrainee/brand-vibe-refresh/releases/tag/transparencia-AAAA-S`

Se o FTP ou a captura do HTML falhar, a Release não é criada. Isso preserva a
evidência de que uma publicação oficial precisa ter sido executada e registrada,
sem transformar o processo em uma auditoria completa do conteúdo público.
