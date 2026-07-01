O corte acontece porque o container do slide usa altura fixa (`h-[55vh]`) com `object-cover`. Na sua tela (785px), 55vh ≈ 432px de altura por ~1373px de largura — proporção ~3.2:1, bem mais larga que 16:9, então o `object-cover` preenche a largura cortando topo/fundo da imagem.

Correção em `src/components/site/Hero.tsx` (slide de imagem, linhas 90-97):
- Trocar o container para `aspect-video w-full` (força proporção 16:9 idêntica à da imagem), removendo `h-[55vh] min-h-[320px] max-h-[640px]`.
- Manter `object-cover` — como container e imagem têm a mesma proporção, não haverá corte visível.
- Remover o `max-h-[640px]` do `Carousel`, `CarouselContent` e `CarouselItem` para não voltar a espremer a altura (o `aspect-video` já controla o tamanho).

Efeito: em telas até ~1138px de largura, o banner aparece inteiro sem cortes e sem faixas azuis. Em telas maiores, ele escala junto (ex: 1373×772). Se quiser limitar a altura máxima em telas grandes, usamos `max-w-[1138px] mx-auto` no container do slide para travar em 1138×640.