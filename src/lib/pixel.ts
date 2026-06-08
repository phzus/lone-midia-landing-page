// Helpers do Meta Pixel (client). O carregamento do pixel é gated por consentimento
// no componente MetaPixel; aqui só disparamos eventos se o fbq existir.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackLead(eventId: string, segmento?: string): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq(
    "track",
    "Lead",
    { currency: "BRL", content_name: "Diagnostico Gratuito", content_category: segmento },
    { eventID: eventId },
  );
}

export {};
