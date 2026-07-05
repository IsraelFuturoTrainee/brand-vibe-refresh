import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Transparencia } from "./Transparencia";

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#atuacao", label: "Atuação" },
  { href: "#marcas", label: "Marcas" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [transparenciaOpen, setTransparenciaOpen] = useState(false);

  const linkClass =
    "text-xs font-semibold uppercase tracking-wide text-white/90 transition-colors hover:text-brand-lime lg:text-sm";

  return (
    <header className="sticky top-0 z-50 bg-brand-navy text-brand-navy-foreground shadow-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-4 sm:h-28 md:h-32 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <Logo className="h-16 w-auto sm:h-20 md:h-24" />
        </a>

        <nav className="hidden items-center gap-3 md:flex lg:gap-8">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setTransparenciaOpen(true)}
            className={linkClass}
          >
            Transparência
          </button>
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="whitespace-nowrap bg-brand-lime text-brand-lime-foreground font-bold hover:bg-brand-lime/90 lg:h-10 lg:px-4"
          >
            <a href="#contato">Fale Conosco</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-brand-lime">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-brand-navy text-brand-navy-foreground border-brand-navy">
            <SheetTitle className="text-white">Menu</SheetTitle>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-brand-lime"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setTransparenciaOpen(true);
                }}
                className="rounded-md px-3 py-3 text-left text-base font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-brand-lime"
              >
                Transparência
              </button>
              <Button
                asChild
                className="mt-4 bg-brand-lime text-brand-lime-foreground font-bold hover:bg-brand-lime/90"
                onClick={() => setOpen(false)}
              >
                <a href="#contato">Fale Conosco</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <Transparencia open={transparenciaOpen} onOpenChange={setTransparenciaOpen} />
    </header>
  );
}
