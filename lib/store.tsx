"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Lang = "fr" | "en";
export type Theme = "dark" | "light";

interface AppState {
  lang: Lang;
  theme: Theme;
  setLang: (l: Lang) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppState>({
  lang: "fr",
  theme: "dark",
  setLang: () => {},
  toggleTheme: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialise depuis localStorage si dispo, sinon dark par défaut
  const [lang, setLangState] = useState<Lang>("fr");
  const [theme, setThemeState] = useState<Theme>("dark");

  // Lecture localStorage côté client uniquement
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Lang | null;
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedLang) setLangState(savedLang);
    if (savedTheme) setThemeState(savedTheme);
  }, []);

  // Sync thème → attribut HTML + localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync lang → localStorage
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
