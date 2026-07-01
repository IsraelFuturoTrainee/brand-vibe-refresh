import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Package, Globe2 } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-navy text-brand-navy-foreground">
      {/* Decorative accent */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-lime/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-lime/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-lime/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-lime ring-1 ring-brand-lime/30">
            Desde 2002 • Coronel Fabriciano / MG
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Distribuição e importação de alimentos com{" "}
            <span className="text-brand-lime">qualidade que faz diferença</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            15.600 m² de estrutura, frota refrigerada monitorada e um portfólio de marcas
            nacionais e importadas para levar o melhor produto até você.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-lime text-brand-lime-foreground font-bold hover:bg-brand-lime/90"
            >
              <a href="#contato">
                Fale Conosco <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#sobre">Sobre a empresa</a>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              { k: "22+", v: "anos de mercado" },
              { k: "15.6k", v: "m² de área" },
              { k: "62", v: "caminhões" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-2xl font-extrabold text-brand-lime sm:text-3xl">{s.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-white/70">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="grid w-full max-w-lg grid-cols-2 gap-4">
            <div
              data-lov-image-placeholder
              data-prompt="Modern refrigerated food distribution warehouse interior with pallets and forklifts, corporate photography, blue and green tones"
              data-width="640"
              data-height="800"
              className="aspect-[4/5] rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur"
            >
              <div className="flex h-full items-center justify-center text-white/40">
                <Package className="h-10 w-10" />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div
                data-lov-image-placeholder
                data-prompt="White refrigerated delivery truck on Brazilian highway, corporate logistics photography"
                data-width="640"
                data-height="500"
                className="aspect-[4/3] rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur"
              >
                <div className="flex h-full items-center justify-center text-white/40">
                  <Truck className="h-10 w-10" />
                </div>
              </div>
              <div
                data-lov-image-placeholder
                data-prompt="Global imported food products on a clean supermarket shelf"
                data-width="640"
                data-height="500"
                className="aspect-[4/3] rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur"
              >
                <div className="flex h-full items-center justify-center text-white/40">
                  <Globe2 className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
