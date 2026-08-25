import { createContext, useContext, useEffect } from "react";
import sr from "./sr";

const LanguageContext = createContext(sr);

/** The site's copy tree. Serbian-only for now — see PRODUCT.md. */
export function useCopy() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }) {
  useEffect(() => {
    document.documentElement.lang = sr.htmlLang;
    document.title = sr.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", sr.meta.description);
  }, []);

  return <LanguageContext.Provider value={sr}>{children}</LanguageContext.Provider>;
}
