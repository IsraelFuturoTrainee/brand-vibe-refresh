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
                <a
                  href="https://api.whatsapp.com/send?phone=553196149203&text=Olá,%20gostaria%20de%20fazer%20um%20orçamento!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-white transition-transform duration-200 ease-out hover:scale-105"
                  style={{ backgroundColor: "#25D366", boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  FALE CONOSCO VIA WHATSAPP
                </a>
              </div>

            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
