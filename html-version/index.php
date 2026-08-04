<?php
/**
 * Tudobom Comercial — site institucional (versão HTML/CSS/JS/PHP)
 * Basta enviar toda a pasta "html-version" para a hospedagem.
 */

$config = require __DIR__ . '/config.php';

$slides = [
  ['img' => 'assets/banner-sadia.png',                     'alt' => 'Sadia — Seu dia pede Sadia'],
  ['img' => 'assets/banner-perdigao.png',                  'alt' => 'Perdigão — O sabor de comer juntos'],
  ['img' => 'assets/banner-andorinha.png',                 'alt' => 'Andorinha Portugal — Porque azeite não é tudo igual'],
  ['img' => 'assets/banner-ebom-cafe.png',                 'alt' => 'ébom — O sabor que desperta seu dia'],
  ['img' => 'assets/banner-trofeu-2025.png',               'alt' => 'tudobom vence Troféu Destaque MBRF Distribuidores 2025'],
  ['img' => 'assets/banner-salmao-chileno-v3.png',         'alt' => 'tudobom — Maior importadora de salmão fresco chileno de Minas Gerais'],
  ['img' => 'assets/banner-senna-v2.png',                  'alt' => 'tudobom — Ayrton Senna: dedicação total e dar o melhor de si'],
  ['img' => 'assets/banner-luis-felipe-edwards-v3.png',    'alt' => 'tudobom — Vinho Luis Felipe Edwards Doña Bernarda'],
];

$regioes = [
  'Matriz - Vale do Aço',
  'Região Metropolitana de BH',
  'Zona da Mata',
  'Vale do Rio Doce',
  'Vale do Mucuri',
  'Vale do Jequitinhonha',
  'Norte de Minas',
  'Oeste de Minas',
  'Sudeste de Minas',
  'Micro Região Uberlândia',
];

$importadas = [
  ['country' => 'Argentina', 'code' => 'ar'],
  ['country' => 'Paraguai',  'code' => 'py'],
  ['country' => 'Uruguai',   'code' => 'uy'],
  ['country' => 'Chile',     'code' => 'cl'],
  ['country' => 'Noruega',   'code' => 'no'],
  ['country' => 'Portugal',  'code' => 'pt'],
  ['country' => 'Vietnã',    'code' => 'vn'],
];

$distribuicao = [
  'Sadia'        => 'assets/sadia.webp',
  'Perdigão'     => 'assets/perdigao.png',
  'Nestlé'       => 'assets/aiogurteria-nestle.png',
  'BRF'          => 'assets/brf.png',
  'Bunge'        => 'assets/luis-felipe-edwards.jpg',
  'Andorinha'    => 'assets/andorinha.jpg',
  'Maguary'      => 'assets/maguary.png',
  'daFruta'      => 'assets/dafruta.png',
  'Qualy'        => 'assets/simplot.png',
  'Salsaretti'   => 'assets/salsaretti.png',
  'Natural One'  => 'assets/natural-one.png',
  'Panasonic'    => 'assets/panasonic.jpg',
  'McCain'       => 'assets/mccain.png',
  'Suacui'       => 'assets/suacui.png',
];

$galeria = [
  ['img' => 'assets/sede-drone.jpg',                'label' => 'Sede administrativa'],
  ['img' => 'assets/sede-administrativa.jpg',       'label' => 'Centro de distribuição'],
  ['img' => 'assets/caminhao-tb.png',               'label' => 'Operação logística'],
  ['img' => 'assets/equipe-acelera-tudobom-v2.png', 'label' => 'Equipe Tudobom'],
];

$logistica = [
  ['icon' => 'truck',  'title' => 'Logística Própria',           'text' => '62 Caminhões próprios equipados para atender diferentes necessidades de transporte com qualidade.'],
  ['icon' => 'snow',   'title' => 'Transporte MultiTemperatura', 'text' => 'Soluções logísticas para cargas congeladas, resfriadas e secas, garantindo a integridade dos produtos.'],
  ['icon' => 'route',  'title' => 'Frota 100% Monitorada',       'text' => 'Todos os veículos são monitorados em tempo real durante todo o percurso.'],
  ['icon' => 'shield', 'title' => 'Qualidade Garantida',         'text' => 'Armazenagem, transporte e distribuição realizados com rigorosos padrões de qualidade.'],
];

$mvv = [
  ['icon' => 'target', 'title' => 'Missão', 'text' => 'Entregar o melhor produto e serviço com foco em nossas atividades, tendo como principal objetivo a felicidade de nossos clientes, colaboradores, fornecedores e sócios.'],
  ['icon' => 'eye',    'title' => 'Visão',  'text' => 'Ser a melhor solução em distribuição no mercado mineiro.'],
  ['icon' => 'heart',  'title' => 'Valores','text' => 'Humildade, ética, transparência, disciplina, integridade e inovação.'],
];

$relatorios = [
  ['titulo' => 'Relatório de Transparência e Igualdade Salarial de Mulheres e Homens - 1º semestre 2026', 'url' => 'assets/relatorio-tudobom-1-semestre-2026.pdf'],
  ['titulo' => 'Relatório de Transparência e Igualdade Salarial de Mulheres e Homens - 2º semestre 2025', 'url' => 'assets/relatorio-tudobom-2-semestre-2025.pdf'],
  ['titulo' => 'Relatório de Transparência e Igualdade Salarial de Mulheres e Homens - 1º semestre 2025', 'url' => 'assets/relatorio-tudobom-1-semestre-2025.pdf'],
];

$nav = [
  '#sobre'     => 'Sobre',
  '#estrutura' => 'Estrutura',
  '#atuacao'   => 'Atuação',
  '#marcas'    => 'Marcas',
  '#contato'   => 'Contato',
];

function e(string $v): string {
  return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}

function icon(string $name): string {
  $icons = [
    'truck'  => '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    'snow'   => '<path d="M2 12h20"/><path d="M12 2v20"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/>',
    'route'  => '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    'shield' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    'target' => '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'eye'    => '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    'heart'  => '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    'pin'    => '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    'phone'  => '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    'mail'   => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    'send'   => '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    'down'   => '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  ];
  return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . ($icons[$name] ?? '') . '</svg>';
}

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tudobom Comercial | Distribuição e Importação de Alimentos em MG</title>
  <meta name="description" content="Desde 2002 em Coronel Fabriciano (MG), a Tudobom distribui e importa alimentos congelados, resfriados e secos com logística própria em todo o estado de Minas Gerais." />
  <link rel="canonical" href="<?= e($config['site_url']) ?>" />
  <link rel="icon" href="assets/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="48x48" href="assets/favicon-48x48.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Tudobom Comercial | Distribuição e Importação de Alimentos" />
  <meta property="og:description" content="Distribuidora e importadora de alimentos em Minas Gerais desde 2002. Frota própria multitemperatura e 3.555 posições paletes." />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="assets/tudobom-logo.png" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>

<!-- ===================== HEADER ===================== -->
<header class="header">
  <div class="container header__inner">
    <a href="#top" class="header__logo" aria-label="Tudobom Comercial">
      <img src="assets/tudobom-logo.png" alt="Tudobom Comercial" />
    </a>

    <nav class="nav">
      <?php foreach ($nav as $href => $label): ?>
        <a href="<?= e($href) ?>"><?= e($label) ?></a>
      <?php endforeach; ?>
      <button type="button" data-open-modal="transparencia">Transparência</button>
    </nav>

    <div class="header__cta">
      <a class="btn btn--lime" href="#contato">Fale Conosco</a>
    </div>

    <button class="burger" type="button" data-open-drawer aria-label="Abrir menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    </button>
  </div>
</header>

<!-- Menu mobile -->
<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="drawer__backdrop" data-close-drawer></div>
  <div class="drawer__panel">
    <button class="drawer__close" type="button" data-close-drawer aria-label="Fechar menu">&times;</button>
    <span class="drawer__title">Menu</span>
    <nav class="drawer__nav">
      <?php foreach ($nav as $href => $label): ?>
        <a href="<?= e($href) ?>" data-close-drawer><?= e($label) ?></a>
      <?php endforeach; ?>
      <button type="button" data-open-modal="transparencia" data-close-drawer>Transparência</button>
      <a class="btn btn--lime" style="margin-top:1rem" href="#contato" data-close-drawer>Fale Conosco</a>
    </nav>
  </div>
</div>

<main>
<!-- ===================== HERO ===================== -->
<section class="hero" id="top">
  <div class="carousel" data-carousel>
    <div class="carousel__track" data-carousel-track>
      <?php foreach ($slides as $slide): ?>
        <div class="carousel__slide">
          <div class="carousel__blur" style="background-image:url('<?= e($slide['img']) ?>')" aria-hidden="true"></div>
          <img src="<?= e($slide['img']) ?>" alt="<?= e($slide['alt']) ?>" loading="lazy" />
        </div>
      <?php endforeach; ?>
    </div>

    <button class="carousel__arrow carousel__arrow--prev" type="button" data-carousel-prev aria-label="Slide anterior">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    </button>
    <button class="carousel__arrow carousel__arrow--next" type="button" data-carousel-next aria-label="Próximo slide">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>

    <div class="carousel__dots" data-carousel-dots></div>
  </div>
</section>

<!-- ===================== SOBRE ===================== -->
<section id="sobre">
  <div class="container">
    <div class="sobre__head">
      <span class="eyebrow">Sobre Nós</span>
      <h2 class="section-title">A Empresa</h2>

      <div class="sobre__body">
        <p>
          Fundada em <strong>2002</strong>, na cidade de <strong>Coronel Fabriciano (MG)</strong>, a Tudobom
          consolidou-se como uma das principais distribuidoras e importadoras de alimentos, atendendo padarias,
          supermercados, food service e o varejo tradicional com um portfólio completo de produtos alimentícios
          congelados, resfriados e secos. Com infraestrutura moderna, logística eficiente e um amplo mix de produtos,
          a empresa oferece soluções de abastecimento com excelência para clientes em todo o território nacional.
        </p>

        <p style="text-align:center;font-weight:600;color:var(--navy)">
          A empresa conta com duas unidades estratégicas de armazenagem, totalizando 3.555 posições paletes,
          distribuídas da seguinte forma:
        </p>

        <div class="unidades">
          <div class="unidade">
            <h4>Unidade Coronel Fabriciano</h4>
            <ul>
              <li><strong>1.070</strong> posições paletes para produtos congelados;</li>
              <li><strong>680</strong> posições paletes para produtos resfriados;</li>
              <li><strong>460</strong> posições paletes para produtos secos.</li>
            </ul>
            <p class="unidade__total">Total: 2.210 posições paletes.</p>
          </div>
          <div class="unidade">
            <h4>Unidade Montes Claros (MOC)</h4>
            <ul>
              <li><strong>730</strong> posições paletes para produtos congelados;</li>
              <li><strong>380</strong> posições paletes para produtos resfriados;</li>
              <li><strong>235</strong> posições paletes para produtos secos.</li>
            </ul>
            <p class="unidade__total">Total: 1.345 posições paletes.</p>
          </div>
        </div>

        <p>
          Sempre atenta às demandas do mercado, a Tudobom ampliou sua atuação ao agregar a importação de um
          diversificado mix de produtos alimentícios, fortalecendo sua presença no segmento e consolidando-se como uma
          referência no mercado.
        </p>
        <p>
          Em 2019, lançou a marca própria <span class="tag-ebom">ébom</span>, iniciando sua atuação nas linhas de
          pescados e laticínios.
        </p>
      </div>
    </div>

    <div class="mvv">
      <?php foreach ($mvv as $item): ?>
        <div class="card">
          <div class="icon-box"><?= icon($item['icon']) ?></div>
          <h3><?= e($item['title']) ?></h3>
          <p><?= e($item['text']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ===================== ESTRUTURA ===================== -->
<section id="estrutura" class="section section--muted">
  <div class="container">
    <div style="max-width:48rem">
      <span class="eyebrow">Nosso Negócio</span>
      <h2 class="section-title">Estrutura</h2>
      <p class="section-lead">
        Uma operação pensada nos mínimos detalhes para preservar a qualidade dos produtos e garantir a entrega no
        prazo combinado.
      </p>
    </div>

    <div class="gallery">
      <?php foreach ($galeria as $g): ?>
        <div class="gallery__item">
          <img src="<?= e($g['img']) ?>" alt="<?= e($g['label']) ?>" loading="lazy" />
          <span class="gallery__label"><?= e($g['label']) ?></span>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="equipe">
      <div class="equipe__grid">
        <div>
          <span class="eyebrow">Equipe</span>
          <h3>Somados por um objetivo comum</h3>
          <div class="equipe__fotos">
            <?php for ($i = 1; $i <= 4; $i++): ?>
              <div class="equipe__foto">
                <img src="assets/colab-<?= $i ?>.png" alt="Colaborador Tudobom" loading="lazy" />
              </div>
            <?php endfor; ?>
          </div>
        </div>
        <div class="equipe__texto">
          <p>
            O trabalho em equipe é definido na Tudobom como a soma dos nossos esforços em prol de um atendimento de
            alta performance. A boa convivência da equipe faz toda a diferença no relacionamento com clientes e
            fornecedores.
          </p>
          <p>
            A nossa harmonia resulta em maior rapidez e eficiência. Com metas e objetivos compartilhados, tudo aqui
            funciona bem — e isso é fundamental para conseguirmos ofertar produtos que fazem diferença no dia a dia
            das pessoas.
          </p>
          <blockquote>
            “Eu sou parte de uma equipe. Então, quando venço, não sou eu apenas quem vence.”
            <footer>— Ayrton Senna</footer>
          </blockquote>
        </div>
      </div>
    </div>

    <div class="logistica">
      <div style="max-width:48rem">
        <span class="eyebrow">Nosso Negócio</span>
        <h3>Logística</h3>
        <p class="section-lead">
          Para garantir agilidade e segurança na entrega, a Tudobom conta com uma frota refrigerada monitorada em
          tempo real e uma equipe treinada continuamente.
        </p>
      </div>

      <div class="log-grid">
        <?php foreach ($logistica as $l): ?>
          <div class="card log-card">
            <div class="icon-box"><?= icon($l['icon']) ?></div>
            <div>
              <div class="log-card__title"><?= e($l['title']) ?></div>
              <div class="log-card__text"><?= e($l['text']) ?></div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

<!-- ===================== ATUAÇÃO ===================== -->
<section id="atuacao">
  <div class="container">
    <div class="atuacao__head">
      <span class="eyebrow">Nosso Negócio</span>
      <h2 class="section-title">Atuação</h2>
      <div class="rule"></div>
    </div>

    <div class="atuacao__panel">
      <div class="atuacao__grid">
        <div>
          <p class="section-lead" style="margin-top:0">
            Os produtos da tudobom, sejam de origem nacional ou importados, encontram-se disponíveis para distribuição
            em todas as regiões do estado de Minas Gerais.
          </p>
          <ul class="regioes">
            <?php foreach ($regioes as $r): ?>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span><?= e($r) ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
        <div class="atuacao__mapa">
          <img src="assets/mapa-mg-atuacao-v3.png" alt="Mapa de atuação em Minas Gerais" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===================== MARCAS ===================== -->
<section id="marcas" class="section section--muted">
  <div class="container">
    <div style="max-width:48rem">
      <span class="eyebrow">Marcas</span>
      <h2 class="section-title">Importadas</h2>
      <p class="section-lead">
        Na Tudobom Comercial você encontra produtos de marcas renomadas em todo o mundo, com qualidade e procedência
        reconhecidas.
      </p>
    </div>

    <div class="brand-grid">
      <?php foreach ($importadas as $item): ?>
        <div class="brand-tile brand-tile--flag">
          <img src="https://flagcdn.com/w320/<?= e($item['code']) ?>.png"
               srcset="https://flagcdn.com/w640/<?= e($item['code']) ?>.png 2x"
               width="160" height="107" loading="lazy"
               alt="Bandeira <?= e($item['country']) ?>" />
        </div>
      <?php endforeach; ?>
    </div>

    <div class="marcas__dist-head" style="max-width:48rem">
      <span class="eyebrow">Marcas</span>
      <h2 class="section-title">Distribuição</h2>
      <p class="section-lead">
        Temos disponíveis em nosso catálogo produtos de marcas nacionais reconhecidas, garantindo variedade sem abrir
        mão da qualidade — incluindo a nossa marca própria <strong style="text-transform:lowercase">ébom</strong>.
      </p>
    </div>

    <div class="brand-grid brand-grid--dist">
      <div class="brand-tile brand-tile--featured">
        <img src="assets/ebom-logo.png" alt="ébom" loading="lazy" />
      </div>
      <?php foreach ($distribuicao as $label => $logo): ?>
        <div class="brand-tile">
          <img src="<?= e($logo) ?>" alt="<?= e($label) ?>" loading="lazy"
               <?= $label === 'Nestlé' ? 'style="width:95%;height:95%"' : '' ?> />
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ===================== CONTATO ===================== -->
<section id="contato" class="section">
  <div class="container">
    <div style="max-width:48rem">
      <span class="eyebrow">Contato</span>
      <h2 class="section-title">Fale Conosco</h2>
      <p class="section-lead">
        Entre em contato para saber mais sobre nossos produtos, marcas parceiras ou oportunidades comerciais.
      </p>
    </div>

    <div class="contato__grid">
      <div class="card form-card">
        <?php if ($flash): ?>
          <div class="alert alert--<?= $flash['type'] === 'ok' ? 'ok' : 'err' ?>"><?= e($flash['message']) ?></div>
        <?php endif; ?>

        <form class="form" method="post" action="enviar.php">
          <input type="text" name="website" tabindex="-1" autocomplete="off" class="sr-only" aria-hidden="true" />
          <div class="form__row">
            <div class="field">
              <label for="nome">Nome</label>
              <input id="nome" name="nome" required placeholder="Seu nome" />
            </div>
            <div class="field">
              <label for="email">E-mail</label>
              <input id="email" name="email" type="email" required placeholder="voce@email.com" />
            </div>
          </div>
          <div class="form__row">
            <div class="field">
              <label for="telefone">Telefone</label>
              <input id="telefone" name="telefone" placeholder="(00) 00000-0000" />
            </div>
            <div class="field">
              <label for="assunto">Assunto</label>
              <select id="assunto" name="assunto">
                <option value="">Selecione um assunto</option>
                <option value="duvidas">Dúvidas</option>
                <option value="sugestoes">Sugestões</option>
                <option value="criticas">Críticas</option>
                <option value="comercial">Comercial</option>
                <option value="outros">Outros</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" rows="5" required placeholder="Como podemos ajudar?"></textarea>
          </div>
          <button class="btn btn--lime btn--lg" type="submit" style="justify-self:start">
            Enviar mensagem <?= icon('send') ?>
          </button>
        </form>
      </div>

      <div>
        <div class="card info-card">
          <h3>Informações</h3>
          <ul class="info-list">
            <li>
              <span class="icon-sm"><?= icon('phone') ?></span>
              <div>
                <div class="label">Telefone</div>
                <a class="value" href="tel:+553138419200">(31) 3841-9200</a>
              </div>
            </li>
            <li>
              <span class="icon-sm"><?= icon('mail') ?></span>
              <div>
                <div class="label">E-mail</div>
                <a class="value" href="mailto:tudobom@tudobom.com.br">tudobom@tudobom.com.br</a>
              </div>
            </li>
            <li>
              <span class="icon-sm"><?= icon('pin') ?></span>
              <div>
                <div class="label">Endereço</div>
                <p class="value">Coronel Fabriciano — Minas Gerais, Brasil</p>
              </div>
            </li>
          </ul>

          <div class="socials">
            <a href="https://www.facebook.com/tbtudobom/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>
            </a>
            <a href="https://www.instagram.com/tbtudobom/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</main>

<!-- ===================== FOOTER ===================== -->
<footer class="footer">
  <div class="container footer__grid">
    <div>
      <div class="footer__logo"><img src="assets/tudobom-logo.png" alt="Tudobom Comercial" /></div>
      <p class="footer__about">Distribuição e importação de alimentos desde 2002 — Coronel Fabriciano / MG.</p>
      <div class="footer__socials">
        <a href="https://www.facebook.com/tbtudobom/" target="_blank" rel="noreferrer" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>
        </a>
        <a href="https://www.instagram.com/tbtudobom/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
      </div>
    </div>

    <div>
      <h4>Navegação</h4>
      <div class="footer__nav">
        <?php foreach ($nav as $href => $label): ?>
          <a href="<?= e($href) ?>"><?= e($label) ?></a>
        <?php endforeach; ?>
      </div>
    </div>

    <div>
      <h4>Contato</h4>
      <ul class="footer__contact">
        <li><a href="tel:+553138419200">(31) 3841-9200</a></li>
        <li><a href="mailto:tudobom@tudobom.com.br">tudobom@tudobom.com.br</a></li>
        <li>Coronel Fabriciano — MG</li>
      </ul>
    </div>
  </div>

  <div class="footer__bottom">
    <div class="container">
      <p>&copy; <?= date('Y') ?> Tudobom Comercial. Todos os direitos reservados.</p>
      <p>Marca própria <span class="lime">ébom</span>.</p>
    </div>
  </div>
</footer>

<!-- ===================== MODAL TRANSPARÊNCIA ===================== -->
<div class="modal" id="transparencia" role="dialog" aria-modal="true" aria-labelledby="transparencia-title">
  <div class="modal__backdrop" data-close-modal></div>
  <div class="modal__panel">
    <button class="modal__close" type="button" data-close-modal aria-label="Fechar">&times;</button>
    <h2 id="transparencia-title">Portal da transparência</h2>
    <div class="modal__text">
      <p>
        O Grupo Tudobom reconhece a importância da transparência e da igualdade salarial em seu ambiente de trabalho.
        Nosso portal de transparência e igualdade salarial oferece aos colaboradores acesso a informações claras e
        detalhadas sobre os salários praticados na empresa. Buscamos promover a equidade, garantindo que todos os
        funcionários sejam remunerados de forma justa, independentemente de gênero ou qualquer outra característica.
      </p>
      <p>
        Os resultados são dados estatísticos sem deixar claro as particularidades do nosso ramo de atividade, contudo
        somos comprometidos em manter um ambiente de trabalho inclusivo, justo e respeitoso, onde a valorização de
        todos os colaboradores é uma prioridade.
      </p>
    </div>

    <div class="relatorios">
      <h3>Tudobom Comercial</h3>
      <ul>
        <?php foreach ($relatorios as $rel): ?>
          <li>
            <p><?= e($rel['titulo']) ?></p>
            <a class="btn btn--navy" href="<?= e($rel['url']) ?>" target="_blank" rel="noopener noreferrer" download>
              <?= icon('down') ?> baixar relatório
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>
</div>

<!-- ===================== WHATSAPP ===================== -->
<a class="whatsapp-float"
   href="https://api.whatsapp.com/send?phone=<?= e($config['whatsapp']) ?>&text=Ol%C3%A1,%20gostaria%20de%20fazer%20um%20or%C3%A7amento!"
   target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
</a>

<script src="js/main.js"></script>
</body>
</html>
