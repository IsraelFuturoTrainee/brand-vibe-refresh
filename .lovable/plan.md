## Substituir placeholder "Armazém refrigerado" pela foto do evento ACELERA tudobom

A foto enviada (evento ACELERA tudobom com toda a equipe) será colocada no card selecionado da galeria da seção Estrutura, no lugar do placeholder "Armazém refrigerado".

### Passos

1. Fazer upload da imagem via `lovable-assets` e gerar `src/assets/equipe-acelera-tudobom.jpg.asset.json` a partir de `/mnt/user-uploads/WhatsApp_Image_2026-07-01_at_19.28.47.jpeg`.
2. Em `src/components/site/Estrutura.tsx`:
   - Importar o novo asset.
   - Adicionar um campo opcional `image` ao item "Armazém refrigerado" no array `GALLERY` (mantendo os demais como placeholders).
   - Ajustar o `.map` para, quando `img.image` existir, renderizar um `<img>` com `object-cover` preenchendo o card e remover os atributos `data-lov-image-placeholder` daquele card. O `label` continua aparecendo como pill sobreposta no canto inferior.

### Observação

A foto retrata a equipe em um evento corporativo, não um armazém refrigerado. Se preferir, posso movê-la para a seção "Equipe" logo abaixo — mas por padrão vou seguir sua instrução e colocá-la exatamente no espaço selecionado.