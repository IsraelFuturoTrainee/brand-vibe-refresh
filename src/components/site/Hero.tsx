import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import bannerSalmao from "@/assets/banner-salmao-chileno-v2.png.asset.json";
import bannerVinho from "@/assets/banner-luis-felipe-edwards-v2.png.asset.json";

type TextSlide = {
  kind: "text";
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cta: { label: string; href: string };
  prompt: string;
};

type ImageSlide = {
  kind: "image";
  image: string;
  alt: string;
};

type Slide = TextSlide | ImageSlide;

const slides: Slide[] = [
  {
    kind: "text",
    eyebrow: "Desde 2002 • Coronel Fabriciano / MG",
    title: "Distribuição e importação de alimentos com",
    highlight: "qualidade que faz diferença",
    description:
      "15.600 m² de estrutura, frota refrigerada monitorada e um portfólio de marcas nacionais e importadas.",
    cta: { label: "Fale Conosco", href: "#contato" },
    prompt:
      "Modern refrigerated food distribution warehouse interior with pallets and forklifts, wide corporate photography, blue and green tones",
  },
  {
    kind: "image",
    image: bannerSalmao.url,
    alt: "tudobom — Maior importadora de salmão fresco chileno de Minas Gerais",
  },
  {
    kind: "text",
    eyebrow: "Importação",
    title: "Marcas do mundo inteiro",
    highlight: "na mesa do consumidor brasileiro",
    description:
      "Selecionamos e importamos produtos de fornecedores globais parceiros para o mercado nacional.",
    cta: { label: "Ver marcas", href: "#marcas" },
    prompt:
      "Assorted premium imported food products on clean supermarket shelves, wide bright commercial photography",
  },
  {
    kind: "image",
    image: bannerVinho.url,
    alt: "tudobom — Vinho Luis Felipe Edwards Doña Bernarda, a elite dos vinhos chilenos",
  },
];

export function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
    const id = setInterval(() => api.scrollNext(), 6000);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section id="top" className="relative bg-brand-navy">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="relative mx-auto w-full overflow-hidden"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="pl-0">
              {slide.kind === "image" ? (
                <div className="relative h-[35vw] min-h-[240px] max-h-[480px] w-full overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

              ) : (
                <div className="relative h-[55vh] min-h-[420px] max-h-[640px] w-full overflow-hidden">
                  <>
                    <div
                      data-lov-image-placeholder
                      data-prompt={slide.prompt}
                      data-width="1920"
                      data-height="1080"
                      className="absolute inset-0 h-full w-full bg-brand-navy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/40" />
                    <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                      <div className="max-w-2xl text-white">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-lime/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-lime ring-1 ring-brand-lime/30">
                          {slide.eyebrow}
                        </span>
                        <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                          {slide.title}{" "}
                          <span className="text-brand-lime">{slide.highlight}</span>.
                        </h1>
                        <p className="mt-6 max-w-xl text-lg text-white/85">
                          {slide.description}
                        </p>
                        <div className="mt-8">
                          <Button
                            asChild
                            size="lg"
                            className="bg-brand-lime text-brand-lime-foreground font-bold hover:bg-brand-lime/90"
                          >
                            <a href={slide.cta.href}>
                              {slide.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 z-20 h-10 w-10 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:left-6" />
        <CarouselNext className="right-4 z-20 h-10 w-10 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:right-6" />

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para o slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                current === i ? "w-8 bg-brand-lime" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}

