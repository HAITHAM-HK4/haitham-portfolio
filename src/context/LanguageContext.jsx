import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [isAr, setIsAr] = useState(false);
  const lang = isAr ? 'ar' : 'en';

  useEffect(() => {
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isAr ? 'ar' : 'en');
  }, [isAr]);

  const value = useMemo(
    () => ({
      isAr,
      lang,
      toggleLang: () => setIsAr((prev) => !prev),
      t: (key) => TRANSLATIONS[key]?.[lang] ?? '',
    }),
    [isAr, lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
