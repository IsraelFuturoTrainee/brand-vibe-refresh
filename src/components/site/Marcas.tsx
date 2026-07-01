const IMPORTADAS = Array.from({ length: 9 }, (_, i) => `Marca Importada ${i + 1}`);

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

function LogoTile({ label, featured = false }: { label: string; featured?: boolean }) {
  return (
    <div
      className={`flex aspect-[3/2] items-center justify-center rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md ${
        featured ? "ring-2 ring-brand-lime" : ""
      }`}
    >
      <span
        className={`font-display font-bold ${
          featured
            ? "text-2xl lowercase text-primary"
            : "text-sm font-semibold text-muted-foreground"
        }`}
      >
        {label}
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
          {IMPORTADAS.map((label) => (
            <LogoTile key={label} label={label} />
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
            <LogoTile key={label} label={label} />
          ))}
        </div>
      </div>
    </section>
  );
}
