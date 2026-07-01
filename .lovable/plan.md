O carrossel do Hero está muito alto: os slides de imagem usam `aspect-video` (16:9) e em telas comuns chegam a ocupar quase a altura inteira da viewport; os slides de texto usam `h-[70vh] min-h-[520px]`, que também fica muito grande. O usuário quer reduzir a altura total do carrossel para no máximo **640 px**, mantendo os banners visíveis e sem cortar.

## O que será feito

1. Ajustar o `Hero.tsx` para limitar a altura do carrossel em **640 px** em telas maiores, mantendo responsividade em mobile.
2. Para os **slides de imagem**:
   - Usar uma proporção mais compacta dentro do container de 640 px (ex: `max-h-[640px]` com `w-full` e `object-cover` centralizado).
   - Garantir que o banner ainda preencha a largura sem faixas laterais e sem cortar excessivamente (usando `object-cover` com foco central).
3. Para os **slides de texto**:
   - Substituir `h-[70vh] min-h-[520px]` por `max-h-[640px] h-[55vh] min-h-[420px]` para ficar proporcional dentro do novo limite.
   - Ajustar tamanhos de título/descrição se necessário para não ficar espremido.
4. Posicionar as setas e bullets do carrossel de forma proporcional dentro do novo limite de altura.
5. Verificar visualmente no preview que o Hero não ocupa mais a tela inteira e que as próximas seções (Sobre) começam a aparecer abaixo da dobra.

## Resultado esperado

Carrossel mais contido, com altura máxima de 640 px, mantendo o impacto visual e a legibilidade dos banners e textos. O usuário passará a ver parte da próxima seção assim que a página carregar, melhorando a navegação.