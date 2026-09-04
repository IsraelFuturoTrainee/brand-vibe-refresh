import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import rel20261 from "@/assets/relatorio-2026-1sem.pdf.asset.json";
import rel20252 from "@/assets/relatorio-2025-2sem.pdf.asset.json";
import rel20251 from "@/assets/relatorio-2025-1sem.pdf.asset.json";
import relFreitas20261 from "@/assets/relatorio-freitas-1-semestre-2026.pdf";
import relFreitas20252 from "@/assets/relatorio-freitas-2-semestre-2025.pdf";

type Relatorio = {
  titulo: string;
  url?: string;
};

const RELATORIOS: Relatorio[] = [
  { titulo: "Relatório de Transparência e Igualdade Salarial de Mulheres e Homens - 1º semestre 2026", url: rel20261.url },
  { titulo: "Relatório de Transparência e Igualdade Salarial de Mulheres e Homens - 2º semestre 2025", url: rel20252.url },
  { titulo: "Relatório de Transparência e Igualdade Salarial de Mulheres e Homens - 1º semestre 2025", url: rel20251.url },
];

const RELATORIOS_FREITAS: Relatorio[] = [
  { titulo: "Relatório de Transparência e Igualdade Salarial de Mulheres e Homens - 1º semestre 2026", url: relFreitas20261 },
  { titulo: "Relatório de Transparência e Igualdade Salarial de Mulheres e Homens - 2º semestre 2025", url: relFreitas20252 },
];

interface TransparenciaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Transparencia({ open, onOpenChange }: TransparenciaProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-navy">
            Portal da transparência
          </DialogTitle>
          <DialogDescription className="sr-only">
            Relatórios de transparência e igualdade salarial da Tudobom Comercial
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            O Grupo Tudobom reconhece a importância da transparência e da igualdade salarial em seu
            ambiente de trabalho. Nosso portal de transparência e igualdade salarial oferece aos
            colaboradores acesso a informações claras e detalhadas sobre os salários praticados na
            empresa. Buscamos promover a equidade, garantindo que todos os funcionários sejam
            remunerados de forma justa, independentemente de gênero ou qualquer outra característica.
          </p>
          <p>
            Os resultados são dados estatísticos sem deixar claro as particularidades do nosso ramo
            de atividade, contudo somos comprometidos em manter um ambiente de trabalho inclusivo,
            justo e respeitoso, onde a valorização de todos os colaboradores é uma prioridade.
          </p>
        </div>

        <div className="mt-6 rounded-lg bg-muted p-5">
          <h3 className="mb-4 text-lg font-bold text-brand-navy">Tudobom Comercial</h3>
          <ul className="space-y-4 divide-y divide-border">
            {RELATORIOS.map((rel, i) => (
              <li key={i} className={i > 0 ? "pt-4" : ""}>
                <p className="text-sm font-medium text-foreground">{rel.titulo}</p>
                <div className="mt-3">
                  {rel.url ? (
                    <Button asChild size="sm" className="bg-brand-navy text-white hover:bg-brand-navy/90">
                      <a href={rel.url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="mr-2 h-4 w-4" />
                        baixar relatório
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" disabled className="bg-muted-foreground/40 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      em breve
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-lg bg-muted p-5">
          <h3 className="mb-4 text-lg font-bold text-brand-navy">Freitas</h3>
          <ul className="space-y-4 divide-y divide-border">
            {RELATORIOS_FREITAS.map((rel, i) => (
              <li key={i} className={i > 0 ? "pt-4" : ""}>
                <p className="text-sm font-medium text-foreground">{rel.titulo}</p>
                <div className="mt-3">
                  <Button asChild size="sm" className="bg-brand-navy text-white hover:bg-brand-navy/90">
                    <a href={rel.url} target="_blank" rel="noopener noreferrer" download>
                      <Download className="mr-2 h-4 w-4" />
                      baixar relatório
                    </a>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
