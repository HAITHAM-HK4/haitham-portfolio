import type { EducationStage } from '../types/education';

export const DEFAULT_EDUCATION_STAGES: EducationStage[] = [
  {
    id: 'bachelor-cet',
    degree_en: "Bachelor's — Computer Engineering & Technology",
    degree_ar: 'بكالوريوس — هندسة الحاسوب والتكنولوجيا',
    institution_en: 'Lattakia University',
    institution_ar: 'جامعة اللاذقية',
    location_en: 'Latakia, Syria',
    location_ar: 'اللاذقية، سوريا',
    period: '2020 – 2025',
    desc_en:
      'Studied Computer Engineering & Technology, gaining a deep understanding of programming principles and software architecture. Contributed to scientific research in data modelling.',
    desc_ar:
      'درست هندسة الحاسوب والتكنولوجيا، وحصلت على فهم عميق لمبادئ البرمجة وهندسة البرمجيات. ساهمت في البحث العلمي في نمذجة البيانات.',
    highlights_en: [
      'Programming principles & software architecture',
      'Scientific research in data modelling',
      'Long-term strategic technical planning',
    ],
    highlights_ar: [
      'مبادئ البرمجة وهندسة البرمجيات',
      'البحث العلمي في نمذجة البيانات',
      'التفكير الاستراتيجي التقني طويل المدى',
    ],
  },
  
    
  
];

export function resolveEducationStages(
  edu: { desc_en?: string; desc_ar?: string; stages?: EducationStage[] } | undefined,
): EducationStage[] {
  if (edu?.stages?.length) return edu.stages;

  return DEFAULT_EDUCATION_STAGES;
}
