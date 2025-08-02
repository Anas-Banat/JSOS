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
    ar: 'عن الجمعية',
    en: 'About Us'
  },
  navWelcome: {
    ar: 'اهلا بكم في جمعية السمنة',
    en: 'Welcome To JSOS'
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
    ar: 'النظام الداخلي',
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
  navMedia: {
    ar: 'وسائل الاعلام',
    en: 'Media'
  },
  navNews: {
    ar: 'الأخبار',
    en: 'News'
  },
  navGallery: {
    ar: 'معرض الصور',
    en: 'Gallery'
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
  // Organization Chart
  samiAhmed: {
    ar: 'د. سامي أحمد',
    en: 'Dr. Sami Ahmad'
  },
  president: {
    ar: 'رئيس الجمعية',
    en: 'President'
  },
  mohammaKdhres: {
    ar: 'د. محمد خريس',
    en: 'Dr. Mohammad Khrais'
  },
  vicePresident: {
    ar: 'نائب الرئيس',
    en: 'Vice President'
  },
  mohammadZetawi: {
    ar: 'د. محمد زيتوي',
    en: 'Dr. Mohammad Zetawi'
  },
  treasurer: {
    ar: 'أمين الصندوق',
    en: 'Treasurer'
  },
  mohammadRashdan: {
    ar: 'د. محمد الرشدان',
    en: 'Dr. Mohammad Al-Rashdan'
  },
  secretary: {
    ar: 'أمين السر',
    en: 'Secretary'
  },
  taglebMazahreh: {
    ar: 'د. تغلب مزاهرة',
    en: 'Dr. Tagleb Mazahreh'
  },
  scientificCommittee: {
    ar: 'اللجنة العلمية ',
    en: 'Scientific Committee Chair'
  },
  osamaDamrah: {
    ar: 'د. أسامة ضمرة',
    en: 'Dr. Osama Damra'
  },
  boardMember: {
    ar: 'عضو لجنة الإدارة',
    en: 'Board Member'
  },
  omar: {
    ar: 'د. عمر شوابكة',
    en: 'Dr. Omar Shawabkeh'
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
  //Official Bylaws
  jsosBylawTitle: {
    ar: 'النظام الداخلي للجمعية',
    en: 'Official Bylaws Of The JSOS'
  },
  jsosBylawContent1: {
    ar: 'يسعدنا أن نضع بين أيديكم النظام الأساسي لجمعية جراحة السمنة الأردنية، والذي يوضّح أهداف الجمعية، شروط العضوية، صلاحيات الهيئة الإدارية، والإطار القانوني الناظم لجميع أنشطة الجمعية. ',
    en: 'We are pleased to share with you the official bylaws of the Jordanian Society for Obesity Surgery (JSOS), which outline the Societys objectives, membership criteria, administrative authorities, and the legal framework governing all its activities.'
  },
  jsosBylawContent2: {
    ar: 'تم إعداد هذا النظام لضمان الحوكمة الرشيدة وتعزيز الشفافية والمهنية في عمل الجمعية، بما يخدم مصلحة أعضائها ويساهم في تطوير مجال جراحة السمنة في الأردن.',
    en: 'This document was developed to ensure good governance, transparency, and professionalism in the Societys operations, aiming to serve its members and advance the field of obesity surgery in Jordan.'
  },
  jsosBylawContent3: {
    ar: 'يمكنكم تحميل نسخة كاملة من النظام عبر الزر أدناه.',
    en: 'You can download the full version of the bylaws using the button below.'
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
  
  // Gastric Banding Content
  gastricBandingDescription: {
    ar: 'ربط المعدة القابل للتعديل مصنوع من السيليكون الناعم ومزود ببالون قابل للنفخ مثبت بإحكام. هذا البالون متصل بأنبوب بمنفذ وصول.',
    en: 'The adjustable gastric band is made of soft silicone and is equipped with a firmly attached inflatable balloon. This balloon is connected by a tube to an access port.'
  },
  gastricBandingPlacement: {
    ar: 'يتم وضع الشريط حول الجزء العلوي من المعدة عن طريق الجراحة بالمنظار (أو الجراحة التنظيرية) لإنشاء كيس صغير. هذا الكيس الصغير يقع فوق الشريط وله سعة 15-20 مل. المعدة المتبقية تقع أسفل الشريط. يساعد الشريط المرضى على تقليل الوزن من خلال آليتين:',
    en: 'The band is positioned around the upper part of the stomach by keyhole (or laparoscopic) surgery so as to create a small pouch. This small pouch lies above the band and has a capacity of 15-20mL. The remaining stomach lies below the band. The band helps patients reduce weight by 2 mechanisms:'
  },
  gastricBandingMechanism1: {
    ar: 'بتقليل كمية الطعام التي يريد الفرد تناولها من خلال إحداث شعور بالشبع بعد نصف كوب من الطعام فقط؛ و',
    en: 'By reducing the amount of food that an individual wants to eat by inducing a feeling of fullness after only half a cup of food; and'
  },
  gastricBandingMechanism2: {
    ar: 'بإبطاء إفراغ الكيس فوق الشريط، مما يطيل الشعور بالشبع',
    en: 'By slowing down the emptying from the pouch above the band, thereby prolonging the feeling of fullness'
  },
  gastricBandingIntact: {
    ar: 'نظراً لأن إدخال ربط المعدة القابل للتعديل لا يتضمن أي تدبيس أو استئصال أو تقصير لأي جزء من المعدة أو الأمعاء، فإن وظيفة الجهاز الهضمي تبقى سليمة. سيتم امتصاص جميع الطعام المتناول من قبل الجسم بنفس الطريقة التي كانت عليه قبل العملية. يتم تحقيق فقدان الوزن من خلال المساعدة في إحداث شعور مبكر بالشبع بعد تناول كميات أقل بكثير من الطعام مقارنة بما قبل الجراحة. من المهم جداً تجنب الأطعمة عالية السعرات الحرارية، مثل الآيس كريم والكاسترد والشوكولاتة.',
    en: 'Since the insertion of the adjustable gastric band does not involve any stapling, resection or shortening of any part of the stomach or intestines, the function of the digestive system remains intact. All ingested food will still be absorbed by the body the same way that it was before the operation. Weight loss is achieved by helping induce early feeling of satiety after eating considerably smaller amounts of food than before the surgery. It is most important to avoid foods of high caloric content, such as ice cream, custards and chocolates.'
  },
  gastricBandingAdjustment: {
    ar: 'يتم تعديل حجم مخرج الكيس من خلال تعديل حجم السائل في البالون عبر منفذ الوصول. منفذ الوصول موجود تحت الجلد عادة في الجزء العلوي من البطن ويمكن الوصول إليه بسهولة من قبل الطبيب المعالج بإبرة خاصة.',
    en: 'The size of the pouch outlet is adjusted by adjusting the volume of fluid in the balloon through the access port. The access port is situated under the skin usually in the upper abdomen and is easily accessible by the treating doctor with a special needle.'
  },
  gastricBandingImage: {
    ar: 'ربط المعدة القابل للتعديل على المعدة',
    en: 'The Adjustable Gastric Band on the stomach'
  },
  gastricBandingOperation: {
    ar: 'العملية',
    en: 'The Operation'
  },
  gastricBandingOperationDesc: {
    ar: 'يتم إدخال ربط المعدة القابل للتعديل عادة عبر النهج التنظيري. يتم إجراء خمس أو ست شقوق صغيرة في البطن لإدخال كاميرا وأدوات ويتم وضع ربط المعدة القابل للتعديل في الطرف العلوي من المعدة.',
    en: 'Insertion of the adjustable gastric band is usually done via laparoscopic approach. Five or six small incisions are made in the abdomen to introduce a camera and instruments and the adjustable gastric band is positioned at the upper end of the stomach.'
  },
  gastricBandingPlacementDesc: {
    ar: 'بمجرد وضع الشريط في مكانه، يتم إدخال الأنبوب المتصل ومنفذ الوصول وتثبيتهما في جدار البطن العلوي. يتم إغلاق جميع الشقوق أخيراً باستخدام غرز قابلة للامتصاص لا تحتاج إلى إزالتها.',
    en: 'Once the band is placed in position, the connecting tube and access port are inserted and secured to the upper abdominal wall. All incisions are finally closed using absorbable sutures which do not need to be removed.'
  },
  gastricBandingWeightLoss: {
    ar: 'كم من الوزن يمكن أن تتوقع خسارته؟',
    en: 'How much weight can you expect to lose?'
  },
  gastricBandingWeightLossDesc: {
    ar: 'سيتم فقدان الوزن تدريجياً ويجب أن يبدأ فوراً بعد الجراحة. سيعتمد مقدار فقدان الوزن جزئياً على كمية السائل المحقون في البالون لتوفير شعور بالشبع. والأهم من ذلك، سيعتمد مقدار فقدان الوزن على المدى الطويل على المريض، أي على مدى حرص المريض على اتباع التوصيات المتعلقة بعادات الأكل والنظام الغذائي والتمارين الرياضية. معدل فقدان الوزن الموصى به الذي نود رؤيته هو 0.5 - 1.0 كجم في الأسبوع. في المتوسط، من المتوقع أن يتم فقدان 50-60٪ من الوزن الزائد على المدى الطويل.',
    en: 'The weight will be lost gradually and should commence immediately after surgery. The amount of weight loss will depend partly on the amount of fluid injected into the balloon to provide a feeling of satiety. More importantly, the amount of weight loss in the long term will depend on the patient, i.e. on how carefully the patient follows the recommendations regarding eating habits, diet and exercise. The recommended rate of weight loss we would like to see is 0.5 – 1.0 kg per week. On average it is expected that 50-60% excess weight will be lost long term.'
  },
  gastricBandingFollowUp: {
    ar: 'هذا يعني أيضاً التزاماً طويل المدى بالمتابعة من قبل عيادة جراحة السمنة حيث تظهر البيانات بوضوح أهمية المتابعة لفقدان الوزن الناجح. نوصي باتباع تعليمات النظام الغذائي من أخصائي التغذية لدينا وإذا لزم الأمر تناول مكمل فيتامينات متعدد.',
    en: 'This also means a long term commitment to follow up by your bariatric clinic as data clearly shows the importance of follow up for successful weight loss. We recommend that you follow the dietary instructions from our dietician and if necessary take a multivitamin supplement.'
  },
  gastricBandingComorbidity: {
    ar: 'حل الأمراض المصاحبة',
    en: 'Co-morbidity resolution'
  },
  gastricBandingComorbidityDesc: {
    ar: 'الأمراض المصاحبة المرتبطة بالوزن مثل السكري وانقطاع النفس الانسدادي أثناء النوم وارتفاع ضغط الدم تتحسن مع فقدان الوزن الناجح.',
    en: 'Weight-related co-morbidities such as diabetes, obstructive sleep apnoea and hypertension resolve along with successful weight loss.'
  },
  gastricBandingRisks: {
    ar: 'ما هي المخاطر المرتبطة بإجراء ربط المعدة لفقدان الوزن؟',
    en: 'What are the risks involved in having gastric banding for weight reduction?'
  },
  gastricBandingRisksDesc: {
    ar: 'في حين أن النهج التنظيري ساعد في تقليل مدة الإقامة في المستشفى من خلال تقليل فترة التعافي بعد الجراحة، فإن إدخال شريط المعدة ليس بدون مضاعفات بسبب وزن المريض وحالته المرضية السابقة. كما هو الحال مع أي إجراء جراحي، هناك مخاطر مرتبطة بالمريض. في حين سيسعى الجراح إلى تقليل المخاطر، قد تحدث مضاعفات قد يكون لها آثار دائمة.',
    en: 'Whilst the laparoscopic approach has helped decrease the length of hospital stay by decreasing the postoperative recovery period, the insertion of the gastric band is not without complications because of the weight of the patient and his/her premorbid condition. As with any surgical procedure, there are associated risks to the patient. Whilst your surgeon will endeavor to minimize risks, complications may occur which may have permanent effects.'
  },
  gastricBandingLaparoscopicRisks: {
    ar: 'المخاطر المحددة المرتبطة بالجراحة التنظيرية تشمل:',
    en: 'Specific Risks Associated With Laparoscopic Surgery Include:'
  },
  gastricBandingRisk1: {
    ar: 'في حين قد يكون الجراح قد أوصى بالجراحة التنظيرية لإدخال شريط المعدة، قد يجد أنه بعد بدء الإجراء، هذا النهج غير آمن بسبب النتائج أو الأحداث غير المتوقعة. إذا كان هذا هو الحال، فقد يقوم الجراح بإدخال شريط المعدة من خلال شق كبير (حوالي 10 إلى 15 سم في الطول) في البطن. هذا يعرف بالجراحة المفتوحة أو "بضع البطن".',
    en: 'Whilst your surgeon may have recommended laparoscopy to insert the gastric band, he/she may find that, after starting the procedure, this approach is not safe due to unexpected findings or events. If this is the case, then your surgeon may insert the gastric band through a large incision (approximately 10 to 15cm in length) in the abdomen. This is known as open surgery or "laparotomy".'
  },
  gastricBandingRisk2: {
    ar: 'التحويل من نهج تنظيري إلى نهج مفتوح ليس مضاعفة للإجراء بل لحماية مصلحة سلامة المريض ورفاهيته. المضاعفة المحتملة للشق المفتوح هي إمكانية حدوث فتق في الشق على المدى الطويل. احتمال حدوث هذا أعلى في المرضى البدناء مقارنة بأولئك ذوي الوزن الطبيعي وهو حوالي 1-2٪.',
    en: 'Converting from a laparoscopic to an open approach is not a complication of the procedure but rather to protect the interest of the patient\'s safety and wellbeing. A potential complication to an open incision is the possibility of an incisional hernia in the long term. The likelihood of this is higher in obese patients compared to those with normal weight & is approximately 1-2%.'
  },
  gastricBandingRisk3: {
    ar: 'النزيف المفرط',
    en: 'Excessive bleeding'
  },
  gastricBandingRisk4: {
    ar: 'العدوى',
    en: 'Infection'
  },
  gastricBandingRisk5: {
    ar: 'إصابة الأعضاء القريبة من المعدة',
    en: 'Injury to organs near the stomach'
  },
  gastricBandingRisk6: {
    ar: 'إصابة جدار المعدة',
    en: 'Injury to the stomach wall'
  },
  gastricBandingRisk7: {
    ar: 'إصابة الأوعية الدموية الرئيسية',
    en: 'Injury to major blood vessels'
  },
  gastricBandingRisk8: {
    ar: 'انصمام الغاز من الغاز المستخدم في تجويف البطن',
    en: 'Gas embolism from the gas used in the abdominal cavity'
  },
  gastricBandingSafety: {
    ar: 'عملية شريط المعدة آمنة جداً ولكن المضاعفات تحدث في عدد صغير من المرضى ومن المهم أن تفهم المخاطر بالكامل وتناقش هذه المسألة مع الجراح قبل أن تقرر إجراء هذه العملية. لا يوجد ضمان أن شريط المعدة سيعمل بدون عطل لبقية حياتك. ومع ذلك، الاستخدام الواسع لشريط المعدة منذ عام 1985 يوضح أنه يعمل بشكل جيد ويمكن أن يكون خالياً من المضاعفات مع فقدان الوزن على المدى الطويل. هذا الخلو من المضاعفات وفقدان الوزن الناجح من المرجح أن يحدث في المرضى الذين لديهم فهم واضح للفوائد المحتملة ومخاطر وجود شريط المعدة ولديهم مسؤولية واقعية تجاه عادات الأكل والتمارين الرياضية. علاوة على ذلك، المتابعة المنتظمة ستضمن التعرف المبكر وربما منع المضاعفات الرئيسية.',
    en: 'The Gastric Band operation very safe but complications occur in a small number of patients and it is important that you fully understand the risks and discuss this matter with your surgeon before you decide to have this operation. There is no guarantee that the gastric band will work without fault for the rest of your life. However, extensive use of the gastric band since 1985 demonstrates that it works well and can be complication free with long term weight loss. This complication-free and successful weight loss is more likely to occur in patients who have a clear understanding of the potential benefits and risks of having a gastric band and have a realistic responsibility towards their eating habits and exercise. Furthermore regular follow up will ensure early recognition and possibly prevention of major complications.'
  },
  gastricBandingProblems: {
    ar: 'ما المشاكل التي يمكن أن تحدث بعد عملية شريط المعدة؟',
    en: 'What problems can occur after the gastric band operation?'
  },
  gastricBandingVomiting: {
    ar: 'القيء / الارتجاع',
    en: 'Vomiting / Regurgitation'
  },
  gastricBandingVomitingDesc: {
    ar: 'بعض المرضى لديهم مشكلة في التكيف مع عادات الأكل الجديدة، فهم يأكلون بسرعة كبيرة أو أكثر من اللازم ثم يرتجعون. القيء المتكرر يمكن أن يؤدي إلى انزلاق الشريط (انظر أدناه) ويجب على المرضى الاتصال بالعيادة إذا حدث قيء متكرر.',
    en: 'Some patients have trouble adjusting to their new eating habits, they repeatedly eat too quickly or too much and then regurgitate. Repeated vomiting can result in a band slipping (see below) and patients should contact the clinic if frequent vomiting occurs.'
  },
  gastricBandingPortInfection: {
    ar: 'عدوى المنفذ',
    en: 'Infection of the Port'
  },
  gastricBandingPortInfectionDesc: {
    ar: 'قد تتطور عدوى في منطقة المنفذ أو في البطن وفي بعض الحالات قد تشمل العدوى الشريط. في مثل هذه الحالة، قد تكون إعادة الجراحة ضرورية. من المهم جداً ألا تدع أي شخص بخلاف الجراح أو ممارس جراحة السمنة يحقن أو يزيل السائل من المنفذ حيث يمكن أن تحدث العدوى إذا لم يتم الالتزام بالتقنية العقيمة المناسبة.',
    en: 'An infection may develop in the port area or in the abdomen and in some instances the infection may involve the band. In such a case, re-operation may be necessary. It is very important that you do not let anyone apart from your surgeon or a bariatric practitioner inject or remove fluid from your port as infection can occur if the proper aseptic technique is not complied.'
  },
  gastricBandingWoundInfection: {
    ar: 'عدوى الجرح و/أو الشريط',
    en: 'Infection of the wound and/or band'
  },
  gastricBandingWoundInfectionDesc: {
    ar: 'هذا غير شائع (حوالي 1-2٪) وقد يحتاج إلى علاج عبر تصريف العدوى أو المضادات الحيوية أو إزالة الشريط والقثطار والمنفذ.',
    en: 'This is uncommon (approximately 1-2%) and may need treatment via drainage of the infection, antibiotics or removal of the band, catheter and port.'
  },
  gastricBandingLeakage: {
    ar: 'التسرب',
    en: 'Leakage'
  },
  gastricBandingLeakageDesc: {
    ar: 'قد يحدث تسرب من شريط المعدة أو من الأنبوب المتصل بين البالون والمنفذ. البالون المعدي مصنوع من مادة هشة وإذا تم حقن الكثير من السائل، قد يحدث تسرب. يمكن أن يحدث التسرب من الأنبوب المتصل إذا تم إدخال إبرة الحقن بشكل غير صحيح. يمكن أن يحدث التسرب من المنفذ إذا تم استخدام إبرة غير صحيحة للحقن أو إزالة السائل من المنفذ. ومن ثم من المهم أن يُسمح فقط لشخص ذي خبرة مثل الجراح أو ممارس جراحة السمنة بالتلاعب بكمية السائل في الشريط. في حالة التسرب، يمكن عادة استبدال شريط المعدة بواحد جديد، ولكن هذا سيتطلب إعادة جراحة.',
    en: 'Leakage from the gastric band or from the connecting tube between the balloon and the port may occur. The gastric balloon is made of fragile material and, if too much fluid is injected, leakage may occur. Leakage from the connecting tube can occur if the injecting needle is inserted incorrectly. Leakage from the port can occur if the incorrect needle is used for injecting or removing fluid from the port. Hence it is important that only an experienced person such as your surgeon or a bariatric practitioner be allowed to manipulate the amount of fluid in your band. In the event of leakage, the gastric band can normally be replaced with a new one, but this will require re-operation.'
  },
  gastricBandingSlippage: {
    ar: 'انزلاق الشريط وتضخم الكيس',
    en: 'Slippage of the band and pouch enlargement'
  },
  gastricBandingSlippageDesc: {
    ar: 'هذا مصدر قلق رئيسي على المدى الطويل يحدث في حوالي 3٪ من الناس. قد ينزلق الشريط وقد يصبح الكيس (الجزء من المعدة فوق الشريط) كبيراً جداً. يمكن أن تنشأ هذه المشكلة بعد أشهر أو سنوات من الإجراء. هذه مضاعفة نادرة حيث أنه في العملية، يتم وضع الشريط في نفق خاص وتتم إجراءات خاصة لتثبيت الشريط بشكل آمن. ومع ذلك، يمكن أن يحدث إذا لم يتم الالتزام بقواعد الأكل وتجاهل علامات الشبع. إذا حدث هذا، قد تكون إعادة الجراحة ضرورية.',
    en: 'This is a major long-term concern that occurs in approximately 3% of people. The band may slip and the pouch (the part of the stomach above the band) may become too large. This problem can arise months or years after the procedure. This is a rare complication as, at operation, the band is placed in a special tunnel and special measures to fix the band securely are performed. However, it can occur if the rules of eating and ignoring the signs of fullness are not adhered to. If this occurs, a re-operation may be necessary.'
  },
  gastricBandingErosion: {
    ar: 'تآكل الشريط',
    en: 'Band Erosion'
  },
  gastricBandingErosionDesc: {
    ar: 'هذه مضاعفة غير شائعة (حوالي 2٪) ولكنها رئيسية قد تحدث بعد أشهر أو سنوات من العملية. قد يتآكل الشريط من خارج المعدة إلى داخل المعدة. إنه أكثر شيوعاً في المرضى الذين يكون الشريط منتفخاً بشكل مفرط ولكنه قد يحدث أيضاً في الأشرطة التي لها حجم مقبول من السائل. إنه يؤكد مرة أخرى الحاجة إلى المتابعة المناسبة من قبل الفريق في عيادتنا. إذا حدثت هذه المضاعفة، يجب إزالة الشريط إما بالمنظار أو إعادة الجراحة.',
    en: 'This is an uncommon (approximately 2%) but major complication which may occur some months or years after the operation. The band may erode from the outside of the stomach into the stomach. It is more common in patients in whom the band is over inflated but may also occur in bands that have an acceptable volume of fluid. It again emphasizes the need for appropriate follow up by the team in our clinic. If this complication were to occur the band needs to be removed by either endoscopy or reoperation.'
  },
  gastricBandingReflux: {
    ar: 'الارتجاع',
    en: 'Reflux'
  },
  gastricBandingRefluxDesc: {
    ar: 'هذا العرض من حرقة المعدة بالإضافة إلى الارتجاع ينشأ عندما يكون الفتح أو المخرج من الكيس الصغير ضيقاً جداً مما يسبب انسكاب الطعام أو السائل المتناول لأعلى أو للخلف إلى المريء. يمكن منع هذا بعدم الأكل أو الشرب لمدة 2-3 ساعات قبل الاستلقاء أو الذهاب إلى الفراش. يمكن أيضاً تخفيف أعراض الارتجاع من خلال إزالة بعض السائل من شريط المعدة.',
    en: 'This symptom of heartburn plus regurgitation arises when the opening or outlet from the small pouch is too tight causing food or liquid ingested to spill up or back into the oesophagus. This can be prevented by not eating or drinking for 2-3 hours before lying down or going to bed. The reflux symptoms can also be alleviated by having some fluid removed from the gastric band.'
  },
  gastricBandingAcidErosion: {
    ar: 'تآكل الأسنان الحمضي',
    en: 'Acid Erosion of Teeth'
  },
  gastricBandingAcidErosionDesc: {
    ar: 'سطح السن مكون من معدن (الكالسيوم) وهو عرضة للهجوم الحمضي. إذا تغير السائل حول السن مثل تناول السكر المستمر أو تناول الأطعمة الحمضية أو تقنية التنظيف السيئة أو أحماض المعدة من الارتجاع/الارتجاع المعدي، سيتم إذابة الكالسيوم من السن. النتيجة النهائية هي تسوس الأسنان. يمكن منع هذا بسهولة من خلال ممارسة نظافة الأسنان الجيدة (مثل تنظيف الأسنان جيداً بعد حدوث الارتجاع أو الارتجاع وعلى الأقل ثلاث مرات في اليوم بعد الوجبات).',
    en: 'The tooth surface is composed of mineral (calcium)which is susceptible to acid attack. If the fluid around the tooth changes such as constant sugar ingestion, ingestion of acidic foods, poor cleaning technique or stomach acids from gastric reflux/regurgitation, calcium will be dissolved from the tooth. The end result is tooth decay. This can be prevented quite easily by good dental hygiene practice (eg simply brushing your teeth well after reflux or regurgitation occurs and at least three times a day after meals).'
  },
  gastricBandingGallstones: {
    ar: 'حصى المرارة',
    en: 'Gallstones'
  },
  gastricBandingGallstonesDesc: {
    ar: 'حصى المرارة تحدث غالباً في المرضى البدناء. قد يُطلب منك إجراء فحص بالموجات فوق الصوتية قبل العملية لتحديد ما إذا كان لديك أي حصوات. إذا كان هناك أي حصوات موجودة، فقد يوصي الجراح بإزالة المرارة. إذا لم تكن هناك حصوات موجودة، فقد لا تزال تتطور الحصوات نتيجة لفقدان الوزن بعد الجراحة. يمكن إزالة المرارة وحصى المرارة عبر الجراحة بالمنظار. يُنصح أن يكون فريقك في عيادتنا متورطاً في هذا العلاج حيث ستحتاج إلى تعديلات على الشريط أثناء مثل هذه الجراحة.',
    en: 'Gallstones often occur in obese patients. You may be asked to have an ultrasound before your operation to determine whether you have any stones. If there are any present, then your surgeon may recommend removal of your gallbladder. If no stones are present, you may still develop stones as a result of the weight loss after surgery. Removal of the gallbladder and gallstones can be done via keyhole surgery. It is recommended that your team at our clinic be involved in this treatment as adjustments will need to be made to the band during such surgery.'
  },
  gastricBandingHernia: {
    ar: 'الفتق في الشق',
    en: 'Hernia in the Incision'
  },
  gastricBandingHerniaDesc: {
    ar: 'أحياناً يمكن أن يتشكل فتق على طول خط الندبة. الفتق هو أساساً ضعف في جدار البطن يسمح للأعضاء البطنية بالفتق. يمكن تصحيح هذا بالجراحة.',
    en: 'Sometimes a hernia can form along the scar line. A hernia is basically a weakness in the abdominal wall allowing the abdominal organs to herniate. This can be corrected by surgery.'
  },
  gastricBandingFlabbySkin: {
    ar: 'الجلد المترهل',
    en: 'Flabby Skin'
  },
  gastricBandingFlabbySkinDesc: {
    ar: 'يمكن أن يحدث هذا خاصة إذا فقدت الكثير من الوزن أو تفقده بسرعة كبيرة. يحدث عادة على الذراعين والثديين والبطن والفخذين. التمارين الرياضية أثناء فقدان الوزن يمكن أن تقلل من كمية الجلد المترهل وتساعد في شد الجسم. حوالي 20٪ من المرضى يخضعون لجراحة لهذه الحالة. طيات الجلد المفرطة يمكن أن تصبح مشكلة، خاصة في الصيف. الطفح الجلدي وحالات الجلد الأخرى يمكن أن تكون مصدر قلق كبير خاصة تحت الثديين والبطن.',
    en: 'This can occur especially if you have lost a lot of weight or lose it very quickly. It usually occurs on the arms, breasts, abdomen and thighs. Exercise during weight loss can reduce the amount of flabby skin and help tone up your body. About 20% of patients have surgery for this condition. Excessive skin folds can become a problem, especially in summer. Rashes and other skin conditions can be of great concern especially under the breasts and abdomen.'
  },
  gastricBandingNutrientDeficiency: {
    ar: 'نقص المغذيات',
    en: 'Nutrient Deficiency'
  },
  gastricBandingNutrientDeficiencyDesc: {
    ar: 'بعض هذه المضاعفات المتأخرة يمكن أن تحدث لذا من المهم أن تكون على دراية بها. نقص الحديد وحمض الفوليك وB12 - هذه النواقص قد تحدث في العديد من المرضى بعد الجراحة لفقدان الوزن. عادة ما تكون نتيجة لنظام غذائي غير متوازن بسبب كمية الطعام الصغيرة المستهلكة. نوصي باتباع تعليمات النظام الغذائي من أخصائي التغذية لدينا وإذا لزم الأمر تناول مكمل فيتامينات متعدد. يجب فحص مستويات فيتامين B12 وحمض الفوليك والحديد سنوياً.',
    en: 'Some of these late complications can occur so it is important that you are aware of them. Iron, Folic Acid and B12 Deficiencies – These deficiencies may occur in many patients after surgery for weight reduction. They are usually a result of an imbalanced diet due to the small amount of food being consumed. We recommend that you follow the dietary instructions from our dietician and if necessary take a multivitamin supplement. Levels of vitamin B12, folate and iron should be checked annually.'
  },
  
  // BilioPancreatic Diversion Content
  bilioPancreaticDescription: {
    ar: 'تم تطوير تحويل البنكرياس الصفراوي (BPD) في السبعينيات من قبل نيكولا سكوبينارو من جنوة، إيطاليا [1]. تحويل البنكرياس الصفراوي مع تبديل الاثني عشر (BPD-DS)، المعروف ببساطة باسم "تبديل الاثني عشر (DS)" تم إنشاؤه في عام 1988 من قبل دوغلاس هيس، بولينج جرين، أوهايو، [2] وتم نشره لأول مرة من قبل بيكارد مارسو، كيبيك، كندا [3] في عام 1993.',
    en: 'The Biliopancreatic Diversion (BPD) was developed in the 1970s by Nicola Scopinaro from Genoa, Italy [1]. The biliopancreatic diversion with duodenal switch (BPD-DS), known simply as "Duodenal Switch (DS)" was created in 1988 by Douglas Hess, Bowling Green, Ohio, [2] and was first published by Picard Marceau, Québec, Canada [3] in 1993.'
  },
  bilioPancreaticComponents: {
    ar: 'دمج هيس أربعة مكونات رئيسية في DS:',
    en: 'Hess incorporated four main components into the DS:'
  },
  bilioPancreaticComponent1: {
    ar: 'استئصال المعدة العمودي مع استئصال الانحناء الأكبر لتقليل سعة حجم المعدة بشكل كبير لإنشاء تقييد تناول المغذيات (أساساً استئصال المعدة الطولي).',
    en: 'Vertical gastrectomy with excision of the greater curvature to significantly reduce gastric volume capacity to create nutrient intake restriction (essentially a sleeve gastrectomy).'
  },
  bilioPancreaticComponent2: {
    ar: 'تقسيم الاثني عشر بين الصمام البوابي والعضلة العاصرة لأودي. هذا يحافظ على الإفراغ البوابي الطبيعي ويتجنب متلازمة الإغراق التي تظهر مع الإجراءات التي تتجاوز الصمام البوابي.',
    en: 'Division of the duodenum between the pyloric valve and the sphincter of Oddi. This preserves the normal pyloric emptying and avoids the dumping syndrome seen with procedures that bypass the pyloric valve.'
  },
  bilioPancreaticComponent3: {
    ar: 'ربط (توصيل) اللفائفي (الأمعاء الدقيقة البعيدة) بالاثني عشر بحيث يمكن للمغذيات التحرك إلى أسفل الأمعاء الدقيقة.',
    en: 'Anastomosing (connecting) the ileum (distal small intestine) to the duodenum so that nutrients can move down the small intestine.'
  },
  bilioPancreaticComponent4: {
    ar: 'تجاوز الصائم (الأمعاء الدقيقة القريبة) مما يؤدي إلى سوء الامتصاص كما هو مطلوب لفقدان الوزن. مستمد من الخبرة مع BPD، لدى BPD-DS قناة مشتركة أطول لتقليل احتمالية نقص الفيتامينات والمعادن والبروتين.',
    en: 'Bypassing the jejunum (proximal small bowel) resulting in malabsorption as desired for weight loss. Deriving from experience with the BPD, the BPD-DS has a longer common channel to reduce the likelihood of vitamin, mineral, and protein deficiencies.'
  },
  bilioPancreaticHistory: {
    ar: 'أول BPD-DS بالمنظار تم إجراؤه من قبل ميشيل جاجنر في عام 1999. في الواقع، استئصال المعدة الطولي بالمنظار (LSG)، تم تصوره في البداية كأول إجراء من خطوتين لإنشاء DS. سيتم إجراء الاستئصال الطولي وبعد فترة من الوقت وفقدان الوزن، سيخضع المريض بعد ذلك للمرحلة الثانية من DS، وهي تجاوز الأمعاء الدقيقة. كان الهدف من تقسيم DS هو تقليل المراضة المحيطة بالجراحة لهذا الإجراء المعقد. لاحقاً، تم تكييف استئصال المعدة الطولي كإجراء مستقل. لهذا الغرض تم استخدام أنابيب أصغر لتحقيق المزيد من التقييد. اليوم LSG هو أكثر عمليات جراحة السمنة شعبية في العالم.',
    en: 'The first laparoscopic BPD-DS was performed by Michel Gagner in 1999. In fact, the Laparoscopic Sleeve Gastrectomy (LSG), was initially conceived as the first of a two-step procedure to create the DS. The sleeve would be performed and after some period of time and weight loss, the patient would then undergo the second stage of the DS, which was the small intestinal bypass. The goal of staging the DS was to reduce the perioperative morbidity of this complex procedure. Subsequently, the sleeve gastrectomy was adapted as an autonomous procedure. For this purpose smaller bougies were used to achieve more restriction. Today the LSG is the most popular bariatric operation worldwide.'
  },
  bilioPancreaticProcedure: {
    ar: 'DS - الإجراء:',
    en: 'DS- The Procedure:'
  },
  bilioPancreaticProcedureStep1: {
    ar: 'الخطوة الأولى من الإجراء هي إجراء استئصال المعدة الطولي. على عكس LSG، حجم الأنبوب لـ DS أكبر. لا يجب أن يكون أصغر من 60 فرنسي، (إذا سيتم إجراء DS كإجراء من خطوة واحدة). إذا تم التخطيط لخطوتين، حجم الأنبوب أكثر تشابهاً مع LSG. الفتق الحجابي، إذا تم تحديده، يتم إغلاقه بشكل انتقائي من قبل معظم الجراحين. يبدأ التدبيس في القسم البعيد من الغار مع الحفاظ على الغار. ثم يتم تشريح الاثني عشر من الخلف، وفصله بوضوح عن الرباط الاثني عشر-الكبدي. بعد التعبئة، يتم تقسيم الاثني عشر مع دباسة القطع الخطية وخرطوشة 60 مم 1.5 إلى 2 سم بعيداً عن البواب. يمكن أن يكون تعزيز خط التدبيس مفيداً.',
    en: 'The first step of the procedure is to do the sleeve gastrectomy. Unlike the LSG, the bougie size for the DS is larger. It should not be smaller than 60 French, (if the DS will be performed as a one step-procedure). If 2 steps are planned, bougie size is more similar to the LSG. Hiatal hernias, if identified, are closed selectively by most surgeons. The stapling begins at the distal antrum with preservation of the antrum. The duodenum is then dissected posteriorly, clearly separating it from the duodeno-hepatic ligament. After mobilization, the duodenum is divided with the linear cutting stapler and a 60 mm cartridge 1.5 to 2 cm distal to the pylorus. Staple-line reinforcement can be useful.'
  },
  bilioPancreaticProcedureStep2: {
    ar: 'يبدأ تجاوز الأمعاء من البعيد عند الصمام اللفائفي-الأعمى. يتم إنشاء القناة المشتركة لتكون فقط 75 سم إلى 100 سم من الصمام اللفائفي-الأعمى. يتم تقسيم الطرف الغذائي عند 250 سم من الصمام اللفائفي-الأعمى وتوصيله بالاثني عشر ما بعد البوابي. قد يتم إجراء هذا الاثني عشر-اللفائفي بتقنيات مختلفة (تدبيس دائري، تدبيس خطي أو خياطة يدوية كاملة). تعتبر الخياطة اليدوية من طرف إلى جانب المفضلة من قبل العديد من الجراحين وهي التقنية الأكثر تطبيقاً شيوعاً (5). يتم إنشاء المفاغرة المعوية-المعوية 75 - 100 سم قريب من الصمام اللفائفي-الأعمى، بشكل مشابه للمفاغرات المعوية الأخرى. يجب إغلاق المسافات المساريقية ومساحة بيترسن بخيوط غير قابلة للامتصاص لتجنب الفتق الداخلي. الصرف ليس بالضرورة روتينياً، واختبار التسريبات (أزرق الميثيلين، هواء مع تنظير المعدة) كلاهما متروك للجراح.',
    en: 'The intestinal bypass starts distally at the ileo-cecal valve. The common channel is created to be only 75 cm to 100 cm from the ileo-cecal valve. The alimentary limb is divided at 250 cm from the ileo-cecal valve and connected to the post-pyloric duodenum. This duodeno-ileostomy may be performed with different techniques (circular stapled, linear stapled or totally hand-sewn). The hand sewn end-to-side anastomosis is considered by many surgeons to be preferable and is the most common applied technique (5). The entero-entero-anastomosis 75 – 100 cm proximal to the ileo-cecal valve, is created similarly to other intestinal anastomoses. The mesenteric spaces and the Petersen space should be closed with non-absorbable sutures to avoid internal herniation. Drainage is not necessarily routine, and testing for leaks (methylene blue, air with gastroscopy) are both left up to the surgeon.'
  },
  bilioPancreaticOutcomes: {
    ar: 'النتائج',
    en: 'Outcomes'
  },
  bilioPancreaticOutcomesDesc: {
    ar: 'كل من فقدان الوزن قصير المدى وطويل المدى بعد DS يتجاوز أي عملية أخرى. الفوائد للمرضى الذين يعانون من متلازمة التمثيل الغذائي موثقة جيداً وكذلك الحل المتناسب للأمراض المصاحبة. بشكل عام، أداء DS متفوق على إجراء مجازة المعدة روكس-واي (RYGB). ومع ذلك، يحتاج مرضى DS إلى مكملات فيتامينات صارمة وقوية بما في ذلك الفيتامينات القابلة للذوبان في الدهون والكالسيوم والمعادن.',
    en: 'Both short-term and long-term weight loss following DS exceed that of any other operation. The benefits for patients with the metabolic syndrome are well documented as well as the proportionate resolution of co-morbidities. Generally speaking, the performance of the DS is superior to the Roux-Y-gastric-bypass procedure (RYGB). However, DS patients need strict and strong vitamin supplementation including the fat-soluble vitamins, calcium and minerals.'
  },
  bilioPancreaticTrends: {
    ar: 'على الرغم من النتائج العظيمة، عدد حالات DS سنوياً، يستمر في الانخفاض، مدفوعاً بتفضيل المريض لإجراءات جراحة السمنة الأخرى. حالياً استئصال المعدة الطولي وRYGBP هما أكثر إجراءات جراحة السمنة استخداماً في الولايات المتحدة الأمريكية وكذلك في جميع أنحاء العالم.',
    en: 'Despite the great results, the number of DS cases yearly, continues to decrease, driven by patient preference for other bariatric procedures. Currently Sleeve gastrectomy and RYGBP are the most widely used bariatric procedures in the U.S.A as well as worldwide.'
  },
  bilioPancreaticModifications: {
    ar: 'تم تعديل DS مؤخراً. إجراء SADI (مفاغرة الاثني عشر-اللفائفي المفردة) هو نوع مختلف من إعادة بناء التجاوز عن DS التقليدي. علاوة على ذلك، تحويل الاستئصال الطولي إلى مجازة المعدة بحلقة أوميغا هو خيار للمرضى الذين فشل لديهم LSG. هناك حاجة لمزيد من النتائج مع هذه المتغيرات قبل أن يمكن اعتبارها إجراءات سائدة.',
    en: 'Recently the DS was modified. The SADI procedure (Single anastomotic duodeno ileostomy) is a different type of bypass reconstruction than the traditional DS. Furthermore, transformation of the sleeve to an omega-loop gastric bypass is an option for patients with failed LSG. Further results with these variants are needed before they can be considered to be mainstream procedures.'
  },
  bilioPancreaticReferences: {
    ar: 'المراجع',
    en: 'References'
  },
  bilioPancreaticRef1: {
    ar: '[1] سكوبينارو ن، جيانيتا إي، سيفاليري د وآخرون. تجاوز البنكرياس الصفراوي للسمنة: التجربة الأولية في الإنسان. بر ج سورج 1979؛ 66: 618-20.',
    en: '[1] Scopinaro N, Gianetta E, Civalleri D et al. Biliopancreatic bypass for obesity: initial experience in man. Br J Surg 1979; 66: 618-20.'
  },
  bilioPancreaticRef2: {
    ar: '[2] هيس دي إس، هيس دي دبليو. تحويل البنكرياس الصفراوي مع تبديل الاثني عشر. أوبس سورج 1998؛ 8: 267-82.',
    en: '[2] Hess DS, Hess DW. Biliopancreatic diversion with a duodenal switch. Obes Surg 1998; 8: 267-82.'
  },
  bilioPancreaticRef3: {
    ar: '[3] مارسو ب، بيرون إس، بورك آر إيه وآخرون. تحويل البنكرياس الصفراوي مع نوع جديد من استئصال المعدة. أوبس سورج 1993؛ 3: 29-36.',
    en: '[3] Marceau P, Biron S, Bourque RA et al. Biliopancreatic diversion with a new type of gastrectomy. Obes Surg 1993; 3: 29-36.'
  },
  bilioPancreaticRef4: {
    ar: '[4] تشو سي، جاجنر إم، كوين تي، فولينجر دي سي، فينج جي جي، إينابنت دبليو بي، هيرون دي، بومب إيه: BPD/DS بالمنظار من خطوتين. نهج بديل للسمنة الفائقة-الفائقة. الجراحة التنظيرية 2002؛ S187.',
    en: '[4] Chu C, Gagner M, Quinn T, Voellinger DC, Feng JJ, Inabnet WB, Herron D, Pomp A: Two-stage laparoscopic BPD/DS. An Alternative Approach To Super-Super Morbid Obesity. Surgical Endoscopy 2002; S187.'
  },
  bilioPancreaticRef5: {
    ar: '[5] وينر، آر إيه، بومهوف إي، شرام إم، وينر إس، بلانكو-إنجرت آر: تحويل البنكرياس الصفراوي بالمنظار مع تبديل الاثني عشر: ثلاث تقنيات مختلفة للمفاغرة الاثني عشر-اللفائفي والتجربة الأولية. أوبس سورج. 2004 مارس؛ 14(3):334-40',
    en: '[5] Weiner, R.A., Pomhoff I, Schramm M, Weiner S, Blanco-Engert R.: Laparoscopic biliopancreatic diversion with duodenal switch: three different duodeno-ileal anastomotic techniques and initial experience. Obes Surg. 2004 Mar;14(3):334-40'
  },

  // One Anastomosis Gastric Bypass Content
  oneAnastomosisDescription: {
    ar: 'مجازة المعدة بمفاغرة واحدة (مجازة المعدة بحلقة أوميغا/مجازة المعدة المصغرة/مجازة المفاغرة الواحدة) اكتسبت مؤيدين في جميع أنحاء العالم، وخاصة في السنوات الماضية في أوروبا وآسيا. أثبتت عدة دراسات أنها عملية جراحة سمنة سريعة وآمنة وفعالة.',
    en: 'The Single Anastomosis Gastric Bypass (Omega Loop Gastric Bypass/Mini-gastric Bypass/Single-Anastomosis Bypass) has gained proponents throughout the world, particularly increasing in the past years in Europe and Asia. Several Studies have demonstrated that it is a rapid, safe and effective bariatric operation.'
  },
  oneAnastomosisComponents: {
    ar: 'تتكون العملية من مكونين: أولاً، كيس معدي طويل وضيق مقيد من الانحناء الأصغر؛ ثانياً، تجاوز صائمي 200 سم مع مفاغرة معدي-صائمي واحدة أمامية للقولون (GJ)، مما يؤدي إلى سوء امتصاص كبير (للدهون).',
    en: 'The operation consists of two components: First, a long and narrow – restrictive lesser-curvature gastric pouch; Second, a 200 cm jejunal bypass with a single antecolic gastro-jejunostomy (GJ) anastomosis, which leads to significant (fat-)malabsorption.'
  },
  oneAnastomosisOperation: {
    ar: 'العملية:',
    en: 'Operation:'
  },
  oneAnastomosisGastricPouch: {
    ar: 'إنشاء الكيس المعدي',
    en: 'Creation of the Gastric Pouch'
  },
  oneAnastomosisGastricPouchDesc: {
    ar: 'يتم تحديد الانحناء الأصغر للمعدة عند المستوى أو فقط بعيداً عن قدم الغراب. هنا، يتم الدخول إلى الكيس الأصغر والمعدة مقسمة بالدباسة (غير مقطوعة بالكامل) بزاوية قائمة للانحناء الأصغر. يتم تمرير أنبوب 36 فرنسي تقريباً من قبل طبيب التخدير، والمعدة مقسمة أكثر بالدباسة لأعلى موازية للانحناء الأصغر، مما يخلق كيس معدي ضيق وطولي. القاع ليس جزءاً من الكيس بشكل صريح. الكيس طويل وضيق الشكل أقل عرضة للتمدد لأنه لا يوجد تضييق للمخرج بواسطة فم أو بواب.',
    en: 'The lesser curvature of the stomach is identified at the level or just distal to the craw\'s foot. Here, the lesser sac is entered and the stomach stapler-divided (not completely transsected) at a right angle to the lesser curve. An app. 36 Fr bougie is passed down by the anaesthetist, and the stomach is further stapler-divided upwards parallel to the lesser curvature, so creating a narrow, longitudinal gastric pouch. The fundus is explicitely not part of the pouch. The long and narrow shaped pouch is less prone to dilation because there is no outlet narrowing by a stoma or pylorus.'
  },
  oneAnastomosisJejunalBypass: {
    ar: 'إنشاء تجاوز الصائم الماص 200 سم',
    en: 'Creation of the 200-cm Malabsorptive Jejunal Bypass'
  },
  oneAnastomosisJejunalBypassDesc: {
    ar: 'يتم سحب الثرب من اليسار إلى اليمين لتمكين التعريف الدقيق لمفصل الاثني عشر-الصائم (رباط تريتز). يتم تشغيل الأمعاء الدقيقة إلى 200 سم بعيداً عن رباط تريتز ثم مفاغرتها أمامية للقولون من طرف إلى جانب للكيس المعدي.',
    en: 'The omentum is retracted from left to right to enable exact identification of the Duodeno-Jejunal junction (ligament of Treitz). The small bowel is run to 200 cm distal to Treitz\' ligament and then anastomosed antecolic end-to-side to the gastric pouch.'
  },
  oneAnastomosisVariations: {
    ar: 'بعض الجراحين يختلفون في طول الأمعاء الدقيقة المتجاوزة حسب مؤشر كتلة الجسم، مع أجزاء أمعاء دقيقة متجاوزة أطول في المرضى المصابين بالسمنة الفائقة. يجب الحرص على وجود ما لا يقل عن 300 سم من الأمعاء الدقيقة في تيار الطعام لتجنب زيادة خطر الآثار الجانبية بسبب سوء الامتصاص.',
    en: 'Some surgeons vary the length of the bypassed small bowel according to the BMI, with longer bypassed small bowel segments in superobese patients. Care must be taken to have at least 300cm of small bowel in the food stream to avoid an increased risk of side effects due to malabsorption.'
  },
  oneAnastomosisBileReflux: {
    ar: 'لتقليل الارتجاع الصفراوي المحتمل، يقوم بعض الجراحين بخياطة إضافية بين الطرف البنكرياسي الصفراوي الوارد والكيس المعدي. الارتجاع الصفراوي ذو الأهمية السريرية مذكور في الأدبيات في النطاق المئوي المنخفض من رقم واحد ويمكن تصحيحه بسهولة بالتحويل إلى مجازة المعدة روكس إن واي أو مفاغرة معوي-معوي. حتى اليوم لا يوجد دليل على أن مجازة المعدة بمفاغرة واحدة تعزز تطور سرطان المعدة أو المريء، على الرغم من أن هذا السؤال (بسبب نقص البيانات طويلة المدى) لا يمكن الإجابة عليه بشكل نهائي.',
    en: 'To minimize possible bile reflux, some surgeons perform additional sutures between the afferent biliopancreatic limb and the gastric pouch. Clinically relevant bile reflux is reported in the literature in the low one-digit percentage range and can be easily corrected by conversion to a Roux en Y gastric bypass or an entero-enterostomy. Until today there is no evidence that the Single Anastomosis Gastric Bypass promotes the development of gastric- or esophageal cancer, although this question (due to the lack of long-term data) cannot be answered definitely.'
  },
  oneAnastomosisWeightLoss: {
    ar: 'فقدان الوزن المتوقع قابل للمقارنة على الأقل مع مجازة المعدة روكس إن واي - أو حتى أفضل (نطاق 30-40٪ فقدان وزن الجسم). نفس الشيء صحيح لحل الأمراض المصاحبة، خاصة السكري.',
    en: 'The expected weight loss is at least comparable to the Roux en Y Gastric Bypass – or even better (range 30-40% Body Weight Loss). The same is true for the resolution of comorbidities, especially Diabetes.'
  },
  oneAnastomosisSupplementation: {
    ar: 'المرضى بعد مجازة المعدة بمفاغرة واحدة يحتاجون مكملات (مغذيات دقيقة) قابلة للمقارنة مع تلك بعد RYGB، بالإضافة إلى ذلك هناك خطر أعلى لنقص الحديد ونقص الفيتامينات القابلة للذوبان في الدهون.',
    en: 'Patients after Single Anastomosis Gastric Bypass need (micronutrient) supplementation comparable to that after RYGB, additionally there is a higher risk for iron deficiency and deficiency for fat soluble vitamins.'
  },
  oneAnastomosisFatMalabsorption: {
    ar: 'سوء امتصاص الدهون قد يحد من جودة الحياة في قليل من المرضى خاصة بعد نظام غذائي عالي الدهون بسبب الانتفاخ والإسهال الدهني.',
    en: 'Fat malabsorption may limit the quality of life in few patients especially after a high-fat diet due to bloating and steatorrhea.'
  },
  oneAnastomosisTrends: {
    ar: 'عدد مجازات المعدة بمفاغرة واحدة التي يتم إجراؤها في جميع أنحاء العالم يتزايد باطراد: أثبت هذا الإجراء أنه تقنياً بسيط وآمن وفعال، مما يؤدي إلى فقدان وزن دائم، وسهل المراجعة بنقل المفاغرة، وإذا لزم الأمر، قابل للعكس.',
    en: 'The number of Single Anastomosis Gastric Bypasses performed worldwide is increasing steadily: This procedure has proven to be technically simple, safe and effective, resulting in permanent weight loss, being easily revisable by moving the anastomosis, and if ever necessary, reversible.'
  },
  oneAnastomosisReferences: {
    ar: 'المراجع',
    en: 'References'
  },
  oneAnastomosisRef1: {
    ar: 'جورجياو، د.، وآخرون، فعالية وسلامة مجازة المعدة المصغرة بالمنظار. مراجعة منهجية. سورج أوبس ريلات ديس، 2014. 10(5): ص. 984-991.',
    en: 'Georgiadou, D., et al., Efficacy and safety of laparoscopic mini gastric bypass. A systematic review. Surg Obes Relat Dis, 2014. 10(5): p. 984-991.'
  },
  oneAnastomosisRef2: {
    ar: 'لي، دبليو جي، وآخرون، مجازة المعدة المصغرة بالمنظار: تجربة مع طرف التجاوز المخصص حسب وزن الجسم. أوبس سورج، 2008. 18(3): ص. 294-9.',
    en: 'Lee, W.J., et al., Laparoscopic mini-gastric bypass: experience with tailored bypass limb according to body weight. Obes Surg, 2008. 18(3): p. 294-9.'
  },
  oneAnastomosisRef3: {
    ar: 'غارسيا-كاباليرو، إم. وإم. كارباخو، مجازة المعدة بمفاغرة واحدة: إجراء جراحي بسيط وآمن وفعال لعلاج السمنة المرضية. نوتر هوسب، 2004. 19(6): ص. 372-5.',
    en: 'Garcia-Caballero, M. and M. Carbajo, One anastomosis gastric bypass: a simple, safe and efficient surgical procedure for treating morbid obesity. Nutr Hosp, 2004. 19(6): p. 372-5.'
  },
  oneAnastomosisRef4: {
    ar: 'لي، دبليو جي، وآخرون، مجازة المعدة روكس إن واي بالمنظار مقابل مجازة المعدة المصغرة لعلاج السمنة المرضية: تجربة 10 سنوات. أوبس سورج، 2012. 22(12): ص. 1827-34.',
    en: 'Lee, W.J., et al., Laparoscopic Roux-en-Y Vs. mini-gastric bypass for the treatment of morbid obesity: a 10-year experience. Obes Surg, 2012. 22(12): p. 1827-34.'
  },
  // Roux-en-Y Gastric Bypass Content
  rouxEnYDescription: {
    ar: 'مجازة المعدة روكس إن واي (RYGB)، المعروفة ببساطة باسم "مجازة المعدة"، هي واحدة من أكثر إجراءات جراحة السمنة شعبية في جميع أنحاء العالم وطالما اعتبرت "المعيار الذهبي" لجراحة السمنة. تم الإبلاغ عن مجازة المعدة لأول مرة في عام 1967 وتم إجراؤها كجراحة مفتوحة لعدة عقود. ومع ذلك، اليوم، يتم إجراؤها بالكامل تقريباً عبر النهج التنظيري (الثقب المفتاحي).',
    en: 'Roux-en-Y gastric bypass (RYGB), commonly called simply "gastric bypass", is one of the most popularly performed bariatric procedures worldwide and has long been considered the "gold standard" of bariatric surgery. The gastric bypass was first reported in 1967 and was performed as open surgery for several decades. However, today, it is almost entirely performed by the laparoscopic (keyhole) approach.'
  },
  rouxEnYProcedure: {
    ar: 'الإجراء الجراحي (الشكل 1) يتضمن تقسيم المعدة بالدباسة إلى غرفتين. الغرفة العلوية تستقبل الطعام وهي صغيرة جداً وتحمل حوالي 30 سم مكعب. الغرفة السفلية "متجاوزة" ولا تستقبل الطعام. الأمعاء الدقيقة مقسمة وطرف واحد متصل ("مفاغر") بالكيس. يتم إجراء اتصال ثاني ("مفاغرة") لتوصيل المعدة والاثني عشر المفصولين بالأمعاء الدقيقة. هذا الاتصال يتيح للعصارات الهضمية الالتقاء بالطعام المتناول لتمكين تحلل وامتصاص المغذيات. المسافة بين الاتصالين يمكن أن تختلف حسب تفضيل الجراح ولكنها عموماً 50 إلى 150 سم.',
    en: 'The operative procedure (figure 1) involves staple dividing the stomach into two chambers. The upper chamber receives food and is very small holding about 30 cc. The lower chamber is "bypassed" and does not receive food. The small intestine is divided and one end is connected ("anastomosed") to the pouch. A second connection ("anastomosis") is made to connect the disconnected stomach and duodenum to the small bowel. This connection enables the digestive fluids to meet the ingested food to enable nutrient breakdown and absorption. The distance between the two connections can vary by surgeon preference but is generally 50 to 150 cm.'
  },
  rouxEnYFoodFlow: {
    ar: 'بعد اكتمال الإجراء، يتقدم الطعام مباشرة من الكيس المعدي الصغير إلى الأمعاء الدقيقة دون المرور عبر الجزء السفلي من المعدة والاثني عشر والأمعاء الدقيقة العلوية (الصائم) (الشكل).',
    en: 'After the procedure is completed, food advances directly from the small gastric pouch to the small intestine without passing through the lower portion of the stomach, duodenum and upper small bowel (jejunum) (Figure).'
  },
  rouxEnYMechanism: {
    ar: 'يعتقد أن هذه المجازة المعدية تساعد الأشخاص البدناء على فقدان الوزن بعدة طرق مختلفة. الكيس الصغير يقيد كمية الطعام التي يمكن تناولها. الاتصال بين الأمعاء الدقيقة والكيس المعدي يعيد توجيه مرور الطعام مباشرة إلى الأمعاء الدقيقة. بما أن الطعام لا يمر عبر الجزء المتجاوز من المعدة والاثني عشر، هناك تغييرات استقلابية وهرمونية تؤدي إلى تقليل الشهية وزيادة الشعور بالشبع.',
    en: 'This gastric bypass is thought to help obese people lose weight in several different ways. The small pouch restricts the amount of food that can be eaten. The connection between the small bowel and the gastric pouch re-routes the transit of food directly in to the small bowel. Since the food does not go through the bypassed portion of the stomach and duodenum there are metabolic and hormonal changes that lead to reduced appetite and an increased feeling of fullness.'
  },
  rouxEnYWeightLoss: {
    ar: 'بعد جراحة المجازة، يمكن للمرضى توقع فقدان حوالي ثلث وزن الجسم الإجمالي. الحد الأقصى للتأثير على فقدان الوزن يُلاحظ عادة خلال أول سنتين. هناك عادة بعض استعادة الوزن ولكن معظم الدراسات تشير إلى أن معظم المرضى سيحافظون على فقدان وزن حوالي 25٪ بعد 10 سنوات.',
    en: 'Following bypass surgery patients can expect to lose around one third of their total body weight. The maximum effect on weight loss is normally observed during the first two years. There is typically some weight regain but most studies suggest that most patients will maintain a weight loss of around 25% beyond 10 years.'
  },
  rouxEnYComorbidities: {
    ar: 'بالإضافة إلى فقدان الوزن، ستتحسن عادة عدة أمراض مرتبطة بالسمنة بعد الجراحة. تشمل هذه السكري من النوع 2، ارتفاع ضغط الدم، خلل الدهون، متلازمة التمثيل الغذائي، مرض الكبد الدهني، وانقطاع النفس الانسدادي أثناء النوم. في الواقع، أكثر من 50٪ من المرضى المصابين بالسكري من النوع 2 سيعانون من تطبيع مستويات السكر في الدم وسيكونون إما خارج جميع أدوية السكري أو يحتاجون أدوية أقل بكثير.',
    en: 'In addition to weight loss, several obesity related diseases will typically improve after surgery. These include type 2 diabetes, hypertension, dyslipidemia, metabolic syndrome, fatty liver disease, and obstructed sleep apnea. In fact, more than 50% of patients with type 2 diabetes will experience normalization of their blood sugar levels and will either be off all of their antidiabetic medications or require markedly less medications.'
  },
  rouxEnYSafety: {
    ar: 'في المراكز التي تقوم بعدد كبير من إجراءات جراحة السمنة كل عام، خطر المضاعفات بعد الجراحة منخفض. خطر الوفاة من الجراحة أقل من 0.2٪ وخطر المضاعفات الشديدة مثل النزيف والعدوى والجلطات أقل من 5٪. جراحة مجازة المعدة آمنة حالياً مثل جراحة المرارة.',
    en: 'At centres that do a large number of bariatric procedures each year, the risk of postoperative complications is low. The risk of dying from the surgery is less than 0.2% and the risk of severe complications such as bleeding, infections and thromboembolism is less than 5%. Gastric bypass surgery is currently as safe as gallbladder surgery.'
  },
  rouxEnYDeficiencies: {
    ar: 'ومع ذلك، يمكن أن تؤدي عملية مجازة المعدة إلى نقص كبير في الفيتامينات والمعادن بما في ذلك الحديد وفيتامين B12 وفيتامين B1 والكالسيوم والزنك وفيتامين D وحمض الفوليك. لذلك، كما هو الحال مع جميع إجراءات جراحة السمنة، المرضى الذين يخضعون لمجازة المعدة يحتاجون مراقبة مدى الحياة ومكملات الفيتامينات والمعادن.',
    en: 'However, the gastric bypass procedure can result in significant vitamin and mineral deficiencies including Iron, vitamin B12, vitamin B1, calcium, zinc, vitamin D and folate. Therefore, as with all bariatric procedures, the patients who undergo gastric bypass require life-long surveillance and vitamin and mineral supplementation.'
  },
  // Sleeve Gastrectomy Content
  sleeveGastrectomyDescription: {
    ar: 'استئصال المعدة الطولي بالمنظار (LSG)، تم تصوره لأول مرة كخطوة أولى من إجراء من خطوتين تضمن تبديل الاثني عشر في عام 2000 (ولاحقاً مجازة المعدة روكس إن واي)، وتم تعميمه من قبل د. إم. جاجنر. (1) لاحقاً، مع استخدام أنابيب أصغر، تم اعتماد العملية كإجراء أساسي. مع مرور الوقت أصبح LSG أكثر عمليات جراحة السمنة شعبية في العالم. أثبتت معظم الدراسات أن LSG فعال لفقدان الوزن ويؤدي إلى تحسن وحتى حل الأمراض المصاحبة مثل السكري من النوع 2، مشابه جداً لمجازة المعدة روكس إن واي، ولكن مع مراضة ووفيات أقل. (2,3)',
    en: 'Laparoscopic Sleeve Gastrectomy (LSG), was first conceived as a first step of a two staged procedure that included a duodenal switch in 2000 (and later Roux-en-Y gastric bypass), and popularized by Dr. M. Gagner. (1) Subsequently, with the use of smaller bougies, the operation was adopted as a primary procedure. Over time the LSG has become the most popular bariatric operation world wide. Most studies have demonstrated that the LSG is effective for weight loss and results in improvement and even resolution of co-morbidities like type 2 diabetes, quite similar to Roux-en-Y gastric bypass, but with less morbidity, and mortality. (2,3)'
  },
  sleeveGastrectomyProcedure: {
    ar: 'الإجراء:',
    en: 'Procedure:'
  },
  sleeveGastrectomyProcedureDesc: {
    ar: 'تبدأ العملية باستخدام أجهزة الطاقة لإزالة الانحناء الأكبر للمعدة من الغار إلى زاوية هيس. هذا يتضمن تقسيم فروع مختلفة من الأوعية المعدية-الثربية، قريبة من جدار المعدة للانحناء الأكبر. معظم المشغلين سيقومون بتعبئة القاع بالكامل من الخلف، إذابة الالتصاقات في الكيس الأصغر وأمام البنكرياس (أكثر خلف الغار). يتم أيضاً كشف الرجل الأيسر للتحقق من وجود فتق حجابي. معظم الجراحين سيغلقون الفتق الحجابي بشكل انتقائي عند تحديده. بعض الجراحين سيقومون أيضاً بتعبئة الوسادة الدهنية قرب مفصل المعدة-المريء لتحديد هذه المنطقة بشكل أفضل والتدبيس وفقاً لذلك. يتم إدخال أنبوب عبر الفم (32-40 فرنسي) ووضعه ملاصق للانحناء الأصغر. يبدأ التدبيس 1-6 سم قريب من البواب ويستهدف جانبي الأنبوب. يتم تجنب التضيقات في الشق الزاوي بتجنب التدبيس قريب جداً (أو ضيق) من الأنبوب. يجب أيضاً تجنب تدبيس المريء قرب مفصل المعدة-المريء، حيث تحدث معظم التسريبات بعيداً أو قرب مفصل المعدة-المريء. اختيار ارتفاع التدبيس المناسب يعتمد على سمك نسيج المعدة ويختلف حسب الجنس ومؤشر كتلة الجسم وموقع المعدة. سمك الجدار يميل إلى الانخفاض من البعيد إلى القريب. وقت الضغط المناسب ضروري، خاصة في النسيج السميك. معظم الجراحين سيعززون خط التدبيس لتقليل النزيف والتسريبات. خيارات التعزيز تشمل الخياطة أو الدعم. الصرف واختبار التسريبات متروك لتقدير الجراح.',
    en: 'The operation is commenced by using energy devices to take down the greater curvature of the stomach from the antrum to the Angle of His. This includes dividing various branches of the gastroepiploic vessels, close to the gastric wall of the greater curvature. Most operators will fully mobilized the fundus posteriorly, lysing the adhesions in the lesser sac and anterior to the pancreas (more so behind the antrum). The left crus is also exposed to investigate the presence of a hiatal hernia. Most surgeons will selectively close hiatal hernias when identified. Some surgeons will also mobilize the fat pad near the gastro-esophageal junction to better identify this area and staple accordingly. A bougie is introduced trans orally (32-40Fr) and positioned abutting the lesser curvature. The stapling begins 1-6 cm proximal to the pylorus and aiming lateral to the bougie. Strictures are avoided at the incisura angularis by avoiding stapling too close (or tight) to the bougie. One also has to avoid stapling the esophagus near the GE junction, as most leaks occur distal or near the GE junction. Choosing the appropriate staple height depends on gastric tissue thickness and varies according to the sex, BMI and stomach site. Wall thickness tends to decrease from distal to proximal. Appropriate compression time is necessary, especially in thick tissue. Most surgeons will reinforce the staple line in order to decrease bleeding and leaks. Reinforcement options include suturing or buttressing. Drainage and leak testing is left to the discretion of the surgeon.'
  },
  sleeveGastrectomyOutcomes: {
    ar: 'النتائج',
    en: 'Outcomes'
  },
  sleeveGastrectomyOutcomesDesc: {
    ar: 'مثل مجازة المعدة روكس إن واي، يتم تحقيق معظم فقدان الوزن في أول سنتين (>70٪ فقدان الوزن الزائد لمؤشر كتلة الجسم أقل من 50). يمكن رؤية استعادة الوزن وتوسع الكيس المعدي بعد ذلك. في 5 سنوات، هناك فقدان وزن مستدام في نطاق 50-60٪ من الوزن الزائد.',
    en: 'Like the Roux-en-Y gastric bypass, most of the weight loss is achieved in the first 2 years (>70% excess weight loss for BMI less than 50). Weight regain and gastric pouch dilatation can be seen thereafter. At 5 years, there is a sustained weight loss in the range of 50-60% of excess weight.'
  },
  sleeveGastrectomySuperObese: {
    ar: 'للمرضى المصابين بالسمنة الفائقة، النهج من خطوتين (LSG أولاً متبوعاً بالإكمال إلى تبديل الاثني عشر أو مجازة المعدة) قلل الوفيات والمراضة من الإجراءات المنجزة في مرحلة واحدة. أكثر مضاعفة مخيفة من LSG هي التسريبات المعدية (1-2٪)، تحدث عادة بعد عدة أيام من الجراحة ومعظمها موجود قرب مفصل المعدة-المريء. معظم التسريبات تُعالج الآن بالدعامات المغطاة بالكامل من النيتينول الموضوعة بالمنظار، تُترك في مكانها لعدة أسابيع، وتصريف الخراج. ارتجاع المريء يتحسن في 80٪ من المرضى، ولكن في البعض قد يبقى أو يزداد سوءاً ويتطلب علاج طبي طويل أو التحويل إلى مجازة المعدة روكس إن واي. (4) فشل فقدان الوزن يمكن علاجه بمجموعة متنوعة من الخيارات الجراحية تشمل إعادة استئصال المعدة الطولي، التحويل إلى مجازة المعدة روكس إن واي أو تبديل الاثني عشر. (5,6). اختيار المريض المناسب مهم.',
    en: 'For super-obese patients, a two-stage approach (LSG first followed by completion to a duodenal switch or gastric bypass) has decreased mortality and morbidity from procedures done in one stage. The most feared complication of the LSG is gastric leaks (1-2%), typically occurring several days after surgery and mostly located near the GE junction. Most leaks are now treated with endoscopically placed fully covered nitinol stents, left in place for several weeks, and abscess drainage. GERD reflux is improved in 80% of patients, but in some it may remain or worsen and require prolonged medical therapy or conversion to Roux-en-Y gastric bypass. (4) Weight loss failures can be treated with a variety of surgical options including re-sleeve gastrectomy, conversion to Roux-en-Y gastric bypass or duodenal switch. (5,6). Appropriate patient selection is important.'
  },
  sleeveGastrectomyReferences: {
    ar: 'المراجع',
    en: 'References'
  },
  sleeveGastrectomyRef1: {
    ar: 'تشو سي، جاجنر إم، كوين تي، فولينجر دي سي، فينج جي جي، إينابنت دبليو بي، هيرون دي، بومب إيه: BPD/DS بالمنظار من خطوتين. نهج بديل للسمنة الفائقة-الفائقة. الجراحة التنظيرية 2002؛ S187.',
    en: 'Chu C, Gagner M, Quinn T, Voellinger DC, Feng JJ, Inabnet WB, Herron D, Pomp A: Two-stage laparoscopic BPD/DS. An Alternative Approach To Super-Super Morbid Obesity. Surgical Endoscopy 2002; S187.'
  },
  sleeveGastrectomyRef2: {
    ar: 'شاور بي آر، بهات دي إل، كيروان جي بي، ولسكي كي، بريثاور إس إيه، نافانيثان إس دي، أمينيان إيه، بوتيير سي إي، كيم إي إس، نيسن إس إي، كاشياب إس آر؛ محققو STAMPEDE. جراحة السمنة مقابل العلاج الطبي المكثف للسكري - نتائج 3 سنوات. إن إنجل جي ميد. 2014 مايو 22؛ 370(21):2002-13',
    en: 'Schauer PR, Bhatt DL, Kirwan JP, Wolski K, Brethauer SA, Navaneethan SD, Aminian A, Pothier CE, Kim ES, Nissen SE, Kashyap SR; STAMPEDE Investigators. Bariatric surgery versus intensive medical therapy for diabetes–3-year outcomes. N Engl J Med. 2014 May 22;370(21):2002-13'
  },
  sleeveGastrectomyRef3: {
    ar: 'هوتر إم إم، شيرمر بي دي، جونز دي بي، كو سي واي، كوهين إم إي، ميركو روبي، نجوين إن تي. التقرير الأول من شبكة مراكز جراحة السمنة للكلية الأمريكية للجراحين: استئصال المعدة الطولي بالمنظار له مراضة وفعالية موضوعة بين الشريط والمجازة. آن سورج. 2011 سبتمبر؛ 254(3):410-20',
    en: 'Hutter MM, Schirmer BD, Jones DB, Ko CY, Cohen ME, Merkow RP, Nguyen NT. First report from the American College of Surgeons Bariatric Surgery Center Network: laparoscopic sleeve gastrectomy has morbidity and effectiveness positioned between the band and the bypass. Ann Surg. 2011 Sep;254(3):410-20'
  },
  sleeveGastrectomyRef4: {
    ar: 'ريبيكي إف، ألايكس إم إي، جياكوني سي، أوجليوني إي، سكوزاري جي، مورينو إم. مرض الارتجاع المعدي المريئي واستئصال المعدة الطولي بالمنظار: تقييم فيزيولوجي مرضي. آن سورج. 2014 نوفمبر؛ 260(5):909-14',
    en: 'Rebecchi F, Allaix ME, Giaccone C, Ugliono E, Scozzari G, Morino M. Gastroesophageal reflux disease and laparoscopic sleeve gastrectomy: a physiopathologic evaluation. Ann Surg. 2014 Nov;260(5):909-14'
  },
  sleeveGastrectomyRef5: {
    ar: 'روزنتال آر جي؛ اللجنة الدولية لخبراء استئصال المعدة الطولي، دياز إيه إيه، أرفيدسون دي، بيكر آر إس، باسو إن، بيلانجر دي، بوزا سي، إل مراد إتش، فرانس إم، جاجنر إم، جالفاو-نيتو إم، هيغا كي دي، هيمبينس جي، هاتشينسون سي إم، جاكوبس إم، جورجنسن جي أو، جوسارت جي، لاكدوالا إم، نجوين إن تي، نوكا دي، براجر جي، بومب إيه، راموس إيه سي، روزنتال آر جي، شاه إس، فيكس إم، ويتجروف إيه، زوندل إن. بيان إجماع اللجنة الدولية لخبراء استئصال المعدة الطولي: إرشادات أفضل الممارسات بناءً على خبرة >12,000 حالة. سورج أوبس ريلات ديس. 2012 يناير-فبراير؛ 8(1):8-19. دوي: 10.1016/j.soard.2011.10.019. إبوب 2011 نوفمبر 10.',
    en: 'Rosenthal RJ; International Sleeve Gastrectomy Expert Panel, Diaz AA, Arvidsson D, Baker RS, Basso N, Bellanger D, Boza C, El Mourad H, France M, Gagner M, Galvao-Neto M, Higa KD, Himpens J, Hutchinson CM, Jacobs M, Jorgensen JO, Jossart G, Lakdawala M, Nguyen NT, Nocca D, Prager G, Pomp A, Ramos AC, Rosenthal RJ, Shah S, Vix M, Wittgrove A, Zundel N. International Sleeve Gastrectomy Expert Panel Consensus Statement: best practice guidelines based on experience of >12,000 cases. Surg Obes Relat Dis. 2012 Jan-Feb;8(1):8-19. doi: 10.1016/j.soard.2011.10.019. Epub 2011 Nov 10.'
  },
  sleeveGastrectomyRef6: {
    ar: 'جاجنر إم، ديتل إم، إريكسون إيه إل، كروسبي آر دي. مسح على استئصال المعدة الطولي بالمنظار (LSG) في القمة الدولية الرابعة للإجماع حول استئصال المعدة الطولي. أوبس سورج. 2013 ديسمبر؛ 23(12):2013-7',
    en: 'Gagner M, Deitel M, Erickson AL, Crosby RD. Survey on laparoscopic sleeve gastrectomy (LSG) at the Fourth International Consensus Summit on Sleeve Gastrectomy. Obes Surg. 2013 Dec;23(12):2013-7'
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
