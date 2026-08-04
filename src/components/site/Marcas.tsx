type Importada = { country: string; code: string };

const IMPORTADAS: Importada[] = [
  { country: "Argentina", code: "ar" },
  { country: "Paraguai", code: "py" },
  { country: "Uruguai", code: "uy" },
  { country: "Chile", code: "cl" },
  { country: "Noruega", code: "no" },
  { country: "Portugal", code: "pt" },
  { country: "Vietnã", code: "vn" },
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
  "Qualy",
  "Salsaretti",
  "Natural One",
  "Panasonic",
  "McCain",
  "Suacui",
];

import ebomLogo from "@/assets/ebom-logo.png";
import sadiaLogo from "@/assets/sadia-logo.png.asset.json";
import perdigaoLogo from "@/assets/perdigao.png.asset.json";
import nestleLogo from "@/assets/aiogurteria-nestle.png.asset.json";
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
import luisFelipeEdwardsLogo from "@/assets/luis-felipe-edwards.jpg.asset.json";

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
  Bunge: luisFelipeEdwardsLogo.url,
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
    <div className="flex aspect-[3/2] items-center justify-center rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <img
        src={`https://flagcdn.com/w320/${item.code}.png`}
        srcSet={`https://flagcdn.com/w640/${item.code}.png 2x`}
        width={160}
        height={107}
        alt={`Bandeira ${item.country}`}
        loading="lazy"
        className="h-16 w-auto rounded-sm object-contain shadow-sm sm:h-20"
      />
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
          {IMPORTADAS.map((item) => (
            <ImportadaCard key={item.code} item={item} />
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

        <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
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
