import { MapPin } from "lucide-react";

const REGIOES = [
  "Minas Gerais",
  "Espírito Santo",
  "Bahia (sul)",
  "Rio de Janeiro (interior)",
  "Vale do Aço",
  "Zona da Mata",
  "Grande BH",
  "Norte de Minas",
];

export function Atuacao() {
  return (
    <section id="atuacao" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
              Nosso Negócio
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
              Atuação
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A partir de Coronel Fabriciano, atendemos a região sudeste com foco em Minas Gerais e
              estados vizinhos, levando qualidade porta a porta.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {REGIOES.map((r) => (
                <li
                  key={r}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-lime/20 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-primary">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-lov-image-placeholder
            data-prompt="Stylized minimal map of southeast Brazil highlighting Minas Gerais with a marker on Coronel Fabriciano, navy blue and lime green corporate colors, clean vector illustration"
            data-width="900"
            data-height="900"
            className="relative aspect-square overflow-hidden rounded-3xl bg-muted ring-1 ring-border"
          >
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="mx-auto h-12 w-12 text-brand-lime" />
                <p className="mt-2 text-sm font-semibold">Mapa de atuação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
