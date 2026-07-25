export interface EducationStage {
  id: string;
  degree_en: string;
  degree_ar: string;
  institution_en: string;
  institution_ar: string;
  location_en: string;
  location_ar: string;
  period: string;
  desc_en: string;
  desc_ar: string;
  highlights_en: string[];
  highlights_ar: string[];
}

export interface EducationData {
  desc_en?: string;
  desc_ar?: string;
  stages?: EducationStage[];
}

export interface PortfolioData {
  edu?: EducationData;
}
