## Ajustar slide de imagem do Hero para tela cheia sem cortes e sem barras laterais

### Problema
O banner de imagem (salmão chileno) está com `object-contain` + `max-h-[80vh]` + fundo azul. Isso mantém a imagem inteira, mas cria faixas azuis laterais em telas mais largas que 16:9. Se usarmos `object-cover` + altura fixa, a imagem é cortada nas bordas (onde estão o logo e o texto do banner).

### Causa
A imagem do banner é 16:9 (proporção padrão de folder). O container do slide está limitado a `max-h-[80vh]`, então a imagem não pode expandir livremente para preencher a largura. A única forma de preencher a largura toda sem cortar é fazer o container ter a mesma proporção da imagem.

### Solução
No `src/components/site/Hero.tsx`, alterar o slide do tipo `image` para:

1. Usar `aspect-video` no container do slide, garantindo proporção 16:9 idêntica à imagem.
2. Fazer o container ocupar `100%` da largura disponível.
3. Manter `object-cover` na imagem — agora a imagem e o container têm a mesma proporção, então não há corte nem barras laterais.
4. Remover o `max-h-[80vh]` e o fundo azul de letterboxing do container de imagem.
5. Deixar o autoplay e as setas funcionando como estão.

### Resultado esperado
- Em telas 16:9 (a maioria dos notebooks e monitores): o banner ocupa a largura total e a altura total do slide, sem cortes e sem faixas azuis.
- Em telas muito largas (ultrawide 21:9): inevitavelmente sobra faixa lateral, pois a imagem 16:9 não pode preencher 21:9 sem distorcer ou cortar. Para evitar isso, seria necessário criar uma versão mais larga do banner ou aceitar leves barras nesse caso.

### Arquivos que serão alterados
- `src/components/site/Hero.tsx` — ajuste no container e na imagem do slide de imagem.

### Não será alterado
- Estrutura do carrossel (`src/components/ui/carousel.tsx`).
- Slides de texto (continuam com altura fixa e overlay).