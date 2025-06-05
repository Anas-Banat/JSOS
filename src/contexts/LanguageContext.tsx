
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
};

const translations = {
  // Navigation items
  navHome: {
    ar: 'الرئيسية',
    en: 'Home'
  },
  navAbout: {
    ar: 'من نحن',
    en: 'About Us'
  },
  navMembers: {
    ar: 'أعضاء الجمعية',
    en: 'Association Members'
  },
  navMembersPage: {
    ar: 'الأعضاء',
    en: 'Members'
  },
  navOrgChart: {
    ar: 'الهيكل التنظيمي',
    en: 'Organisation Chart'
  },
  navJsosMedia: {
    ar: 'وسائط جمعية جراحة السمنة',
    en: 'JSOS Media'
  },
  navCongress: {
    ar: 'المؤتمرات',
    en: 'Congress'
  },
  navFirstCongress: {
    ar: 'المؤتمر الأول للجمعية',
    en: 'First JSOS Congress'
  },
  navSecondCongress: {
    ar: 'المؤتمر الثاني',
    en: 'Second Congress'
  },
  navThirdCongress: {
    ar: 'المؤتمر الثالث',
    en: 'Third Congress'
  },
  navFourthCongress: {
    ar: 'المؤتمر الرابع',
    en: 'Fourth Congress'
  },
  navAlKindiWorkshop: {
    ar: 'ورشة عمل الكندي',
    en: 'Al-Kindi Workshop'
  },
  navWorkshop: {
    ar: 'ورشة عمل',
    en: 'Workshop'
  },
  navContact: {
    ar: 'اتصل بنا',
    en: 'Contact Us'
  },
  navGuides: {
    ar: 'الإرشادات',
    en: 'Guides'
  },
  navJsosBylaw: {
    ar: 'النظام الداخلي للجمعية',
    en: 'JSOS Bylaw'
  },
  navDoctorGuidelines: {
    ar: 'إرشادات الطبيب',
    en: 'Doctor Guidelines'
  },
  navPracticalRecommendations: {
    ar: 'توصيات عملية للسمنة',
    en: 'Practical Recommendation Of Obesity'
  },
  navEuropeanGuidelines: {
    ar: 'الإرشادات الأوروبية للجراحة الأيضية والسمنة',
    en: 'Interdisciplinary European Guidelines on Metabolic and Bariatric Surgery'
  },
  navObesityCountries: {
    ar: 'السمنة في ١٩٥ دولة',
    en: 'Obesity in 195 Countries'
  },
  navNutritionalGuidelines: {
    ar: 'إرشادات التغذية ٢٠١٦',
    en: 'ASMBS Nutritional Guidelines 2016'
  },
  navObesity: {
    ar: 'السمنة',
    en: 'Obesity'
  },
  navBmi: {
    ar: 'مؤشر كتلة الجسم',
    en: 'BMI'
  },
  navCandidate: {
    ar: 'هل أنت مرشح؟',
    en: 'Are You a Candidate'
  },
  navDisease: {
    ar: 'المرض',
    en: 'Disease'
  },
  navBariatricSurgery: {
    ar: 'جراحة السمنة',
    en: 'Bariatric Surgery'
  },
  navGastricBanding: {
    ar: 'ربط المعدة القابل للتعديل',
    en: 'Adjustable Gastric Banding'
  },
  navBilioPancreatic: {
    ar: 'تحويل البنكرياس الصفراوي',
    en: 'BilioPancreatic Diversion'
  },
  navOneAnastomosis: {
    ar: 'مجازة المعدة بمفاغرة واحدة',
    en: 'One Anastomosis Gastric Bypass'
  },
  navRouxEnY: {
    ar: 'مجازة المعدة روكس إن واي',
    en: 'Roux-en-Y Gastric Bypass'
  },
  navSleeveGastrectomy: {
    ar: 'استئصال المعدة الطولي',
    en: 'Sleeve Gastrectomy'
  },
  navClinicalTrials: {
    ar: 'التجارب السريرية',
    en: 'Clinical Trials'
  },
  navEvents: {
    ar: 'الفعاليات',
    en: 'Events'
  },
  navNews: {
    ar: 'الأخبار',
    en: 'News'
  },
  // Website title and basics
  websiteTitle: {
    ar: 'جمعية جراحة السمنة الأردنية',
    en: 'Jordanian Society for Obesity Surgery'
  },
  // websiteAcronym: {
  //   ar: 'جمعية جراحة السمنة الأردنية',
  //   en: 'JSOS'
  // },

  // Hero section
  heroTitle: {
    ar: 'جمعية جراحة السمنة الأردنية',
    en: 'Jordanian Society for Obesity Surgery'
  },
  heroSubtitle: {
    ar: 'نحو مستقبل أفضل لعلاج السمنة',
    en: 'Towards a Better Future for Obesity Treatment'
  },
  // Vision & Mission
  visionTitle: {
    ar: 'رؤيتنا',
    en: 'Our Vision'
  },
  visionContent: {
    ar: 'أن نكون الجهة الرائدة في مجال جراحة السمنة والأيض في الأردن والمنطقة، وتقديم أعلى مستويات الرعاية الصحية للمرضى.',
    en: 'To be the leading entity in the field of obesity and metabolic surgery in Jordan and the region, providing the highest levels of healthcare to patients.'
  },
  missionTitle: {
    ar: 'مهمتنا',
    en: 'Our Mission'
  },
  missionContent: {
    ar: 'تعزيز وتطوير مجال جراحة السمنة في الأردن، وتقديم الدعم للجراحين والعاملين في المجال الصحي، ونشر الوعي حول أهمية علاج السمنة.',
    en: 'To promote and develop the field of obesity surgery in Jordan, provide support to surgeons and healthcare workers, and raise awareness about the importance of obesity treatment.'
  },
  overviewTitle: {
    ar: 'نظرة عامة',
    en: 'Overview'
  },
  overviewContent: {
    ar: 'تأسست جمعية جراحة السمنة الأردنية لتكون منصة تجمع المهتمين بجراحة السمنة وعلاجها، وتهدف إلى تبادل الخبرات ونشر أحدث التقنيات والممارسات في هذا المجال.',
    en: 'The Jordanian Society for Obesity Surgery was established as a platform that brings together those interested in obesity surgery and treatment, and aims to exchange experiences and spread the latest technologies and practices in this field.'
  },
  // About Us
  aboutTitle: {
    ar: 'من نحن',
    en: 'About Us'
  },
  aboutContent: {
    ar: 'جمعية جراحة السمنة الأردنية هي منظمة مهنية تهدف إلى تحسين مستوى الرعاية الصحية للمرضى الذين يعانون من السمنة في الأردن. تم تأسيسها من قبل مجموعة من الجراحين المتخصصين في مجال جراحة السمنة والأيض.',
    en: 'The Jordanian Society for Obesity Surgery is a professional organization that aims to improve the level of healthcare for patients suffering from obesity in Jordan. It was established by a group of surgeons specialized in the field of obesity and metabolic surgery.'
  },
  yearsOfExperience: {
    ar: 'سنوات الخبرة',
    en: 'Years of Experience'
  },
  medicalProfessionals: {
    ar: 'أعضاء الجمعية الطبية',
    en: 'Medical Professionals'
  },
  publishedResearch: {
    ar: 'البحوث المنشورة',
    en: 'Published Research'
  },
  annualEvents: {
    ar: 'الفعاليات السنوية',
    en: 'Annual Events'
  },
  // Events
  eventsTitle: {
    ar: 'الفعاليات القادمة',
    en: 'Upcoming Events'
  },
  pastEventsTitle: {
    ar: 'الفعاليات السابقة',
    en: 'Past Events'
  },
  eventDateLabel: {
    ar: 'التاريخ:',
    en: 'Date:'
  },
  eventLocationLabel: {
    ar: 'المكان:',
    en: 'Location:'
  },
  eventDetailsButton: {
    ar: 'التفاصيل',
    en: 'Details'
  },
  // Members
  membersTitle: {
    ar: 'أعضاء الجمعية',
    en: 'Association Members'
  },
  membersSubtitle: {
    ar: 'تعرف على فريقنا من الخبراء',
    en: 'Meet Our Team of Experts'
  },
  // Contact form
  contactTitle: {
    ar: 'تواصل معنا',
    en: 'Contact Us'
  },
  contactSubtitle: {
    ar: 'نرحب بأسئلتكم واستفساراتكم',
    en: 'We welcome your questions and inquiries'
  },
  formName: {
    ar: 'الاسم',
    en: 'Name'
  },
  formPhone: {
    ar: 'رقم الهاتف',
    en: 'Phone Number'
  },
  formTitle: {
    ar: 'العنوان',
    en: 'Title'
  },
  formMessage: {
    ar: 'الرسالة',
    en: 'Message'
  },
  formSubmit: {
    ar: 'إرسال',
    en: 'Send'
  },
  // Footer
  footerText: {
    ar: 'جميع الحقوق محفوظة © 2025 جمعية جراحة السمنة الأردنية',
    en: '© 2025 Jordanian Society for Obesity Surgery. All rights reserved.'
  },
  footerAddress: {
    ar: 'عمان, الأردن',
    en: 'Amman, Jordan'
  },
  // Generic
  learnMore: {
    ar: 'اقرأ المزيد',
    en: 'Learn More'
  },
  viewAll: {
    ar: 'عرض الكل',
    en: 'View All'
  },
  downloadPdf: {
    ar: 'تحميل PDF',
    en: 'Download PDF'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      // Default to Arabic if no language is stored
      setLanguage('ar');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
