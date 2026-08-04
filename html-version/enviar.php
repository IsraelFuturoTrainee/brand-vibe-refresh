<?php
/**
 * Processa o formulário "Fale Conosco" e envia a mensagem por e-mail
 * usando a biblioteca PHPMailer (SMTP autenticado) com fallback para mail().
 */

$config = require __DIR__ . '/config.php';

require_once __DIR__ . '/lib/PHPMailer/Exception.php';
require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

function back(string $type, string $message): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
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

$corpoTexto = "Nova mensagem pelo site Tudobom\n\n"
    . "Nome: {$nome}\n"
    . "E-mail: {$email}\n"
    . "Telefone: {$telefone}\n"
    . "Assunto: {$assunto}\n\n"
    . "Mensagem:\n{$mensagem}\n";

$corpoHtml = '<h2 style="font-family:Arial,sans-serif;color:#0f1b3d">Nova mensagem pelo site Tudobom</h2>'
    . '<p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6">'
    . '<strong>Nome:</strong> ' . htmlspecialchars($nome, ENT_QUOTES, 'UTF-8') . '<br>'
    . '<strong>E-mail:</strong> ' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '<br>'
    . '<strong>Telefone:</strong> ' . htmlspecialchars($telefone, ENT_QUOTES, 'UTF-8') . '<br>'
    . '<strong>Assunto:</strong> ' . htmlspecialchars($assunto, ENT_QUOTES, 'UTF-8') . '</p>'
    . '<p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6"><strong>Mensagem:</strong><br>'
    . nl2br(htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8')) . '</p>';

$assuntoEmail = '[Site] Contato - ' . ucfirst($assunto);

$mail = new PHPMailer(true);

try {
    $mail->CharSet  = 'UTF-8';
    $mail->Encoding = 'base64';

    if (!empty($config['smtp_enabled'])) {
        $mail->isSMTP();
        $mail->Host       = $config['smtp_host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtp_user'];
        $mail->Password   = $config['smtp_pass'];
        $mail->SMTPSecure = ($config['smtp_secure'] ?? 'tls') === 'ssl'
            ? PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = (int) ($config['smtp_port'] ?? 587);

        if (!empty($config['smtp_debug'])) {
            $mail->SMTPDebug   = SMTP::DEBUG_SERVER;
            $mail->Debugoutput = 'error_log';
        }
    } else {
        $mail->isMail();
    }

    $mail->setFrom($config['mail_from'], $config['mail_from_name'] ?? 'Site Tudobom');
    $mail->addAddress($config['mail_to']);
    $mail->addReplyTo($email, $nome);

    $mail->isHTML(true);
    $mail->Subject = $assuntoEmail;
    $mail->Body    = $corpoHtml;
    $mail->AltBody = $corpoTexto;

    $mail->send();

    back('ok', 'Mensagem enviada! Retornaremos em breve. Obrigado pelo contato.');
} catch (PHPMailerException $e) {
    error_log('[Tudobom] Falha no envio do formulário: ' . $mail->ErrorInfo);
    back('err', 'Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.');
}
