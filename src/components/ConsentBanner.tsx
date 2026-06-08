"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

/** Banner de cookies (LGPD). Só aparece se há tracking configurado (Pixel) e consentimento não definido. */
export function ConsentBanner() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pixelId) setShow(getConsent() === "unset");
  }, [pixelId]);

  if (!show) return null;

  const decide = (v: "granted" | "denied") => {
    setConsent(v);
    setShow(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-5">
      <div className="glass mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-soft">
          Usamos cookies para medir e melhorar nossos anúncios. Você decide.{" "}
          <Link
            href="/politica-de-privacidade"
            className="text-brand underline underline-offset-2"
          >
            Saiba mais
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-white/5"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-full bg-linear-to-b from-brand-hi to-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
