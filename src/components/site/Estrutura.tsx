import { Card } from "@/components/ui/card";
import { Truck, ShieldCheck, Route, ThermometerSnowflake } from "lucide-react";

const GALLERY = [
  {
    prompt: "Aerial view of a modern food distribution warehouse in Brazil with loading docks",
    label: "Sede administrativa",
  },
  {
    prompt: "Interior of a large refrigerated warehouse with pallet racking full of food products",
    label: "Armazém refrigerado",
  },
  {
    prompt: "Forklift operator moving pallets inside a clean industrial food warehouse",
    label: "Operação logística",
  },
  {
    prompt: "Dry storage area with tall pallet racks and food product boxes",
    label: "Área de seco",
  },
  {
    prompt: "Frozen food storage tunnel with ice on the walls and stacked products",
    label: "Câmara de congelados",
  },
];

const LOG_HIGHLIGHTS = [
  {
    icon: Truck,
    n: "62",
    label: "caminhões próprios",
  },
  {
    icon: ThermometerSnowflake,
    n: "Transporte Multitemperatura",
    label: "Soluções logísticas para cargas congeladas, resfriadas e secas, garantindo a integridade dos produtos.",
  },
  {
    icon: Route,
    n: "100%",
    label: "monitoramento em rota",
  },
  {
    icon: ShieldCheck,
    n: "24/7",
    label: "controle de qualidade",
  },
];

export function Estrutura() {
  return (
    <section id="estrutura" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
            Nosso Negócio
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
            Estrutura
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Uma operação pensada nos mínimos detalhes para preservar a qualidade dos produtos e
            garantir a entrega no prazo combinado.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
          {GALLERY.map((img, i) => (
            <div
              key={img.label}
              data-lov-image-placeholder
              data-prompt={img.prompt}
              data-width="960"
              data-height="720"
              className={`group relative overflow-hidden rounded-2xl bg-primary/10 ring-1 ring-border ${
                i === 0
                  ? "lg:col-span-3 lg:row-span-2 aspect-[4/5] lg:aspect-auto"
                  : i === 1
                    ? "lg:col-span-3 aspect-[4/3]"
                    : "lg:col-span-2 aspect-[4/3]"
              }`}
            >
              <div className="flex h-full items-center justify-center">
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-primary shadow">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Equipe */}
        <div className="mt-16 grid gap-8 rounded-3xl bg-primary p-10 text-primary-foreground sm:p-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
              Equipe
            </span>
            <h3 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Somados por um objetivo comum
            </h3>
          </div>
          <div className="space-y-4 text-white/85">
            <p>
              O trabalho em equipe é definido na Tudobom como a soma dos nossos esforços em prol de
              um atendimento de alta performance. A boa convivência da equipe faz toda a diferença
              no relacionamento com clientes e fornecedores.
            </p>
            <p>
              A nossa harmonia resulta em maior rapidez e eficiência. Com metas e objetivos
              compartilhados, tudo aqui funciona bem — e isso é fundamental para conseguirmos
              ofertar produtos que fazem diferença no dia a dia das pessoas.
            </p>
            <blockquote className="rounded-xl border-l-4 border-brand-lime bg-white/5 px-5 py-4 italic text-white/90">
              “Eu sou parte de uma equipe. Então, quando venço, não sou eu apenas quem vence.”
              <footer className="mt-2 not-italic text-sm text-brand-lime">— Ayrton Senna</footer>
            </blockquote>
          </div>
        </div>

        {/* Logística */}
        <div className="mt-16">
          <div className="max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
              Nosso Negócio
            </span>
            <h3 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl">Logística</h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Para garantir agilidade e segurança na entrega, a Tudobom conta com uma frota
              refrigerada monitorada em tempo real e uma equipe treinada continuamente.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LOG_HIGHLIGHTS.map(({ icon: Icon, n, label }) => (
              <Card
                key={label}
                className="flex flex-col items-start gap-4 border-border bg-card p-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-lime text-brand-lime-foreground">
                  <Icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <div>
                  <div className={`font-extrabold text-primary ${n.includes("•") ? "text-base sm:text-lg leading-tight" : "text-3xl"}`}>
                    {n}
                  </div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">{label}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
