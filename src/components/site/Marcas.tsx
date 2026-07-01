import ebomLogo from "@/assets/brand-ebom.png.asset.json";
import sadiaLogo from "@/assets/brand-sadia.png.asset.json";
import perdigaoLogo from "@/assets/brand-perdigao.png.asset.json";
import nestleLogo from "@/assets/brand-nestle.png.asset.json";
import brfLogo from "@/assets/brand-brf.png.asset.json";
import bungeLogo from "@/assets/brand-bunge.png.asset.json";
import andorinhaLogo from "@/assets/brand-andorinha.png.asset.json";
import maguaryLogo from "@/assets/brand-maguary.png.asset.json";
import dafrutaLogo from "@/assets/brand-dafruta.png.asset.json";
import donabiaLogo from "@/assets/brand-donabia.png.asset.json";
import rivieraLogo from "@/assets/brand-riviera.png.asset.json";
import kidelliLogo from "@/assets/brand-kidelli.png.asset.json";
import qualyLogo from "@/assets/brand-qualy.png.asset.json";
import sofiteliLogo from "@/assets/brand-sofiteli.png.asset.json";
import salsarettiLogo from "@/assets/brand-salsaretti.png.asset.json";

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

type BrandLogo = { name: string; src: string; featured?: boolean };

const DISTRIBUICAO: BrandLogo[] = [
  { name: "ébom", src: ebomLogo.url, featured: true },
  { name: "Sadia", src: sadiaLogo.url },
  { name: "Perdigão", src: perdigaoLogo.url },
  { name: "Nestlé", src: nestleLogo.url },
  { name: "BRF", src: brfLogo.url },
  { name: "Bunge", src: bungeLogo.url },
  { name: "Andorinha", src: andorinhaLogo.url },
  { name: "Maguary", src: maguaryLogo.url },
  { name: "daFruta", src: dafrutaLogo.url },
  { name: "Dona Bia", src: donabiaLogo.url },
  { name: "Riviera", src: rivieraLogo.url },
  { name: "Kidelli", src: kidelliLogo.url },
  { name: "Qualy", src: qualyLogo.url },
  { name: "Sofiteli", src: sofiteliLogo.url },
  { name: "Salsaretti", src: salsarettiLogo.url },
];

function LogoTile({ item }: { item: BrandLogo }) {
  return (
    <div
      className={`flex aspect-[3/2] items-center justify-center rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
        item.featured ? "ring-2 ring-brand-lime" : ""
      }`}
    >
      <img
        src={item.src}
        alt={`Logo ${item.name}`}
        loading="lazy"
        className="max-h-full max-w-full object-contain"
      />
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
          {DISTRIBUICAO.map((item) => (
            <LogoTile key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
