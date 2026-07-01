import ebom from "@/assets/marcas/ebom.png.asset.json";
import naturalOne from "@/assets/marcas/natural-one.png.asset.json";
import naturePalm from "@/assets/marcas/nature-palm.png.asset.json";
import andorinha from "@/assets/marcas/andorinha.png.asset.json";
import suacui from "@/assets/marcas/suacui.png.asset.json";
import bunge from "@/assets/marcas/bunge.png.asset.json";
import brownForman from "@/assets/marcas/brown-forman.png.asset.json";
import classeA from "@/assets/marcas/classe-a.png.asset.json";
import ecomar from "@/assets/marcas/ecomar.png.asset.json";
import nat from "@/assets/marcas/nat.png.asset.json";
import nestle from "@/assets/marcas/nestle.png.asset.json";
import panasonic from "@/assets/marcas/panasonic.png.asset.json";
import schultz from "@/assets/marcas/schultz.png.asset.json";
import maguary from "@/assets/marcas/maguary.png.asset.json";
import dafruta from "@/assets/marcas/dafruta.png.asset.json";
import donaBia from "@/assets/marcas/dona-bia.png.asset.json";
import riviera from "@/assets/marcas/riviera.png.asset.json";
import sadia from "@/assets/marcas/sadia.png.asset.json";
import brf from "@/assets/marcas/brf.png.asset.json";
import kidelli from "@/assets/marcas/kidelli.png.asset.json";
import qualy from "@/assets/marcas/qualy.png.asset.json";
import sofiteli from "@/assets/marcas/sofiteli.png.asset.json";
import perdigao from "@/assets/marcas/perdigao.png.asset.json";
import salsaretti from "@/assets/marcas/salsaretti.png.asset.json";

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

type Marca = { label: string; logo?: { url: string } };

const DISTRIBUICAO: Marca[] = [
  { label: "Sadia", logo: sadia },
  { label: "Perdigão", logo: perdigao },
  { label: "Nestlé", logo: nestle },
  { label: "BRF", logo: brf },
  { label: "Bunge", logo: bunge },
  { label: "Andorinha", logo: andorinha },
  { label: "Maguary", logo: maguary },
  { label: "daFruta", logo: dafruta },
  { label: "Dona Bia", logo: donaBia },
  { label: "Riviera", logo: riviera },
  { label: "Kidelli", logo: kidelli },
  { label: "Qualy", logo: qualy },
  { label: "Sofiteli", logo: sofiteli },
  { label: "Salsaretti", logo: salsaretti },
  { label: "Etti" },
  { label: "Cajamar" },
  { label: "Natural One", logo: naturalOne },
  { label: "Nature Palm", logo: naturePalm },
  { label: "Classe A", logo: classeA },
  { label: "Ecomar", logo: ecomar },
  { label: "Nat", logo: nat },
  { label: "Panasonic", logo: panasonic },
  { label: "Schultz", logo: schultz },
  { label: "Brown-Forman", logo: brownForman },
  { label: "McCain" },
  { label: "Nucos" },
  { label: "Terra Vega" },
  { label: "Suacui", logo: suacui },
];

function LogoTile({
  label,
  logo,
  featured = false,
}: {
  label: string;
  logo?: { url: string };
  featured?: boolean;
}) {
  return (
    <div
      className={`flex aspect-[3/2] items-center justify-center rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md ${
        featured ? "ring-2 ring-brand-lime" : ""
      }`}
    >
      {logo ? (
        <img
          src={logo.url}
          alt={label}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span
          className={`font-display font-bold ${
            featured
              ? "text-2xl lowercase text-primary"
              : "text-sm font-semibold text-muted-foreground"
          }`}
        >
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
          <LogoTile label="ébom" logo={ebom} featured />
          {DISTRIBUICAO.map((m) => (
            <LogoTile key={m.label} label={m.label} logo={m.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
