# Plano — Site institucional Tudobom

Recriar o site http://tudobom.com.br com layout moderno, corporativo e responsivo, seguindo a paleta da logo (azul-marinho + verde neon), fundo claro, cantos suavemente arredondados e a mesma ordem de seções do original.

## Identidade visual

- **Logo**: enviada pelo usuário, usada em Header e Footer (subida como asset via lovable-assets a partir de `/mnt/user-uploads/logo_tb_verde_AZUL_DENTRO_2_4.png`).
- **Paleta** (tokens em `src/styles.css`):
  - `--primary` Azul Marinho Escuro (aprox. `oklch(0.22 0.08 265)` — cor do "tb" interno) → menu, títulos, rodapé, blocos institucionais de destaque.
  - `--accent` Verde Neon/Lima (aprox. `oklch(0.86 0.28 145)`) → CTAs, hovers, ícones de tópicos, detalhes pontuais.
  - `--background` branco / `--muted` cinza corporativo suave. **Sem fundo preto.**
  - Texto padrão em azul-marinho sobre fundo claro; branco sobre blocos azul-marinho.
- **Tipografia**: par moderno corporativo (ex.: Sora display + Inter body), carregado via `<link>` no `__root.tsx`.
- **Raio**: `--radius` levemente arredondado (~`0.75rem`) para combinar com o quadrado inclinado do ícone da logo.

## Estrutura de rotas (TanStack Start)

Single-page institucional em `src/routes/index.tsx` com âncoras para navegação suave entre seções, além de rotas dedicadas com metadados próprios para compartilhamento:

- `/` — home com todas as seções na ordem original.
- Âncoras: `#sobre`, `#estrutura`, `#atuacao`, `#marcas`, `#contato`.
- `head()` da home: title/description específicos + og:title/description + og:image apontando para a logo/hero.

Componentes ficam em `src/components/site/` (Header, Hero, Sobre, MissaoVisaoValores, Cultura, Estrutura, Logistica, Atuacao, MarcasImportadas, MarcasDistribuicao, Contato, Footer).

## Seções (ordem exata do original)

1. **Header fixo** — fundo azul-marinho, logo à esquerda, menu (Sobre, Estrutura, Atuação, Marcas, Contato) em branco com hover verde neon; menu hambúrguer no mobile (Sheet do shadcn).
2. **Hero / Banner** — carrossel (shadcn `carousel`) com 3–5 slides placeholder (`data-lov-image-placeholder`) sobre o negócio: institucional, importação, marcas parceiras. CTA verde neon "Fale Conosco" → `#contato`.
3. **Sobre Nós — A Empresa** — texto institucional (fundação 2002, Coronel Fabriciano, 15.600 m², capacidade de armazenagem congelados/resfriados/seco, importação, lançamento da marca própria **ébom** em 2019 — sempre em minúsculas). Card lateral com a logo.
4. **Missão / Visão / Valores** — 3 cards com ícones (lucide) em círculos verde neon sobre fundo claro; título em azul-marinho.
5. **Cultura** — grid com os 12 princípios como chips/itens com bullet verde neon.
6. **Estrutura** — galeria responsiva de fotos (placeholders da sede/armazém).
7. **Equipe** — bloco de texto sobre trabalho em equipe, com fundo azul-marinho e texto branco (uso pontual do fundo escuro permitido pelas diretrizes).
8. **Logística** — texto + destaque numérico (62 caminhões, tecnologia de rastreio) em cards com ícones verde neon.
9. **Atuação** — mapa (placeholder de imagem do mapa de Minas Gerais / regiões atendidas) + lista de estados/regiões.
10. **Marcas Importadas** — grid de logos em cards brancos com sombra suave (placeholders numerados Bandeira 1–9).
11. **Marcas de Distribuição** — grid de logos nacionais/internacionais em placeholders (Sadia, Perdigão, Nestlé, BRF, Bunge, Andorinha, Maguary, etc.), incluindo destaque para a marca própria **ébom** (sempre minúsculas, tipografia levemente maior).
12. **Fale Conosco (Contato)** — formulário (Nome, E-mail, Telefone, Assunto select, Mensagem) com botão verde neon; ao lado: telefone (31) 3841-9200, e-mail tudobom@tudobom.com.br, links Facebook/Instagram. Envio: apenas UI + `toast` de confirmação (sem backend nesta iteração).
13. **Footer** — fundo azul-marinho, logo, navegação repetida, contatos, redes sociais, copyright.

## Placeholders de imagem

Todas as imagens da versão original serão substituídas por placeholders organizados usando `data-lov-image-placeholder` com prompts descritivos (ex.: "armazém logístico moderno com empilhadeiras", "caminhão refrigerado da frota", "mapa do estado de Minas Gerais estilizado"). O usuário poderá trocar depois pelas fotos reais.

## Detalhes técnicos

- Tailwind v4: tokens em `@theme inline` em `src/styles.css`; nada de cores hardcoded nos componentes.
- shadcn/ui: `button`, `card`, `carousel`, `input`, `textarea`, `select`, `sheet`, `sonner` (toast).
- Responsivo mobile-first: header vira Sheet, grids colapsam para 1–2 colunas, hero mantém proporção.
- Acessibilidade: alt em todas as imagens, contraste AA garantido (azul-marinho sobre branco / branco sobre azul-marinho).
- Metadados SEO no `head()`: title "Tudobom — Distribuição e Importação de Alimentos", description institucional, og:image, twitter card.
- Sem backend / Cloud nesta etapa (formulário apenas UI). Se quiser envio real de e-mail depois, habilitamos Lovable Cloud numa próxima iteração.

## Fora do escopo desta iteração

- Envio real do formulário (precisa habilitar backend).
- CMS para editar conteúdo.
- Múltiplos idiomas.
