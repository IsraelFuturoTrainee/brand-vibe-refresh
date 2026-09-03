# Simplificação do registro de publicações

- [x] Remover Release, tags, hashes, snapshots e consulta FTP.
- [x] Gerar registro histórico após FTP com HTML público e URLs dos PDFs do `index.php`.
- [x] Salvar o histórico automaticamente no Git sem reativar o deploy.
- [x] Cobrir registro, indisponibilidade pública e simulação com testes isolados.
- [x] Executar a verificação final e registrar o resultado.

## Review

Verificação: `python3 -m unittest discover -s tests -p test_publicacao.py -v`
executou 5 testes sem falhas; `git diff --check` não apontou problemas.
