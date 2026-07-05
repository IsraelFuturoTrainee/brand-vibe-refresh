## Aba Transparência com modal de relatórios

Vou replicar o comportamento do site original: um item de menu "Transparência" no header que, ao ser clicado, abre um modal com o texto institucional e a lista de relatórios de transparência salarial para download.

### Passos

1. **Upload dos PDFs** (assim que você anexar os arquivos): subir cada relatório via `lovable-assets create` e gerar pointers em `src/assets/`:
   - `relatorio-transparencia-2026-1sem.pdf.asset.json`
   - `relatorio-transparencia-2025-2sem.pdf.asset.json`
   - `relatorio-transparencia-2025-1sem.pdf.asset.json`

2. **Novo componente `src/components/site/Transparencia.tsx`**:
   - `Dialog` do shadcn (`@/components/ui/dialog`) já disponível no projeto.
   - Recebe `open`/`onOpenChange` como props (controlado pelo Header).
   - Título: "Portal da transparência".
   - Texto institucional (mesmo do site original) sobre igualdade salarial.
   - Bloco "Tudobom Comercial" com 3 cards (um por semestre), cada um com título do relatório + botão `baixar relatório` (link `<a href={asset.url} download target="_blank">`).
   - Estilos alinhados ao design system (`bg-brand-navy`, `bg-brand-lime`, cards com `bg-muted`).

3. **Atualizar `src/components/site/Header.tsx`**:
   - Adicionar item `{ label: "Transparência", onClick: ... }` na navegação (desktop + menu mobile), no lugar de um `href`.
   - Estado `transparenciaOpen` controla a exibição do modal.
   - Renderizar `<Transparencia open={transparenciaOpen} onOpenChange={setTransparenciaOpen} />` dentro do header.
   - Ajustar tipos do array `NAV` para suportar itens de âncora e itens de ação.

### Observação

Não vou criar rota separada — como no site original, é apenas um modal disparado pelo menu. Assim que você mandar os PDFs, ligo os 3 botões de download; se preferir subir os arquivos depois, deixo os botões desabilitados temporariamente.
