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

    // Remetente — precisa ser um e-mail do próprio domínio
    'mail_from' => 'no-reply@tudobom.com.br',
    'mail_from_name' => 'Site Tudobom',

    // ---------------------------------------------------------------
    // SMTP (PHPMailer). Preencha com os dados da sua hospedagem.
    // Se 'smtp_enabled' for false, o envio usa a função mail() do PHP.
    // ---------------------------------------------------------------
    'smtp_enabled'  => true,
    'smtp_host'     => 'mail.tudobom.com.br',
    'smtp_port'     => 587,            // 587 = TLS | 465 = SSL
    'smtp_secure'   => 'tls',          // 'tls' ou 'ssl'
    'smtp_user'     => 'no-reply@tudobom.com.br',
    'smtp_pass'     => 'SUA_SENHA_AQUI',
    'smtp_debug'    => false,          // true para ver o log de conexão

    // Número do WhatsApp (somente dígitos, com DDI e DDD)
    'whatsapp' => '553196149203',
];
