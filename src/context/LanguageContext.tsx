import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TRANSLATIONS } from '../data/translations';

interface LanguageContextValue {
  isAr: boolean;
  lang: 'en' | 'ar';
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [isAr, setIsAr] = useState(false);
  const lang: 'en' | 'ar' = isAr ? 'ar' : 'en';

  useEffect(() => {
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isAr ? 'ar' : 'en');
  }, [isAr]);

  const value = useMemo(
    () => ({
      isAr,
      lang,
      toggleLang: () => setIsAr((prev) => !prev),
      t: (key: string) => TRANSLATIONS[key]?.[lang] ?? '',
    }),
    [isAr, lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
