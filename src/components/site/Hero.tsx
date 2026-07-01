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
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import bannerSalmao from "@/assets/banner-salmao-chileno-v3.png.asset.json";
import bannerVinho from "@/assets/banner-luis-felipe-edwards-v3.png.asset.json";
import bannerSenna from "@/assets/banner-senna-v2.png.asset.json";
import bannerEbomCafe from "@/assets/banner-ebom-cafe.png.asset.json";

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
    kind: "image",
    image: bannerEbomCafe.url,
    alt: "ébom — O sabor que desperta seu dia",
  },
  {
    kind: "image",
    image: bannerSalmao.url,
    alt: "tudobom — Maior importadora de salmão fresco chileno de Minas Gerais",
  },
  {
    kind: "image",
    image: bannerSenna.url,
    alt: "tudobom — Ayrton Senna: dedicação total, buscar o seu limite máximo e dar o melhor de si",
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
  const [mobileSlideHeight, setMobileSlideHeight] = useState<number>();
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  const syncMobileSlideHeight = useCallback(() => {
    if (typeof window === "undefined") return;

    if (window.innerWidth >= 640) {
      setMobileSlideHeight(undefined);
      return;
    }

    const activeIndex = api?.selectedScrollSnap() ?? current;
    const activeSlide = slideRefs.current[activeIndex];
    const activeContent = activeSlide?.firstElementChild as HTMLElement | null;

    if (!activeContent) return;

    setMobileSlideHeight(Math.ceil(activeContent.getBoundingClientRect().height));
  }, [api, current]);

  const scheduleMobileSlideHeightSync = useCallback(() => {
    if (typeof window === "undefined") return;

    window.requestAnimationFrame(syncMobileSlideHeight);
  }, [syncMobileSlideHeight]);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => setCurrent(api.selectedScrollSnap());
    updateCurrent();
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    const id = setInterval(() => api.scrollNext(), 6000);

    return () => {
      clearInterval(id);
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  useEffect(() => {
    scheduleMobileSlideHeightSync();
  }, [current, scheduleMobileSlideHeightSync]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", scheduleMobileSlideHeightSync);
    return () => window.removeEventListener("resize", scheduleMobileSlideHeightSync);
  }, [scheduleMobileSlideHeightSync]);

  const mobileHeightStyle = mobileSlideHeight
    ? ({ "--hero-mobile-height": `${mobileSlideHeight}px` } as CSSProperties)
    : undefined;

  return (
    <section id="top" className="relative bg-brand-navy">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="relative mx-auto w-full overflow-hidden"
        style={mobileHeightStyle}
      >
        <CarouselContent
          className="ml-0 items-start transition-[height] duration-200 sm:items-stretch sm:transition-none"
          style={mobileSlideHeight ? { height: mobileSlideHeight } : undefined}
        >
          {slides.map((slide, i) => (
            <CarouselItem
              key={i}
              ref={(node) => {
                slideRefs.current[i] = node;
              }}
              className="pl-0"
            >
              {slide.kind === "image" ? (
                <div className="relative w-full overflow-hidden bg-brand-navy sm:aspect-[2.85/1] sm:max-h-[480px] sm:min-h-[300px]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 hidden scale-105 bg-cover bg-center blur-xl opacity-65 sm:block"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  <div className="absolute inset-0 hidden bg-brand-navy/20 sm:block" />
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    onLoad={scheduleMobileSlideHeightSync}
                    className="relative z-10 block h-auto w-full object-contain object-center sm:h-full"
                  />
                </div>
              ) : (
                <div className="relative w-full overflow-hidden py-8 sm:h-[35vw] sm:min-h-[360px] sm:max-h-[480px] sm:py-0">

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

        <CarouselPrevious className="left-4 top-[calc(var(--hero-mobile-height,100%)/2)] z-20 h-10 w-10 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:left-6 sm:top-1/2" />
        <CarouselNext className="right-4 top-[calc(var(--hero-mobile-height,100%)/2)] z-20 h-10 w-10 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:right-6 sm:top-1/2" />

        <div className="mt-3 mb-4 flex justify-center gap-2 sm:absolute sm:bottom-4 sm:left-1/2 sm:mt-0 sm:mb-0 sm:-translate-x-1/2">
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

