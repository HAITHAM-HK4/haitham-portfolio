export interface HomeData {
  desc_en: string;
  desc_ar: string;
}

export interface AboutData {
  desc_en: string;
  desc_ar: string;
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  loc_en: string;
  loc_ar: string;
  email: string;
}

export interface Skill {
  name_en: string;
  name_ar: string;
  desc_en: string;
  desc_ar: string;
  tags: string;
}

export interface Project {
  img: string;
  link: string;
  name_en: string;
  name_ar: string;
  short_en: string;
  short_ar: string;
  full_en: string;
  full_ar: string;
  tags: string;
}

export interface ContactData {
  email: string;
  phone: string[];
  loc_en: string;
  loc_ar: string;
  linkedin: string;
  coding_en: string;
  coding_ar: string;
}

export interface PortfolioData {
  home: HomeData;
  about: AboutData;
  skills: Skill[];
  projects: Project[];
  edu: {
    desc_en: string;
    desc_ar: string;
    };
  contact: ContactData;
}
