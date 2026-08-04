# Tudobom Comercial — versão HTML / CSS / JS / PHP

Versão estática (com um pouco de PHP) do site institucional, pronta para subir em
qualquer hospedagem com suporte a PHP 7.4+.

## Como publicar

1. Envie **toda a pasta `html-version`** para a hospedagem (via FTP, cPanel, etc.).
   Normalmente o conteúdo vai dentro de `public_html/`.
2. Abra `config.php` e ajuste:
   - `site_url` — endereço final do site;
   - `mail_to` — e-mail que recebe as mensagens do "Fale Conosco";
   - `mail_from` — remetente (precisa ser um e-mail do próprio domínio);
   - `whatsapp` — número do WhatsApp (somente dígitos, com DDI e DDD).
3. Acesse o site. A página inicial é o `index.php`.

## Estrutura

```text
html-version/
├── index.php        página completa (todas as seções)
├── config.php       configurações editáveis
├── enviar.php       processa o formulário e envia o e-mail
├── css/style.css    todo o estilo (sem frameworks)
├── js/main.js       carrossel, menu mobile e modal da Transparência
└── assets/          imagens, logos, banners e PDFs dos relatórios
```

## Observações

- O formulário usa a função `mail()` do PHP. Se a hospedagem exigir SMTP autenticado,
  troque o bloco `mail(...)` de `enviar.php` por PHPMailer com as credenciais SMTP.
- As bandeiras da seção "Importadas" são carregadas do serviço externo `flagcdn.com`.
  Para deixar tudo offline, baixe as imagens e troque as URLs no `index.php`.
- A versão em React continua funcionando normalmente no restante do projeto — as duas
  versões são independentes.

## Envio de e-mail (Fale Conosco)

O formulário usa a biblioteca **PHPMailer** (já incluída em `lib/PHPMailer/`, não precisa de Composer).

Edite `config.php`:

- `mail_to` — e-mail que receberá as mensagens
- `mail_from` — remetente (precisa ser uma conta do seu domínio)
- `smtp_enabled` — `true` para enviar por SMTP autenticado (recomendado)
- `smtp_host`, `smtp_port`, `smtp_secure`, `smtp_user`, `smtp_pass` — dados da conta de e-mail da hospedagem
  - porta `587` com `'tls'` ou porta `465` com `'ssl'`
- `smtp_debug` — deixe `true` temporariamente para gravar o log da conexão no error_log

Se a hospedagem não permitir SMTP, coloque `'smtp_enabled' => false` para usar a função `mail()` do PHP.
