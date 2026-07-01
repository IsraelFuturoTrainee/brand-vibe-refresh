## Corrigir corte do banner de imagem no Hero

### Problema
Slides de imagem usam `h-[70vh]` + `object-cover`, o que corta as bordas da imagem 16:9 (perdendo logo e texto do banner).

### Solução
No `src/components/site/Hero.tsx`, tratar slides do tipo `image` de forma diferente dos slides de texto:

- Slides de texto: continuam com `h-[70vh]` (altura fixa).
- Slides de imagem: usar `aspect-video` (16:9) com `object-contain` e fundo `bg-brand-navy` — a imagem aparece 100% sem cortar, respeitando a proporção original. Em telas muito largas, sobra faixa lateral azul-marinho combinando com a identidade.

Também vou ajustar o container do Carousel/CarouselItem para permitir alturas distintas por slide sem quebrar o layout, e garantir que o slide ativo ocupe naturalmente a altura da imagem.

### Resultado
Banner do salmão aparece inteiro, com logo e texto visíveis, sem corte.