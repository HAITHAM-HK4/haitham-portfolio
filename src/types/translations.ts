export interface Translation {
  en: string;
  ar: string;
}

export interface Translations {
  [key: string]: Translation;
}

export interface NavSection {
  id: string;
  key: string;
}

export interface DefaultPortfolioData {
  home: { desc_en: string; desc_ar: string };
  about: {
    desc_en: string;
    desc_ar: string;
    name_en: string;
    name_ar: string;
    title_en: string;
    title_ar: string;
    loc_en: string;
    loc_ar: string;
    email: string;
  };
  skills: unknown[];
  projects: unknown[];
  edu: { desc_en: string; desc_ar: string };
  contact: {
    email: string;
    phone: string;
    loc_en: string;
    loc_ar: string;
    linkedin: string;
    coding_en: string;
    coding_ar: string;
  };
}
