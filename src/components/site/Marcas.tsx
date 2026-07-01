type Importada = { country: string; code: string; segment: string };

const IMPORTADAS: Importada[] = [
  { country: "Argentina", code: "ar", segment: "Carnes Bovinas" },
  { country: "Argentina", code: "ar", segment: "Pescados" },
  { country: "Chile", code: "cl", segment: "Salmão do Chile" },
  { country: "Chile", code: "cl", segment: "Casa Valduga e Terra Vega" },
  { country: "Noruega", code: "no", segment: "Bacalhau Seco e Salgado da Noruega" },
  { country: "Portugal", code: "pt", segment: "Azeite" },
  { country: "Portugal", code: "pt", segment: "Bacalhau" },
  { country: "Uruguai", code: "uy", segment: "Pescados" },
  { country: "Uruguai", code: "uy", segment: "Carnes Bovinas" },
];

const DISTRIBUICAO = [
  "Sadia",
  "Perdigão",
  "Nestlé",
  "BRF",
  "Bunge",
  "Andorinha",
  "Maguary",
  "daFruta",
  "Dona Bia",
  "Riviera",
  "Kidelli",
  "Qualy",
  "Sofiteli",
  "Salsaretti",
  "Etti",
  "Cajamar",
  "Natural One",
  "Nature Palm",
  "Classe A",
  "Ecomar",
  "Nat",
  "Panasonic",
  "Schultz",
  "Brown-Forman",
  "McCain",
  "Nucos",
  "Terra Vega",
  "Suacui",
];

import ebomLogo from "@/assets/ebom-logo.png";
import sadiaLogo from "@/assets/sadia.webp.asset.json";
import perdigaoLogo from "@/assets/perdigao.png.asset.json";
import nestleLogo from "@/assets/nestle.png.asset.json";
import maguaryLogo from "@/assets/maguary.png.asset.json";
import dafrutaLogo from "@/assets/dafruta.png.asset.json";
import panasonicLogo from "@/assets/panasonic.jpg.asset.json";
import brfLogo from "@/assets/brf.png.asset.json";
import naturalOneLogo from "@/assets/natural-one.png.asset.json";
import salsarettiLogo from "@/assets/salsaretti.png.asset.json";
import andorinhaLogo from "@/assets/andorinha.jpg.asset.json";
import mccainLogo from "@/assets/mccain.png.asset.json";
import simplotLogo from "@/assets/simplot.png.asset.json";
import suacuiLogo from "@/assets/suacui.png.asset.json";

const BRAND_LOGOS: Record<string, string> = {
  Sadia: sadiaLogo.url,
  Perdigão: perdigaoLogo.url,
  Nestlé: nestleLogo.url,
  BRF: brfLogo.url,
  Maguary: maguaryLogo.url,
  daFruta: dafrutaLogo.url,
  Panasonic: panasonicLogo.url,
  "Natural One": naturalOneLogo.url,
  Salsaretti: salsarettiLogo.url,
  Andorinha: andorinhaLogo.url,
  McCain: mccainLogo.url,
  Qualy: simplotLogo.url,
  Suacui: suacuiLogo.url,
};

function LogoTile({
  label,
  featured = false,
  imageClass = "",
}: {
  label: string;
  featured?: boolean;
  imageClass?: string;
}) {
  if (featured) {
    return (
      <div className="flex aspect-[3/2] items-center justify-center rounded-2xl border border-border bg-card p-4 text-center ring-2 ring-brand-lime transition-all hover:-translate-y-0.5 hover:shadow-md">
        <img
          src={ebomLogo}
          alt={label}
          className={`max-h-full max-w-full object-contain ${imageClass}`}
        />
      </div>
    );
  }
  const logoUrl = BRAND_LOGOS[label];
  return (
    <div className="flex aspect-[3/2] items-center justify-center rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={label}
          className={`max-h-full max-w-full object-contain ${imageClass}`}
        />
      ) : (
        <span className="font-display text-sm font-semibold text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}


function ImportadaCard({ item }: { item: Importada }) {
  return (
    <div className="flex aspect-[3/2] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <img
        src={`https://flagcdn.com/w320/${item.code}.png`}
        srcSet={`https://flagcdn.com/w640/${item.code}.png 2x`}
        width={96}
        height={64}
        alt={`Bandeira ${item.country}`}
        loading="lazy"
        className="h-12 w-auto rounded-sm object-contain shadow-sm sm:h-14"
      />
      <span className="font-display text-xs font-semibold text-primary sm:text-sm">
        {item.segment}
      </span>
    </div>
  );
}

export function Marcas() {
  return (
    <section id="marcas" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Importadas */}
        <div className="max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
            Marcas
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
            Importadas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Na Tudobom Comercial você encontra produtos de marcas renomadas em todo o mundo, com
            qualidade e procedência reconhecidas.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {IMPORTADAS.map((item, i) => (
            <ImportadaCard key={`${item.code}-${item.segment}-${i}`} item={item} />
          ))}
        </div>


        {/* Distribuição */}
        <div className="mt-20 max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
            Marcas
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
            Distribuição
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Temos disponíveis em nosso catálogo produtos de marcas nacionais reconhecidas,
            garantindo variedade sem abrir mão da qualidade — incluindo a nossa marca própria{" "}
            <span className="font-bold lowercase text-primary">ébom</span>.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <LogoTile label="ébom" featured />
          {DISTRIBUICAO.map((label) => (
            <LogoTile
              key={label}
              label={label}
              imageClass={label === "Nestlé" ? "w-[95%] h-[95%]" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
