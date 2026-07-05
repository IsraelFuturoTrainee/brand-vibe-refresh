## Plano: Ajustar link do botão flutuante do WhatsApp

### O que será feito
Atualizar o destino do botão flutuante do WhatsApp para o formato solicitado e garantir que ele continue abrindo como link externo em nova aba.

### Detalhes de implementação

1. **Atualizar** `src/components/site/WhatsAppFloat.tsx`
   - Substituir o `href` atual `https://wa.me/553196149203?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento` por `https://api.whatsapp.com/send?phone=553196149203&text=Olá,%20gostaria%20de%20fazer%20um%20orçamento!`.
   - Manter o uso da tag `<a>` real, com `target="_blank"` e `rel="noopener noreferrer"` (já estão presentes).
   - Preservar o ícone SVG, a cor oficial #25D366, a posição fixa e o efeito hover.

2. **Validar** a build e o preview para confirmar que o link renderiza corretamente e aponta para o novo endereço.

### Observação importante
O erro `ERR_BLOCKED_BY_RESPONSE` mostrado na captura de tela indica que a conexão com `api.whatsapp.com` foi recusada no ambiente do usuário — geralmente por firewall corporativo, proxy, DNS, extensão do navegador ou bloqueio do provedor de rede. A alteração do link pode resolver se o bloqueio estiver especificamente no domínio `wa.me`, mas se o próprio `api.whatsapp.com` estiver bloqueado na rede, o erro pode persistir nesse ambiente, mesmo que o link esteja correto e funcione em outras redes/dispositivos.