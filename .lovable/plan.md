## Plano: Botão flutuante do WhatsApp

### O que será feito
Adicionar um botão circular fixo do WhatsApp no canto inferior direito da tela, visível em todas as páginas do site.

### Detalhes de implementação

1. **Criar componente** `src/components/site/WhatsAppFloat.tsx`
   - Botão `<a>` com `href="https://wa.me/553196149203?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento"`, `target="_blank"` e `rel="noopener noreferrer"`.
   - Posição fixa: `fixed bottom-6 right-6` (equivalente a `bottom: 24px; right: 24px`).
   - `z-50` para ficar acima dos outros elementos.
   - Forma circular: `rounded-full`, tamanho `h-14 w-14` (56 px).
   - Cor verde oficial do WhatsApp: `#25D366` (usando estilo inline `backgroundColor` para manter a cor exata do WhatsApp, já que ela não faz parte da paleta da marca).
   - Sombra: `box-shadow: 0 4px 14px rgba(0,0,0,0.25)`.
   - Ícone oficial do WhatsApp como SVG inline (não há ícone do WhatsApp no Lucide principal, e não queremos adicionar uma biblioteca só por isso).
   - Hover: transição `transition-transform duration-200 ease-out` com `hover:scale-110` e leve alteração de opacidade/foco.
   - Acessibilidade: `aria-label="Falar no WhatsApp"`.

2. **Inserir o botão globalmente** em `src/routes/__root.tsx`
   - Importar `WhatsAppFloat`.
   - Renderizá-lo dentro de `RootComponent`, ao lado de `<Outlet />`, para que apareça em todas as rotas.

3. **Verificar** a build e o preview para garantir que o botão apareça fixo no canto inferior direito, abra o link em nova aba e fique acima de todos os elementos.

### Por que essa abordagem
- Como o site é uma landing page single-page hoje, colocar o botão no `__root.tsx` garante que ele apareça em todas as páginas futuras também, sem precisar repetir importação em cada rota.
- Usar SVG inline evita instalar nova dependência de ícones apenas para um único ícone.
- A cor verde do WhatsApp é aplicada via inline style para não forçar tokens de marca fora do padrão do projeto.

### Não será alterado
- Nenhuma lógica de backend, autenticação ou banco de dados.
- O estilo visual geral do site, além do novo botão.