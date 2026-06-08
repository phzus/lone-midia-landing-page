import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { SITE, whatsappHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void pt-20 pb-10">
      <Container>
        {/* Mote */}
        <p className="max-w-xl font-display text-xl font-light italic tracking-tight text-ink-soft">
          Cada anúncio tem um propósito. Cada palavra, uma função.
        </p>

        {/* Logotipo gigante */}
        <div className="relative mt-10 h-16 w-[min(86vw,560px)] sm:h-24">
          <Image
            src="/brand/logo.png"
            alt="Lone Mídia"
            fill
            sizes="560px"
            className="object-contain object-left opacity-90"
          />
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink-soft">
            <a href="#home" className="hover:text-ink">
              Início
            </a>
            <a href="#metodologia" className="hover:text-ink">
              Metodologia
            </a>
            <a href="#solucoes" className="hover:text-ink">
              Soluções
            </a>
            <a href="#diagnostico" className="hover:text-ink">
              Diagnóstico
            </a>
            <Link href="/politica-de-privacidade" className="hover:text-ink">
              Política de Privacidade
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink-soft transition hover:border-brand/40 hover:text-ink"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/lonemidia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink-soft transition hover:border-brand/40 hover:text-ink"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              aria-label="E-mail"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink-soft transition hover:border-brand/40 hover:text-ink"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-mute">
            Lone Mídia © 2026. Todos os direitos reservados.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs text-ink-mute transition hover:text-ink"
          >
            <ArrowUp className="h-4 w-4" />
            Voltar ao topo
          </a>
        </div>
      </Container>
    </footer>
  );
}
