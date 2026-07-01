Plano para corrigir o Hero Carousel no mobile:

1. Preservar o desktop exatamente como está
- Manter as classes `sm:*` atuais que definem a proporção/altura do carrossel no desktop.
- Não alterar o comportamento visual desktop.

2. Corrigir a causa do espaço azul no celular
- No mobile, o Embla Carousel está usando a altura do slide mais alto, que é o primeiro slide de texto com `min-h-[420px]` e `py-12`.
- Vou remover essa altura fixa somente no mobile e deixar altura fixa apenas a partir de `sm:`.

3. Padronizar os slides no mobile sem cortar imagem
- Para slides de imagem no mobile: `height: auto`, `object-fit: contain`, `width: 100%`, `height: auto`.
- Sem `object-cover` no mobile.
- Sem `aspect-ratio`, `min-height` ou `max-height` antes de `sm:`.

4. Ajustar controles no mobile
- Setas posicionadas sobre a área da imagem, centralizadas verticalmente no banner real, não no espaço vazio.
- Dots logo abaixo do banner no mobile, com margem pequena.
- Desktop continua com dots sobrepostos na parte inferior.

5. Validar no preview mobile
- Medir novamente a altura do `#top`, do viewport do carrossel, da imagem e dos dots.
- Confirmar que não há bloco azul-marinho vazio sobrando abaixo da imagem e que a arte aparece inteira.