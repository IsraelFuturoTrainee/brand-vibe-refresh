import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Sparkles } from "lucide-react";

const MVV = [
  {
    icon: Target,
    title: "Missão",
    body: "Entregar o melhor produto e serviço com foco em nossas atividades, tendo como principal objetivo a felicidade de nossos clientes, colaboradores, fornecedores e sócios.",
  },
  {
    icon: Eye,
    title: "Visão",
    body: "Ser a melhor solução em distribuição no mercado mineiro.",
  },
  {
    icon: Heart,
    title: "Valores",
    body: "Humildade, ética, transparência, disciplina, integridade e inovação.",
  },
];

const CULTURA = [
  "Amor no que faz",
  "Atitude de dono",
  "Informações certas geram bons negócios",
  "Aprender pelo exemplo",
  "Trabalhar para conquistar",
  "Foco na tarefa",
  "Cuidar dos detalhes",
  "Executar com beleza",
  "Trabalhar com gente boa",
  "Motivar-se diariamente",
  "Respeito pelas pessoas",
  "Espírito de inovação",
];

export function Sobre() {
  return (
    <section id="sobre" className="pt-8 pb-20 sm:pt-10 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
            Sobre Nós
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
            A Empresa
          </h2>
          <div className="mt-6 space-y-5 text-left text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Fundada em <strong className="text-primary">2002</strong>, na cidade de{" "}
              <strong className="text-primary">Coronel Fabriciano (MG)</strong>, a Tudobom
              consolidou-se como uma das principais distribuidoras e importadoras de alimentos do
              estado de Minas Gerais, oferecendo infraestrutura moderna, logística eficiente e um
              portfólio completo de produtos para atender clientes em todo o território nacional.
            </p>
            <div className="mt-8 space-y-6">
              <p className="text-center font-semibold text-primary">
                A empresa conta com duas unidades estratégicas de armazenagem, totalizando
                3.555 posições paletes, distribuídas da seguinte forma:
              </p>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card/50 p-6 text-left">
                  <h4 className="mb-4 text-center font-bold text-primary">Unidade Coronel Fabriciano</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <strong className="text-primary">1.070</strong> posições paletes para
                      produtos congelados;
                    </li>
                    <li>
                      <strong className="text-primary">680</strong> posições paletes para
                      produtos resfriados;
                    </li>
                    <li>
                      <strong className="text-primary">460</strong> posições paletes para
                      produtos secos.
                    </li>
                  </ul>
                  <p className="mt-4 border-t border-border pt-4 text-center font-bold text-primary">
                    Total: 2.210 posições paletes.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card/50 p-6 text-left">
                  <h4 className="mb-4 text-center font-bold text-primary">Unidade Montes Claros (MOC)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <strong className="text-primary">730</strong> posições paletes para
                      produtos congelados;
                    </li>
                    <li>
                      <strong className="text-primary">380</strong> posições paletes para
                      produtos resfriados;
                    </li>
                    <li>
                      <strong className="text-primary">235</strong> posições paletes para
                      produtos secos.
                    </li>
                  </ul>
                  <p className="mt-4 border-t border-border pt-4 text-center font-bold text-primary">
                    Total: 1.345 posições paletes.
                  </p>
                </div>
              </div>
            </div>
            <p>
              Sempre atenta às demandas do mercado, a Tudobom ampliou sua atuação ao agregar a
              importação de um diversificado mix de produtos alimentícios, fortalecendo sua
              presença no segmento e consolidando-se como uma referência no mercado.
            </p>
            <p>
              Em 2019, lançou a marca própria{" "}
              <span className="rounded-md bg-brand-lime/20 px-2 py-0.5 font-bold text-primary lowercase">
                ébom
              </span>
              , iniciando sua atuação nas linhas de pescados e laticínios.
            </p>
          </div>
        </div>

        {/* Missão / Visão / Valores */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {MVV.map(({ icon: Icon, title, body }) => (
            <Card
              key={title}
              className="group relative overflow-hidden border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-lime text-brand-lime-foreground shadow-sm ring-4 ring-brand-lime/15">
                <Icon className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-extrabold uppercase tracking-wide text-primary">
                {title}
              </h3>
              <p className="mt-3 text-muted-foreground">{body}</p>
            </Card>
          ))}
        </div>

        {/* Cultura */}
        <div className="mt-16 rounded-3xl bg-primary p-10 text-primary-foreground sm:p-14">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-brand-lime" />
            <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
              Nossa Cultura
            </span>
          </div>
          <h3 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Os princípios que guiam o nosso dia a dia
          </h3>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CULTURA.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-lime shadow-[0_0_12px] shadow-brand-lime"
                />
                <span className="text-sm font-medium text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
