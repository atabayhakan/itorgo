import type { Messages } from "./config";

export type Vars = Record<string, string | number>;

/** Interpolate {name} placeholders. */
export function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** Build a translate function: current locale → ru fallback → key itself. */
export function makeT(messages: Messages, fallback: Messages) {
  return (key: string, vars?: Vars): string => {
    const raw = messages[key] ?? fallback[key];
    if (raw === undefined) {
      if (process.env.NODE_ENV !== "production") console.warn(`[i18n] missing key: ${key}`);
      return key;
    }
    return interpolate(raw, vars);
  };
}

export type TFunction = ReturnType<typeof makeT>;
