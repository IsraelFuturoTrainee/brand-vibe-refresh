# Bom Design

"Quero que você recrie o site institucional da minha empresa baseado na estrutura e conteúdo do site http://tudobom.com.br. O layout deve ser moderno, corporativo, totalmente responsivo (mobile-friendly) e seguir a ordem exata de seções do original (Header, Banner/Hero, Sobre Nós com Missão/Visão/Valores, Estrutura/Logística, Atuação, Marcas de Importação/Distribuição e Rodapé com Fale Conosco).

⚠️ DIRETRIZES DE DESIGN E PALETA DE CORES: Use como referência obrigatória para a identidade visual o arquivo em anexo (logo tb verde AZUL DENTRO 2 (4)_2.jpg). Siga estritamente as regras abaixo:

Logotipo: Utilize o logo em anexo no cabeçalho e no rodapé.

Cor Principal / Corporativa: Azul Marinho Escuro (extraído do 'tb' interno do logo). Use em elementos estruturais como o menu do cabeçalho, títulos de seções, rodapé e blocos institucionais de destaque.

Cor de Destaque (Accent): Verde Neon/Lima (extraído do fundo do ícone e do texto 'tudobom'). Use em botões de ação (CTAs), hovers, ícones de tópicos e detalhes pontuais que precisem de atenção.

Fundo do Site: NÃO use fundo preto no site. O fundo geral do site deve ser limpo e claro (branco ou cinza corporativo bem suave) para garantir excelente leitura e um visual leve. Algumas seções específicas de destaque podem usar o fundo Azul Marinho Escuro com texto branco.

Textos: Garanta legibilidade máxima, usando o Azul Marinho Escuro para a maior parte dos textos sobre fundo claro.

Marcas: Mantenha os espaços para as marcas nacionais e importadas distribuídas (como Sadia, Perdigão, Nestlé, etc.). Na seção sobre a marca própria, escreva obrigatoriamente ébom em letras minúsculas.

Use componentes modernos com cantos levemente arredondados que combinem com o formato do ícone da logo, e crie placeholders organizados para os logotipos e fotos."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a40ed380-a9e5-4d77-87d5-c48387c51bb5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Como preparar o relatório de publicação para o RH

Após uma publicação bem-sucedida em produção, o workflow **Deploy via FTP
(Locaweb)** grava automaticamente as evidências em
`historico-publicacoes/<ID_DO_WORKFLOW>/` e as envia para a branch `main`.

Antes de redigir o relatório, confirme no GitHub Actions que a execução está com
o status **Success**. Em seguida, abra a pasta cujo ID é o mesmo da execução e
consulte:

- `registro.json`: data/hora do registro, usuário que acionou a execução,
  commit publicado, link para os logs, site de produção e URLs dos PDFs
  verificadas;
- `production.html`: cópia da página pública capturada após o deploy.

O campo `recorded_at.america_sao_paulo` é a referência de data/hora de
conclusão da publicação: ele é registrado após o FTP, a captura da página e a
verificação das URLs públicas. Não o apresente como horário nativo de gravação
do servidor FTP. Os logs técnicos completos continuam no link `run_url`.

### Dados a copiar

| Informação | Onde encontrar |
| --- | --- |
| Data e hora | `registro.json` → `recorded_at.america_sao_paulo` |
| Logs de publicação | `registro.json` → `run_url` |
| Commit e histórico da alteração | `registro.json` → `commit_sha`; abrir o commit no GitHub |
| Usuário que acionou a publicação | `registro.json` → `github_actor` |
| Usuário que iniciou novamente a execução, se aplicável | `registro.json` → `github_triggering_actor` |
| Arquivos/URLs confirmados | `registro.json` → `public_pdf_urls` e `pdf_checks` |
| Cópia histórica da página | `production.html` na mesma pasta |

Para identificar o autor de uma alteração, abra o `commit_sha` no GitHub. O
campo `github_actor` identifica quem acionou o workflow, o que pode ser uma
pessoa diferente do autor do commit.

### Texto pronto — cinco critérios do RH

Copie o modelo abaixo e substitua somente os campos entre colchetes com os
dados do `registro.json` e do GitHub.

> **Relatório de Publicação — [nome da atualização]**
>
> **1. Data, hora e logs de publicação**<br>
> A publicação foi registrada em **[recorded_at.america_sao_paulo]**, após a
> conclusão do deploy, da captura da página pública e da validação dos links.
> Os logs completos da execução estão disponíveis em **[run_url]**.
>
> **2. Histórico de criação/modificação de páginas**<br>
> A versão publicada corresponde ao commit **[commit_sha]**. O histórico desse
> commit no GitHub identifica os arquivos e as alterações incluídas na
> publicação.
>
> **3. Registro no CMS**<br>
> O site é mantido em código versionado no GitHub e publicado pelo GitHub
> Actions via FTP. Não é utilizado CMS tradicional, como WordPress, Wix ou
> Drupal, para esta publicação.
>
> **4. Upload, responsável e versionamento**<br>
> As URLs públicas verificadas após o deploy são: **[public_pdf_urls]**. O
> workflow foi acionado por **[github_actor]** [e reiniciado por
> **github_triggering_actor**, se diferente]. O autor da alteração é
> **[autor exibido no commit_sha]**. O GitHub preserva o histórico de versões e
> permite restaurar um commit anterior quando necessário.
>
> **5. Backup e arquivos HTML históricos**<br>
> O repositório GitHub é o backup histórico do código e dos arquivos. A cópia
> da página publicada está arquivada em
> **historico-publicacoes/[ID_DO_WORKFLOW]/production.html**; o respectivo
> registro, com data de criação, está em `registro.json` na mesma pasta.

### Limites do registro

O workflow comprova a execução, a validação pública e o estado capturado após o
deploy. Logs nativos de criação/modificação no servidor FTP dependem da
Locaweb e não são gerados pelo repositório.
