import { Logo } from "./Logo";
import { Facebook, Instagram } from "lucide-react";

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#atuacao", label: "Atuação" },
  { href: "#marcas", label: "Marcas" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-navy text-brand-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="inline-block rounded-xl bg-white/5 px-3 py-2">
            <Logo className="h-10 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Distribuição e importação de alimentos desde 2002 — Coronel Fabriciano / MG.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/tbtudobom/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-brand-lime hover:text-brand-lime-foreground"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/tbtudobom/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-brand-lime hover:text-brand-lime-foreground"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-lime">
            Navegação
          </h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-white/80 hover:text-brand-lime">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-lime">Contato</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a href="tel:+553138419200" className="hover:text-brand-lime">
                (31) 3841-9200
              </a>
            </li>
            <li>
              <a href="mailto:tudobom@tudobom.com.br" className="hover:text-brand-lime break-all">
                tudobom@tudobom.com.br
              </a>
            </li>
            <li>Coronel Fabriciano — MG</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} Tudobom Comercial. Todos os direitos reservados.</p>
          <p>
            Marca própria <span className="font-bold lowercase text-brand-lime">ébom</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
