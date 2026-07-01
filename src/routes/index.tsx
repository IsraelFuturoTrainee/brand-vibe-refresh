import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Sobre } from "@/components/site/Sobre";
import { Estrutura } from "@/components/site/Estrutura";
import { Atuacao } from "@/components/site/Atuacao";
import { Marcas } from "@/components/site/Marcas";
import { Contato } from "@/components/site/Contato";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Estrutura />
        <Atuacao />
        <Marcas />
        <Contato />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
