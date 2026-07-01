import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Facebook, Instagram, Send } from "lucide-react";
import { toast } from "sonner";

export function Contato() {
  const [assunto, setAssunto] = useState<string>("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success("Mensagem enviada!", {
      description: "Retornaremos em breve. Obrigado pelo contato.",
    });
    (e.target as HTMLFormElement).reset();
    setAssunto("");
  }

  return (
    <section id="contato" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-lime">
            Contato
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
            Fale Conosco
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Entre em contato para saber mais sobre nossos produtos, marcas parceiras ou
            oportunidades comerciais.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Card className="border-border bg-card p-6 sm:p-8">
            <form className="grid gap-5" onSubmit={onSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" name="nome" required placeholder="Seu nome" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" name="email" type="email" required placeholder="voce@email.com" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" name="telefone" placeholder="(00) 00000-0000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Select value={assunto} onValueChange={setAssunto}>
                    <SelectTrigger id="assunto">
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duvidas">Dúvidas</SelectItem>
                      <SelectItem value="sugestoes">Sugestões</SelectItem>
                      <SelectItem value="criticas">Críticas</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={5}
                  placeholder="Como podemos ajudar?"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="justify-self-start bg-brand-lime text-brand-lime-foreground font-bold hover:bg-brand-lime/90"
              >
                Enviar mensagem <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="border-border bg-primary p-6 text-primary-foreground sm:p-8">
              <h3 className="text-xl font-extrabold">Informações</h3>
              <ul className="mt-6 space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-lime text-brand-lime-foreground">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/60">Telefone</div>
                    <a href="tel:+553138419200" className="text-lg font-semibold hover:text-brand-lime">
                      (31) 3841-9200
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-lime text-brand-lime-foreground">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/60">E-mail</div>
                    <a
                      href="mailto:tudobom@tudobom.com.br"
                      className="text-lg font-semibold hover:text-brand-lime break-all"
                    >
                      tudobom@tudobom.com.br
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-lime text-brand-lime-foreground">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/60">Endereço</div>
                    <p className="text-base font-medium">
                      Coronel Fabriciano — Minas Gerais, Brasil
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex gap-3">
                <a
                  href="https://www.facebook.com/tbtudobom/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-brand-lime hover:text-brand-lime-foreground"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/tbtudobom/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-brand-lime hover:text-brand-lime-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
