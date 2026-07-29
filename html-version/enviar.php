<?php
/**
 * Processa o formulário "Fale Conosco" e envia a mensagem por e-mail.
 */

$config = require __DIR__ . '/config.php';

function back(string $type, string $message): void
{
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
    header('Location: index.php#contato');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    back('err', 'Requisição inválida.');
}

// Honeypot anti-spam: campo invisível preenchido = robô.
if (!empty($_POST['website'] ?? '')) {
    back('ok', 'Mensagem enviada!');
}

$nome     = trim((string) ($_POST['nome'] ?? ''));
$email    = trim((string) ($_POST['email'] ?? ''));
$telefone = trim((string) ($_POST['telefone'] ?? ''));
$assunto  = trim((string) ($_POST['assunto'] ?? ''));
$mensagem = trim((string) ($_POST['mensagem'] ?? ''));

if ($nome === '' || $mensagem === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    back('err', 'Preencha nome, e-mail válido e mensagem.');
}

$assuntosValidos = ['duvidas', 'sugestoes', 'criticas', 'comercial', 'outros'];
if (!in_array($assunto, $assuntosValidos, true)) {
    $assunto = 'outros';
}

$corpo = "Nova mensagem pelo site Tudobom\n\n"
    . "Nome: {$nome}\n"
    . "E-mail: {$email}\n"
    . "Telefone: {$telefone}\n"
    . "Assunto: {$assunto}\n\n"
    . "Mensagem:\n{$mensagem}\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Site Tudobom <' . $config['mail_from'] . '>',
    'Reply-To: ' . $email,
];

$enviado = @mail(
    $config['mail_to'],
    '=?UTF-8?B?' . base64_encode('[Site] Contato - ' . $assunto) . '?=',
    $corpo,
    implode("\r\n", $headers)
);

if ($enviado) {
    back('ok', 'Mensagem enviada! Retornaremos em breve. Obrigado pelo contato.');
}

back('err', 'Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.');
