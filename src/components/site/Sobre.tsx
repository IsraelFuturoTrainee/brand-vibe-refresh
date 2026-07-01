import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Sparkles } from "lucide-react";
import { Logo } from "./Logo";

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
    <section id="sobre" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
              Sobre Nós
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
              A Empresa
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Fundada em <strong className="text-primary">2002</strong> na cidade de{" "}
                <strong className="text-primary">Coronel Fabriciano</strong>, a Tudobom está
                localizada em uma área total de{" "}
                <strong className="text-primary">15.600 m²</strong> com capacidade para armazenar{" "}
                <strong className="text-primary">2.280 toneladas</strong> de produtos: 1.614
                congeladas, 730 resfriadas e 510 posições secas.
              </p>
              <p>
                Atenta às demandas do mercado, a empresa agregou à sua prestação de serviços a
                importação de um mix de produtos alimentícios. Com essa nova plataforma de
                negócios, a Tudobom avança para uma maior atuação, conquistando definitivamente o
                mercado de produtos alimentícios.
              </p>
              <p>
                Alinhada a um projeto de crescimento, em 2019 a Tudobom lança sua marca própria, a{" "}
                <span className="rounded-md bg-brand-lime/20 px-2 py-0.5 font-bold text-primary lowercase">
                  ébom
                </span>
                , atuando nesse primeiro momento na linha de pescados e laticínios.
              </p>
            </div>
          </div>

          <Card className="flex flex-col items-center justify-center gap-6 border-border bg-muted p-10 text-center">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-border">
              <Logo className="h-20 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              Uma empresa mineira orgulhosa das suas raízes, das suas pessoas e do trabalho que
              realiza todos os dias.
            </p>
          </Card>
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
