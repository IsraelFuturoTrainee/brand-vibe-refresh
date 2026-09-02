# Publicação auditável — Transparência Salarial

## Fluxo atual e novo

Antes: alteração em `html-version/**` → push na `main` → GitHub Actions →
`locaweb/ftp-deploy@1.0.0` → FTP em `web` → https://tudobom.com.br.

Agora: o mesmo gatilho prepara identificação, manifest, hashes e snapshot → confere
`main` → FTP → valida produção → guarda evidência e resumo. Somente a execução
manual **oficial** cria tag e Release após a validação e o upload do artifact.
O site usa `index.php`: o snapshot contém o código-fonte completo e
`production.html` guarda o HTML recebido de produção.

Permanecem `HOST`, `USER`, `PASS`, `localDir: html-version` e `remoteDir: web`.
A action FTP foi fixada no SHA da mesma versão 1.0.0. Não há exclusão remota,
mudança visual, impressão de secrets ou upload do snapshot para a hospedagem.
Somente um JSON de identificação por execução é acrescentado em
`/auditoria/deploy-RUN_ID-RUN_ATTEMPT.json`, sem modificar as páginas.

## Deploy normal

1. Altere os arquivos necessários em `html-version/` e revise o diff.
2. Faça merge/push na `main`. Alterações apenas em workflow/scripts/docs não publicam o site.
3. Em [Actions](https://github.com/IsraelFuturoTrainee/brand-vibe-refresh/actions/workflows/main.yml), confira o resultado de **Deploy via FTP (Locaweb)**.

Também é possível executar manualmente na `main`, com `modo: normal` e
`publicacao` vazio. Cada deploy registra evidências, mas não cria Release.

## Publicação oficial

1. Adicione o(s) PDF(s) em `html-version/assets/` e os links em `html-version/index.php`.
   Use nomes `relatorio-EMPRESA-S-semestre-AAAA.pdf`, por exemplo
   `relatorio-tudobom-2-semestre-2026.pdf`. O sistema seleciona apenas o ano/semestre
   solicitado; o responsável deve conferir o conteúdo e a competência dos PDFs.
2. Faça merge na `main` e aguarde o deploy normal. Para ensaiar o empacotamento,
   execute **Run workflow**, `modo: simulacao`, `publicacao: transparencia-AAAA-S`.
3. Após a autorização do RH/responsável, execute **Run workflow**, branch `main`,
   `modo: oficial`, `publicacao: transparencia-AAAA-S`. Exemplo: `transparencia-2026-2`.
   Selecionar **oficial** é a confirmação operacional: haverá FTP real e publicação da Release.
4. Confira os dois jobs, **deploy** e **release**, e abra a Release pelo resumo do segundo.

O modo oficial republica o SHA selecionado e valida essa execução antes de criar
a Release; não presume que o deploy anterior aconteceu. PDFs ausentes, tag inválida,
branch diferente de `main`, `main` avançada e tag/Release já existente bloqueiam o fluxo.
Na implantação desta mudança existem PDFs de 2025/1, 2025/2 e 2026/1;
**2026/2 ainda precisa ser adicionado**.

## Onde consultar a evidência

| Informação | Local |
|---|---|
| Logs da publicação | Actions → execução → job **deploy** → passos FTP e validação |
| Responsável e executor de reexecução | Resumo e `manifest.json`: `github_actor`, `github_triggering_actor` |
| Datas UTC e America/Sao_Paulo | `manifest.json` (preparação), `ftp-start.json`, `validation.json` e `result.json` (conclusão) |
| Commit, branch, evento e execução | `manifest.json`, incluindo SHA, ref, run ID, run number e run attempt |
| Snapshot completo e hashes | Artifact `publicacao-RUN_ID-RUN_ATTEMPT`: `site-snapshot.tar.gz`, `SHA256SUMS.txt` e `EVIDENCE-SHA256SUMS.txt` |
| HTML que produção devolveu | `production.html`; horários, URLs, status HTTP e hashes em `validation.json` |
| Histórico oficial permanente | [Releases](https://github.com/IsraelFuturoTrainee/brand-vibe-refresh/releases), com tag vinculada ao SHA exato |

Cada Release recebe snapshot, manifest, ambas as listas SHA-256, PDF(s) do período,
HTML capturado, validação, resultado e resumo. A URL de comprovação oficial é
`https://github.com/IsraelFuturoTrainee/brand-vibe-refresh/releases/tag/transparencia-AAAA-S`.
As URLs públicas dos PDFs constam em `manifest.json` e na descrição da Release.

Os artifacts solicitam **90 dias** de retenção, sujeitos à política/cota do GitHub.
Não são arquivo histórico permanente. Releases não usam essa expiração de artifacts.
O repositório é público: não adicione credenciais reais ou documentos sigilosos a
`html-version/`, pois o snapshot oficial também será público.

## Congelamento das Releases

O workflow nunca atualiza tags ou Releases existentes. Reserva a tag e cria um draft no SHA exato,
anexa todos os arquivos e só então publica. Para bloquear alterações por outros
usuários/ferramentas, o administrador deve habilitar **Settings → General → Releases →
Enable release immutability**, antes da primeira publicação oficial. Essa configuração
não é feita pelo workflow. O job Release informa se a publicação ficou imutável.
Sem ela, há versionamento e hashes, mas usuários com permissão ainda podem alterar
uma Release pelo GitHub. Use contas individuais: `actor` pode ser um bot/Lovable,
e identifica a conta, não comprova sozinho qual pessoa operou uma conta compartilhada.

Fontes: [imutabilidade](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/establish-provenance-and-integrity/prevent-release-changes)
e [retenção dos artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data).

## Validação pública e falhas

O workflow exige HTTPS/HTTP 200 na página inicial, portal de transparência e links
dos PDFs esperados. Compara SHA-256 do marcador desta execução e de todos os arquivos
em `assets/`, `css/` e `js/` (exceto PHP/Markdown). Usa as URLs públicas sem query,
com até três tentativas por URL; conteúdo antigo em cache também causa falha.
Os códigos PHP ficam no snapshot e não são requisitados como código-fonte por HTTP.
A captura do HTML não executa JavaScript nem equivale a um teste visual do navegador.

Para conferir manualmente, abra https://tudobom.com.br, clique em **Transparência**
e baixe o PDF do período. Compare seu hash com o `SHA256SUMS.txt` da Release.
Para verificar tudo que foi baixado do artifact/Release, em Linux:

```bash
sha256sum -c EVIDENCE-SHA256SUMS.txt
tar -xzf site-snapshot.tar.gz
sha256sum -c SHA256SUMS.txt
```

No macOS, use `shasum -a 256 -c` no lugar de `sha256sum -c`.
Esses comandos devem ser executados em uma pasta vazia de auditoria, nunca sobre
o checkout ou diretamente na hospedagem.

Se a validação falhar, o job falha e não cria Release; o artifact preserva as
evidências disponíveis. Se o FTP falhar, não há afirmação de publicação validada.
FTP não é atômico: uma falha pode deixar arquivos parcialmente atualizados; não há
rollback automático. Corrija a causa e execute um novo deploy da `main` atual.

Se a criação da Release falhar, a tag pode permanecer reservada no SHA validado;
se o upload dos anexos falhar, o draft permanece sem publicação.
Um responsável deve conferir o draft e completar os anexos a partir do artifact
original, verificando SHA/execução e hashes antes de publicar. O workflow não apaga,
sobrescreve nem retoma automaticamente uma tag/Release já existente. Reexecutar
somente o job Release não reutiliza artifacts de outra tentativa: use o artifact
original para recuperação manual. Uma correção após publicação exige novo registro
e convenção de versão acordada; este fluxo aceita apenas uma Release por semestre.

## Testar sem publicar

1. No PR, confira o job de simulação: executa testes e gera artifact, sem FTP/Release.
2. Localmente, rode `python3 -m unittest discover -s tests -p test_publicacao.py -v`
   com Python 3.11+. Todos os testes usam diretórios temporários e respostas simuladas.
3. Depois do merge, use **Run workflow → simulacao**, deixando `publicacao` vazio
   para ensaiar deploy normal ou usando um período existente para ensaiar o oficial.

O merge deste PR não dispara FTP, pois não altera `html-version/**`.
A simulação testa empacotamento e cenários de sucesso/falha, mas não comprova as
credenciais FTP nem a integração real com a hospedagem. O primeiro teste completo
de FTP requer um deploy real autorizado. Não use **normal** ou **oficial** como teste sem publicação.

## O que depende da Locaweb e limites da comprovação

- Logs FTP nativos (conta, IP, horário de início/fim e arquivos) e sua retenção.
- Backup/restauração da hospedagem: configurações, arquivos remotos fora do Git,
  dados de formulários/uploads e alterações manuais. O snapshot é do pacote enviado,
  não um backup prévio do servidor.
- Política de cache e disponibilidade HTTPS. A action FTP existente não força TLS
  e desativa a verificação do certificado FTP; a configuração foi preservada.
  Um eventual endurecimento de FTPS depende de verificar o suporte da hospedagem.

As datas de preparação não são apresentadas como data de publicação. A evidência
registra início do FTP e momento da verificação pública, sem inventar a hora exata
em que cada arquivo se tornou acessível. Comprova o observado naquela execução,
não disponibilidade contínua nem publicações anteriores à implantação.
Deploys são serializados; o GitHub pode substituir uma execução ainda pendente por
outra mais recente. Commit sem execução bem-sucedida não é prova de publicação.
