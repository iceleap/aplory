import { createContext, useContext, useEffect, useState } from "react";
import sr from "./sr";
import en from "./en";

const COPY = { sr, en };
const STORAGE_KEY = "aplory-lang";

const LanguageContext = createContext(null);

/** The active language's copy tree. */
export function useCopy() {
  return useContext(LanguageContext).copy;
}

/** The active language code plus a setter, for the switch itself. */
export function useLanguage() {
  const { lang, setLang } = useContext(LanguageContext);
  return { lang, setLang };
}

/**
 * Serbian is the default and the site's primary language; English is opt-in.
 *
 * Read synchronously from localStorage on the first render rather than in an
 * effect, so a returning English reader never sees Serbian flash first.
 */
function initialLang() {
  if (typeof window === "undefined") return "sr";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "sr" ? saved : "sr";
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const copy = COPY[lang];

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);

    // The document itself has to follow, not just the visible text: `lang`
    // drives screen-reader pronunciation and hyphenation, and the title and
    // description are what a shared link or a bookmark shows.
    document.documentElement.lang = copy.htmlLang;
    document.title = copy.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", copy.meta.description);
  }, [lang, copy]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, copy }}>{children}</LanguageContext.Provider>
  );
}
