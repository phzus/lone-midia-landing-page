"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS, whatsappHref } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="px-4 pt-3 sm:pt-4">
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-colors sm:px-6",
            scrolled ? "glass border-white/10" : "border-transparent",
          )}
        >
          <a
            href="#home"
            className="relative block h-7 w-[124px] shrink-0"
            aria-label="Lone Mídia — início"
          >
            <Image
              src="/brand/logo.png"
              alt="Lone Mídia"
              fill
              priority
              sizes="124px"
              className="object-contain object-left"
            />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href={whatsappHref()} external variant="ghost">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </Button>
            <Button href="#diagnostico" variant="primary">
              Fazer diagnóstico
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-night/90 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full flex-col px-6 pt-5">
            <div className="flex items-center justify-between">
              <div className="relative h-7 w-[124px]">
                <Image
                  src="/brand/logo.png"
                  alt="Lone Mídia"
                  fill
                  sizes="124px"
                  className="object-contain object-left"
                />
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <ul className="mt-12 flex flex-col gap-6">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl font-bold tracking-tight text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 pb-10">
              <Button
                href={whatsappHref()}
                external
                variant="ghost"
                size="lg"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Falar no WhatsApp
              </Button>
              <Button
                href="#diagnostico"
                variant="primary"
                size="lg"
                onClick={() => setOpen(false)}
              >
                Fazer diagnóstico
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
