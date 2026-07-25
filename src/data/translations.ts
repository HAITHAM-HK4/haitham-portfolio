import type { Translations, NavSection, DefaultPortfolioData } from '../types/translations';

export const TRANSLATIONS: Translations = {
  'nav-home': { en: 'Home', ar: 'الرئيسية' },
  'nav-about': { en: 'About', ar: 'عني' },
  'nav-skills': { en: 'Skills', ar: 'المهارات' },
  'nav-projects': { en: 'Projects', ar: 'المشاريع' },
  'nav-edu': { en: 'Education', ar: 'التعليم' },
  'nav-contact': { en: 'Contact', ar: 'تواصل' },
  'about-heading': { en: 'About <span>Me</span>', ar: 'عن <span>نفسي</span>' },
  'skills-heading': { en: 'Skills &amp; <span>Tools</span>', ar: 'المهارات &amp; <span>الأدوات</span>' },
  'projects-heading': { en: 'Latest <span>Projects</span>', ar: 'أحدث <span>المشاريع</span>' },
  'edu-heading': { en: 'My <span>Education</span>', ar: 'تعليمي <span>الأكاديمي</span>' },
  'contact-heading': { en: 'Contact <span>Me!</span>', ar: 'تواصل <span>معي!</span>' },
  'about-btn-download': { en: 'Download CV', ar: 'تحميل السيرة' },
  'about-btn-view': { en: 'View CV', ar: 'عرض السيرة' },
  'cv-btn': { en: 'Hire Me', ar: 'وظّفني' },
  'skills-label': { en: 'Technologies & Strengths', ar: 'التقنيات والمهارات' },
  'lbl-name-title': { en: 'Name', ar: 'الاسم' },
  'lbl-title-title': { en: 'Title', ar: 'المسمى' },
  'lbl-email-title': { en: 'Email', ar: 'البريد' },
  'lbl-loc-title': { en: 'Location', ar: 'الموقع' },
  'lbl-contact-email-title': { en: 'Email', ar: 'البريد الإلكتروني' },
  'lbl-contact-phone-title': { en: 'Phone', ar: 'رقم الهاتف' },
  'lbl-contact-loc-title': { en: 'Location', ar: 'الموقع الحالي' },
  'lbl-contact-linkedin-title': { en: 'LinkedIn', ar: 'لينكد إن' },
  'lbl-contact-coding-title': { en: 'Current Coding', ar: 'الترميز الحالي' },
  'home-hello': { en: "Hello, It's Me", ar: 'مرحباً، أنا' },
};

export const TYPEWRITER_TEXTS: string[] = [
  'Web & Mobile Developer',
  'Frontend Specialist',
  'UI/UX Enthusiast',
  'Full-Stack Engineer',
];

export const NAV_SECTIONS: NavSection[] = [
  { id: 'home', key: 'nav-home' },
  { id: 'about', key: 'nav-about' },
  { id: 'skills', key: 'nav-skills' },
  { id: 'portfolio', key: 'nav-projects' },
  { id: 'education', key: 'nav-edu' },
  { id: 'contact', key: 'nav-contact' },
];

export const DEFAULT_PORTFOLIO_DATA: DefaultPortfolioData = {
  home: { desc_en: '', desc_ar: '' },
  about: {
    desc_en: '',
    desc_ar: '',
    name_en: '',
    name_ar: '',
    title_en: '',
    title_ar: '',
    loc_en: '',
    loc_ar: '',
    email: '',
  },
  skills: [],
  projects: [],
  edu: { desc_en: '', desc_ar: '' },
  contact: {
    email: '',
    phone: '',
    loc_en: '',
    loc_ar: '',
    linkedin: '',
    coding_en: '',
    coding_ar: '',
  },
};
