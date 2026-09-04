# Simplificação do registro de publicações

- [x] Remover Release, tags, hashes, snapshots e consulta FTP.
- [x] Gerar registro histórico após FTP com HTML público e URLs dos PDFs do `index.php`.
- [x] Salvar o histórico automaticamente no Git sem reativar o deploy.
- [x] Cobrir registro, indisponibilidade pública e simulação com testes isolados.
- [x] Executar a verificação final e registrar o resultado.

## Review

Verificação: `python3 -m unittest discover -s tests -p test_publicacao.py -v`
executou 5 testes sem falhas; `git diff --check` não apontou problemas.

# Relatórios Freitas na Transparência

- [x] Validar os dois PDFs recebidos e definir nomes públicos estáveis.
- [x] Adicionar o box Freitas às versões HTML/PHP e React, sem alterar o layout.
- [x] Incluir a verificação de publicação das duas novas URLs.
- [x] Executar testes, validação dos PDFs e preview local.
- [ ] Build e lint: bloqueados no ambiente local ao carregar as ferramentas, sem diagnóstico de código.

## Review

`python3 -m unittest discover -s tests -p test_publicacao.py -v`: 6 testes
aprovados. `git diff --check`: sem problemas. Os quatro PDFs Freitas são PDFs
válidos de uma página e mantêm os hashes dos arquivos recebidos. O preview local
confirmou o box Freitas, a ordem dos relatórios e a rolagem do modal. `bun run
lint`, `bun run build` e `tsc --noEmit` ficaram sem progresso ao inicializar no
ambiente local e foram interrompidos sem emitirem erros do projeto.
