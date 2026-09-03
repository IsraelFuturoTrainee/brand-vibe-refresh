# Registro de publicação — Transparência Salarial

O Git é o histórico das páginas e dos PDFs em `html-version/`. Após cada deploy FTP
bem-sucedido, o workflow cria um registro permanente em
`historico-publicacoes/<run-id>/`:

- `production.html`: HTML obtido de `https://tudobom.com.br/`;
- `registro.json`: data/hora, responsáveis da execução, commit de origem, URL da
  execução, URL pública do site e URLs públicas dos PDFs referenciados no
  `index.php`.

Os PDFs são consultados pelas URLs públicas completas antes do registro ser
commitado. Se a captura ou uma URL falhar, o workflow falha sem criar o commit de
histórico; o FTP já concluído não é desfeito.

Pull requests e execuções manuais são simulações: executam os testes e preparam o
registro localmente, mas não usam FTP nem criam commits. O commit automático de
histórico não dispara outro deploy, pois o gatilho observa apenas `html-version/**`.

Logs nativos de criação e modificação de arquivos no FTP dependem da Locaweb e são
externos a este fluxo.
