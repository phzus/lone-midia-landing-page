export type ConsentState = "granted" | "denied" | "unset";

const KEY = "lone_consent";
export const CONSENT_EVENT = "lone-consent";

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  const v = localStorage.getItem(KEY);
  return v === "granted" || v === "denied" ? v : "unset";
}

export function setConsent(v: "granted" | "denied"): void {
  localStorage.setItem(KEY, v);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}
