## Problema
No celular, a arte do carrossel principal não fica centralizada/visualmente equilibrada. A proporção fixa `aspect-[2.85/1]` com `object-contain` faz o banner ficar muito largo e baixo, e o conteúdo principal (geralmente posicionado à direita, como no banner do Senna) pode aparecer pequeno ou deslocado.

## Solução
Ajustar o componente `src/components/site/Hero.tsx` para tratar a imagem de forma responsiva, preservando o conteúdo importante em qualquer tela:

1. **Proporções responsivas no container do slide de imagem:**
   - Mobile: `aspect-[16/9]` ou `aspect-[4/3]` para dar mais altura à arte no celular.
   - Tablet/desktop: `aspect-[2.85/1]` para manter o formato wide padrão do site original.

2. **Ajuste de `object-fit` e `object-position` por breakpoint:**
   - Mobile: usar `object-cover` com `object-right` para focar o lado direito da arte (produto/texto) e evitar faixas laterais azuis.
   - Desktop: manter `object-contain` com fundo borrado da própria imagem para exibir a arte completa sem cortes.

3. **Manter altura máxima:**
   - Garantir `max-h-[480px]` em todos os breakpoints para não repetir o problema anterior de banner gigante.

4. **Fallback visual:**
   - Preservar o fundo borrado (`blur-xl`) e a cor de base `bg-brand-navy` para que, mesmo com variações de proporção, o espaço ao redor da imagem fique harmonioso.

## Arquivos envolvidos
- `src/components/site/Hero.tsx`

## Resultado esperado
A arte do carrossel ficará devidamente centralizada e com o conteúdo principal visível no celular, sem cortes estranhos e mantendo o design wide no desktop.