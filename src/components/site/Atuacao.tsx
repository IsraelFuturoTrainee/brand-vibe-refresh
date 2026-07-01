import { MapPin } from "lucide-react";
import mapaMG from "@/assets/mapa-mg-3d.png.asset.json";

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
              <img
                src={mapaMG.url}
                alt="Mapa de atuação em Minas Gerais"
                className="h-auto w-full max-w-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
