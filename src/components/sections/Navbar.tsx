"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, whatsappHref } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty(
        "--navbar-h",
        `${el.offsetHeight}px`,
      );
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
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
    <header
      ref={headerRef}
      className="sticky top-0 z-50"
      style={{ marginBottom: "calc(var(--navbar-h) * -1)" }}
    >
      <div className="px-4 pt-3 sm:pt-4">
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-1.5 transition-colors",
            scrolled ? "glass border-white/10" : "border-transparent",
          )}
          style={
            scrolled
              ? {
                  WebkitBackdropFilter: "blur(8px)",
                  backdropFilter: "blur(8px)",
                }
              : undefined
          }
        >
          <div className="flex items-center gap-6 xl:gap-10">
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

            <ul className="hidden items-center gap-7 lg:flex">
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
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href={whatsappHref()} external variant="ghost">
              <WhatsAppIcon className="h-4 w-4" />
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
                <WhatsAppIcon className="h-5 w-5" />
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
