import { MapPin } from "lucide-react";

const REGIOES = [
  "Matriz - Vale do Aço",
  "Metropolitana de Belo Horizonte",
  "Central Mineira",
  "Zona da Mata",
  "Vale do Rio Doce",
  "Vale do Mucuri",
  "Vale do Jequitinhonha",
  "Norte de Minas",
  "Noroeste de Minas",
];

export function Atuacao() {
  return (
    <section id="atuacao" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
            Nosso Negócio
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
            Atuação
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded bg-brand-lime" />
        </div>

        <div className="mt-14 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Os produtos da tudobom, sejam de origem nacional ou importados,
                encontram-se disponíveis para distribuição em todas as regiões
                do estado de Minas Gerais.
              </p>

              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {REGIOES.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-primary">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-lime" />
                    <span className="font-medium">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex items-center justify-center">
              <svg
                viewBox="0 0 400 360"
                className="h-auto w-full max-w-md text-muted-foreground/30"
                fill="currentColor"
                aria-hidden="true"
              >
                {/* Simplified silhouette of Minas Gerais */}
                <path d="M60 150 L90 110 L140 90 L190 70 L240 60 L290 75 L330 100 L355 140 L360 190 L340 230 L310 260 L280 290 L240 305 L200 300 L160 295 L120 280 L90 250 L70 210 Z" />
              </svg>
              <span className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-5xl font-extrabold text-muted-foreground/50">
                MG
              </span>
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-lime text-primary shadow-lg ring-4 ring-background">
                  <MapPin className="h-7 w-7" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
