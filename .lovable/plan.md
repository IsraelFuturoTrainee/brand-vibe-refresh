# Ajuste responsivo do Hero Carousel

## Objetivo
No mobile, o banner deve aparecer inteiro (sem corte) e sem espaço azul vazio embaixo, com os dots colados na imagem. Desktop permanece igual.

## Mudanças em `src/components/site/Hero.tsx`

### 1. Slide de imagem (`slide.kind === "image"`)
Hoje: `aspect-[2.85/1] max-h-[480px] min-h-[220px]` — força uma proporção fixa que, no mobile, sobra área abaixo da imagem (que fica em `object-contain`).

Novo comportamento:
- **Mobile (<640px):** container sem `aspect-ratio` e sem `min-h`; `<img>` com `w-full h-auto` (altura natural da arte). Sem faixa azul, sem corte.
- **Desktop (≥640px):** manter `sm:aspect-[2.85/1] sm:max-h-[480px] sm:min-h-[300px]` + `object-contain` (comportamento atual preservado).
- Fundo blur só é renderizado a partir de `sm:` (no mobile a imagem ocupa tudo, não precisa de preenchimento).

### 2. Slide de texto
Manter altura atual no desktop. No mobile trocar `h-[35vw] min-h-[360px]` por `min-h-[420px] h-auto py-12` para acompanhar o conteúdo sem sobra.

### 3. Dots de navegação
Hoje: `absolute bottom-4 left-1/2` — no mobile ficam flutuando sobre o vazio.

Novo:
- **Mobile:** posicionamento estático (`static mt-3 mb-4 justify-center flex`) — logo abaixo do banner.
- **Desktop:** volta ao `sm:absolute sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2` atual.

### 4. Setas prev/next
Manter como estão. No mobile continuam sobrepostas à imagem (a altura da imagem é o próprio slide, então continuam centralizadas corretamente).

## Não muda
- Desktop (≥640px): mesma proporção 2.85/1, `max-h-[480px]`, blur de fundo, dots absolutos.
- Nenhuma alteração em outras seções, tokens, ou no `styles.css`.

## Verificação
Abrir preview em viewport mobile (375px) e desktop (1280px) e confirmar:
- Mobile: imagem inteira, sem faixa azul embaixo, dots imediatamente após a imagem.
- Desktop: idêntico ao estado atual.
