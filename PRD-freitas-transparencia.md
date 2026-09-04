# PRD — Relatórios Freitas na Transparência

## Objetivo

Disponibilizar os relatórios de transparência salarial da Freitas no modal já
existente, sem alterar a estrutura visual, a stack ou o fluxo de publicação.

## Implementação

- Adicionar um box `Freitas` abaixo de `Tudobom Comercial` nas versões HTML/PHP
  e React.
- Publicar os relatórios de 1º semestre de 2026 e 2º semestre de 2025 com nomes
  estáveis e sem acentos.
- Manter o fluxo atual de FTP, que valida automaticamente todos os links de PDF
  presentes em `html-version/index.php`.

## Critérios de aceite

- O box Freitas exibe dois relatórios na ordem 2026, 2025.
- Os downloads apontam para os PDFs correspondentes.
- O conteúdo atual de Tudobom Comercial permanece inalterado.
- O preview local reproduz o modal atualizado.
