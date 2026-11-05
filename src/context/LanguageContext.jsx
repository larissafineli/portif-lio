import { createContext, useContext, useEffect, useState } from 'react';
import perfil from '../data/perfil.json';

const LanguageContext = createContext(null);

function readLanguage() {
  try {
    const saved = localStorage.getItem('portfolio-language');
    if (saved === 'pt' || saved === 'en') return saved;
  } catch { /* armazenamento bloqueado: usa o padrão */ }
  return 'pt';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readLanguage);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    try { localStorage.setItem('portfolio-language', lang); } catch { /* ignora */ }
  }, [lang]);

  const value = { lang, setLang, t: perfil[lang], perfil };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
