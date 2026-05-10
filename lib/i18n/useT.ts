import { useApp } from "@/lib/store";
import fr from "./fr.json";
import en from "./en.json";

const dict = { fr, en } as const;

// Accès par chemin pointé : "hero.cta_projects" → valeur dans le JSON
type DeepKeys<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepKeys<T[K], `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`>
    : `${Prefix}${Prefix extends "" ? "" : "."}${K & string}`;
}[keyof T];

type TranslationKey = DeepKeys<typeof fr>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split(".").reduce((acc: unknown, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj as unknown) as string ?? path;
}

export function useT() {
  const { lang } = useApp();
  const translations = dict[lang] as unknown as Record<string, unknown>;

  return function t(key: TranslationKey): string {
    return getNestedValue(translations, key);
  };
}
