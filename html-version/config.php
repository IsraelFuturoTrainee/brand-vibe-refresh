<?php
/**
 * Configurações da versão PHP do site Tudobom.
 * Edite os valores abaixo de acordo com a sua hospedagem.
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

return [
    // URL pública do site (usada nas tags canonical / SEO)
    'site_url' => 'https://www.tudobom.com.br/',

    // Para onde as mensagens do formulário "Fale Conosco" serão enviadas
    'mail_to' => 'tudobom@tudobom.com.br',

    // Remetente usado pela função mail() — precisa ser um e-mail do próprio domínio
    'mail_from' => 'no-reply@tudobom.com.br',

    // Número do WhatsApp (somente dígitos, com DDI e DDD)
    'whatsapp' => '553196149203',
];
