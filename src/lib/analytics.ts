declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 event. The gtag queue is set up in the root layout, so events
 * fired before the library finishes loading are still delivered.
 */
export function trackEvent(name: string, params?: Record<string, string>) {
  window.gtag?.("event", name, params);
}
