import { supabase } from "@/integrations/supabase/client";

export type ErrorKind = "runtime" | "rejection" | "navigation";

interface ReportInput {
  kind: ErrorKind;
  message: string;
  stack?: string | null;
}

const recent = new Map<string, number>();
const DEDUPE_WINDOW_MS = 30_000;

/**
 * Report a client-side error to the backend (public.site_errors).
 * Fire-and-forget: never throws, never blocks the UI, dedupes repeats.
 */
export const reportError = ({ kind, message, stack }: ReportInput) => {
  try {
    const key = `${kind}:${message}`;
    const now = Date.now();
    const last = recent.get(key) ?? 0;
    if (now - last < DEDUPE_WINDOW_MS) return;
    recent.set(key, now);

    const route = window.location.pathname.replace(
      import.meta.env.BASE_URL.replace(/\/$/, ""),
      ""
    ) || "/";

    void supabase
      .from("site_errors")
      .insert({
        kind,
        message: String(message).slice(0, 2000),
        stack: stack ? String(stack).slice(0, 4000) : null,
        url: window.location.href.slice(0, 1000),
        route,
        user_agent: navigator.userAgent.slice(0, 500),
      })
      .then(({ error }) => {
        if (error) console.warn("Error reporting failed:", error.message);
      });
  } catch {
    // Never let error reporting break the app
  }
};

let installed = false;

/** Install global handlers for uncaught errors and unhandled promise rejections. */
export const installErrorReporting = () => {
  if (installed) return;
  installed = true;

  window.addEventListener("error", (event) => {
    // Ignore cross-origin script errors with no details
    if (!event.message && !event.error) return;
    reportError({
      kind: "runtime",
      message: event.message || "Unknown runtime error",
      stack: event.error?.stack ?? null,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    reportError({
      kind: "rejection",
      message:
        reason instanceof Error
          ? reason.message
          : typeof reason === "string"
            ? reason
            : "Unhandled promise rejection",
      stack: reason instanceof Error ? (reason.stack ?? null) : null,
    });
  });
};
