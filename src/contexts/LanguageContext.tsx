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
    ar: 'أعضاء الجمعية',
    en: 'JSOS Members'
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
    ar: 'المؤتمر الدولي الأول',
    en: 'First International Congress'
  },
  navSecondCongress: {
    ar: 'المؤتمر الدولي الثاني',
    en: 'Second International Congress'
  },
  navThirdCongress: {
    ar: 'المؤتمر الدولي الثالث',
    en: 'Third International Congress'
  },
  navFourthCongress: {
    ar: 'المؤتمر الدولي الرابع',
    en: 'Fourth International Congress'
  },
  navFifthCongress: {
    ar: 'المؤتمر الدولي الخامس',
    en: 'Fifth International Congress'
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
    ar: 'هل أنت مرشح لجراحة السمنة؟',
    en: 'Are You a Candidate for Bariatric Surgery?'
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
  searchNews:{
    ar: 'ابحث في الأخبار',
    en: 'Search News'
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

  //Dashboard
  dashboard: {
    ar: 'لوحة التحكم',
    en: 'Dashboard'
  },
  accountsManagement: {
    ar: 'إدارة الحسابات',
    en: 'Accounts Management'
  },
  addNews: {
    ar: 'إضافة خبر',
    en: 'Add News'
  },
  addEvent: {
    ar: 'إضافة حدث',
    en: 'Add Event'
  },
  addGallery: {
    ar: 'إضافة معرض',
    en: 'Add Gallery'
  },
  readMore: {
    ar: 'اقرأ المزيد',
    en: 'Read More'
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
  aboutExtendedContent: {
    ar: 'قطع الأردن أشواطاً كبيرة وحقق إنجازات متقدمة في جراحات السمنة من خلال أسماء لامعة لعمالقة الطب في هذا المجال مما جعله مقصداً لعديد من المرضى العرب والأجانب الذين يتهافتون لإجراء العمليات على أيدي أمهر الأطباء الأردنيين وبات يحتل المراكز الأولى في الشرق الأوسط من حيث التقنية العالية والكفاءات المشهود لها ونسب النجاح المرتفعة والتكلفة المعتدلة حيث أصبحت جراحة السمنة بالأردن تشكل العلامة الفارقة والداعم الأكبر للسياحة العلاجية ورفد خزينة الدولة وتحرك القطاعات المختلفة الأخرى إلى جانب دورها في رفع اسم الأردن عالياً في المؤتمرات العالمية.',
    en: 'Jordan has made great strides and achieved advanced achievements in obesity surgeries through illustrious names of medical giants in this field, making it a destination for many Arab and foreign patients who flock to perform operations at the hands of the most skilled Jordanian doctors, and it has occupied the first positions in the Middle East in terms of high technology, proven competencies, high success rates and moderate cost, where obesity surgery in Jordan has become the distinctive mark and the biggest supporter of medical tourism, feeding the state treasury and moving various other sectors alongside its role in raising Jordan\'s name high in global conferences.'
  },
  aboutFoundation: {
    ar: 'ومن هنا جاءت فكرة تأسيس جمعية مكافحة السمنة المفرطة الأردنية في العام 2015 وتم تسجيلها رسمياً بشهر 11 لعام 2017 بمسمى جمعية جراحة السمنة الأردنية وتضع الجمعية نصب عينها مجموعة من الأهداف التي من شأنها تطوير وتعزيز علاج وجراحة السمنة بالأردن ومنها التوعية الصحية لمشكلة السمنة وخطرها على صحة الإنسان والمضاعفات التي قد تنتج عنها.',
    en: 'From here came the idea of establishing the Jordanian Anti-Morbid Obesity Society in 2015 and it was officially registered in November 2017 under the name Jordanian Society for Obesity Surgery, and the Society sets before its eyes a set of goals that would develop and enhance obesity treatment and surgery in Jordan, including health awareness of the obesity problem and its danger to human health and the complications that may result from it.'
  },
  aboutRole: {
    ar: 'إلى جانب ذلك تلعب الجمعية دوراً فعالاً بتقوية الروابط الاجتماعية والروابط العلمية بين الأعضاء المسجلين وإقامة المؤتمرات واللقاءات العلمية داخل الأردن كذلك إجراء البحوث والدراسات العلمية في مجال الوقاية ومجال علاج السمنة المفرطة والمشاركة بالمؤتمرات واللقاءات على المستوى العالمي.',
    en: 'In addition, the Society plays an active role in strengthening social and scientific ties between registered members and holding conferences and scientific meetings within Jordan, as well as conducting research and scientific studies in the field of prevention and treatment of morbid obesity and participating in conferences and meetings at the global level.'
  },
  aboutMeetings: {
    ar: 'كما يتم إجراء لقاءات منتظمة شهرياً لأعضاء الجمعية يقوم الأطباء من خلالها بتقديم الحالات الصعبة والنقاش عليها وإيجاد حلول مناسبة لها، بطريقة مشتركة بين الأطباء.',
    en: 'Regular monthly meetings are also held for Society members where doctors present difficult cases, discuss them, and find appropriate solutions for them, in a collaborative manner between doctors.'
  },
  aboutNecessity: {
    ar: 'إن إنشاء جمعية مكافحة السمنة المفرطة الأردنية كان ضرورة وخطوة نحو الأمام لا سيما أن السمنة والبدانة أصبحت داء العصر ولها مخاطر صحية خطيرة وقد تنشأ عنها أمراض عديدة منها ارتفاع احتمالية الإصابة بالسكري وارتفاع ضغط الدم وارتفاع الدهنيات في الدم وكذلك زيادة احتمالية ظهور الأمراض السرطانية.. الخ وبالتالي فإن جراحة السمنة لم تعد مجرد تجميل وتنسيق لجسم الإنسان بل تعدت ذلك إلى هدف أكبر وهو العلاج من الأمراض العديدة والخطيرة.',
    en: 'The establishment of the Jordanian Anti-Morbid Obesity Society was a necessity and a step forward, especially since obesity and overweight have become the disease of the era and have serious health risks that may lead to many diseases including increased probability of diabetes, high blood pressure, high blood lipids, as well as increased probability of cancer diseases... etc. Therefore, obesity surgery is no longer just cosmetic and body contouring for humans, but has gone beyond that to a greater goal, which is treatment from many serious diseases.'
  },
  // About Us Section Titles
  aboutJordanAchievementsTitle: {
    ar: 'إنجازات الأردن في جراحة السمنة',
    en: 'Jordan\'s Achievements in Obesity Surgery'
  },
  aboutFoundationTitle: {
    ar: 'تأسيس الجمعية',
    en: 'Society Foundation'
  },
  aboutScientificMeetingsTitle: {
    ar: 'اللقاءات العلمية',
    en: 'Scientific Meetings'
  },
  aboutNecessityTitle: {
    ar: 'ضرورة إنشاء الجمعية',
    en: 'Necessity of Society Establishment'
  },
  // Disease Page
  diseaseTitle: {
    ar: 'المرض',
    en: 'Disease'
  },
  diseaseEpidemicTitle: {
    ar: 'السمنة كوباء صحي عالمي',
    en: 'Obesity as a Global Health Epidemic'
  },
  diseaseEpidemicContent: {
    ar: 'تظهر السمنة كوباء صحي حول العالم. وفقاً لمراكز مكافحة الأمراض والوقاية منها، تنتشر السمنة بسرعة عبر جميع المناطق والفئات الديموغرافية. يقدر أن 97 مليون بالغ في الولايات المتحدة يعانون من زيادة الوزن أو السمنة. هذا الرقم يمثل أكثر من 50% من السكان البالغين الأمريكيين. من هذه المجموعة، يعاني 11 مليون بالغ من السمنة المفرطة.',
    en: 'Obesity is emerging as a health epidemic around the world. According to the Centres for Disease Control and Prevention, obesity is rapidly spreading across all regions and demographic groups. An estimated 97 million adults in the United States are overweight or obese. That figure represents more than 50% of the American adult population. Of this group, 11 million adults suffer from severe obesity.'
  },
  diseaseDefinitionTitle: {
    ar: 'تعريف السمنة',
    en: 'Definition of Obesity'
  },
  diseaseDefinitionContent: {
    ar: 'السمنة هي زيادة في إجمالي دهون الجسم، والتي تنتج من تناول السعرات الحرارية التي تتجاوز استخدام الطاقة. القياس المستخدم لتقييم المخاطر الصحية للسمنة هو مؤشر كتلة الجسم (BMI).',
    en: 'Obesity is an excess of total body fat, which results from caloric intake that exceeds energy usage. A measurement used to assess health risks of obesity is Body Mass Index (BMI).'
  },
  diseaseBMILink: {
    ar: 'انقر هنا لمعرفة المزيد عن مؤشر كتلة الجسم BMI',
    en: 'Click here to find out more about Body Mass Index BMI'
  },
  diseaseHealthRisksTitle: {
    ar: 'المخاطر الصحية',
    en: 'Health Risks'
  },
  diseaseHealthRisksContent: {
    ar: 'تقرر جمعية السمنة الأمريكية أن الأفراد المصابين بالسمنة لديهم خطر متزايد بنسبة 50-100% في الوفاة مقارنة بالأفراد ذوي الوزن الطبيعي، مع 300,000 إلى 587,000 حالة وفاة سنوياً. هذه الزيادة الكبيرة في المخاطر الصحية جعلت السمنة السبب الثاني للوفاة القابلة للوقاية في الولايات المتحدة.',
    en: 'The American Obesity Association reports that obese individuals have a 50-100% increased risk of death as compared to normal weight individuals, with 300,000 to 587,000 deaths each year. This substantial increase in health risks has made obesity the second leading cause of preventable death in the United States.'
  },
  diseaseCausesTitle: {
    ar: 'أسباب السمنة',
    en: 'Causes of Obesity'
  },
  diseaseCausesIntro: {
    ar: 'يمكن أن تكون السمنة مزيجاً من العوامل التالية:',
    en: 'Obesity could be a combination of the following:'
  },
  diseaseCauseGenes: {
    ar: 'الجينات التي ورثتها من والديك',
    en: 'The genes you inherited from your parents'
  },
  diseaseCauseMetabolism: {
    ar: 'مدى كفاءة جسمك في تحويل الطعام إلى طاقة',
    en: 'How well your body turns food into energy'
  },
  diseaseCauseHabits: {
    ar: 'عاداتك في الأكل والتمارين',
    en: 'Your eating and exercising habits'
  },
  diseaseCauseEnvironment: {
    ar: 'بيئتك المحيطة',
    en: 'Your surroundings'
  },
  diseaseCausePsychological: {
    ar: 'العوامل النفسية',
    en: 'Psychological factors'
  },
  // Disease Causes Detailed Descriptions
  diseaseCauseGenesDesc: {
    ar: 'العوامل الوراثية تلعب دوراً مهماً في تحديد استعداد الشخص للسمنة. الجينات التي ورثتها من والديك يمكن أن تؤثر على معدل التمثيل الغذائي وتخزين الدهون في الجسم.',
    en: 'Genetic factors play an important role in determining a person\'s predisposition to obesity. The genes you inherited from your parents can affect your metabolic rate and fat storage in the body.'
  },
  diseaseCauseMetabolismDesc: {
    ar: 'يختلف معدل التمثيل الغذائي من شخص لآخر. بعض الأشخاص لديهم معدل تمثيل غذائي أبطأ، مما يعني أنهم يحرقون السعرات الحرارية بشكل أبطأ.',
    en: 'Metabolic rate varies from person to person. Some people have a slower metabolism, meaning they burn calories more slowly.'
  },
  diseaseCauseHabitsDesc: {
    ar: 'نمط الحياة اليومي بما في ذلك عادات الأكل والتمارين الرياضية له تأثير كبير على الوزن. تناول الأطعمة عالية السعرات مع قلة النشاط البدني يؤدي إلى زيادة الوزن.',
    en: 'Daily lifestyle including eating habits and exercise has a significant impact on weight. Consuming high-calorie foods with low physical activity leads to weight gain.'
  },
  diseaseCauseEnvironmentDesc: {
    ar: 'البيئة المحيطة تشمل توفر الأطعمة الصحية، إمكانية الوصول للتمارين الرياضية، والضغوط الاجتماعية والاقتصادية التي تؤثر على خيارات نمط الحياة.',
    en: 'The surrounding environment includes the availability of healthy foods, access to exercise, and social and economic pressures that affect lifestyle choices.'
  },
  diseaseCausePsychologicalDesc: {
    ar: 'العوامل النفسية مثل التوتر، الاكتئاب، والقلق يمكن أن تؤدي إلى الإفراط في الأكل أو اختيار الأطعمة غير الصحية. بعض الأشخاص يستخدمون الطعام كوسيلة للتعامل مع المشاعر.',
    en: 'Psychological factors such as stress, depression, and anxiety can lead to overeating or choosing unhealthy foods. Some people use food as a way to cope with emotions.'
  },
  // Candidate Page
  candidateTitle: {
    ar: 'هل أنت مرشح لجراحة السمنة؟',
    en: 'Are You a Candidate for Bariatric Surgery?'
  },
  candidateIntro: {
    ar: 'هناك عدد من المعايير المقبولة على نطاق واسع والتي تجعل المريض مناسباً لجراحة السمنة أو إنقاص الوزن:',
    en: 'There are a number of widely accepted criteria which make a patient suitable for Bariatric or weight loss surgery:'
  },
  candidateCriteria: {
    ar: 'معايير المرشحين',
    en: 'Candidate Criteria'
  },
  candidateWeight: {
    ar: 'الوزن أكبر من 45 كجم فوق الوزن المثالي للجنس والطول',
    en: 'Weight greater than 45kg above the ideal body weight for sex, and height'
  },
  candidateBMI: {
    ar: 'مؤشر كتلة الجسم > 40 لوحده أو > 35 إذا كان هناك مرض سمنة مرتبط، مثل السكري أو انقطاع التنفس أثناء النوم',
    en: 'BMI > 40 by itself or >35 if there is an associated obesity illness, such as diabetes or sleep apnoea'
  },
  candidateAttempts: {
    ar: 'محاولات معقولة لتقنيات إنقاص الوزن الأخرى',
    en: 'Reasonable attempts at other weight loss techniques'
  },
  candidateAge: {
    ar: 'العمر 18-65',
    en: 'Age 18-65'
  },
  candidateHealthProblems: {
    ar: 'مشاكل صحية متعلقة بالسمنة',
    en: 'Obesity related health problems'
  },
  candidateNoPsychiatric: {
    ar: 'لا توجد مشاكل نفسية أو إدمان على المخدرات',
    en: 'No psychiatric or drug dependency problems'
  },
  candidateUnderstanding: {
    ar: 'القدرة على فهم المخاطر والالتزام المرتبط بالجراحة',
    en: 'A capacity to understand the risks and commitment associated with the surgery'
  },
  candidatePregnancy: {
    ar: 'عدم توقع الحمل في أول سنتين بعد الجراحة',
    en: 'Pregnancy not anticipated in the first two years following surgery'
  },
  candidateFlexibility: {
    ar: 'هناك مرونة كبيرة في هذه الإرشادات. تم تقديم الجراحة لمرضى صغار في السن يبلغون 12 عاماً. أحياناً يتم قبول مؤشر كتلة جسم أقل بين 30-35 إذا كانت هناك أمراض مصاحبة.',
    en: 'There is considerable flexibility in these guidelines. Patients as young as 12 have been offered surgery. Sometimes a lower BMI between 30-35 is accepted if comorbidities exist.'
  },
  // Candidate Criteria Detailed Descriptions
  candidateWeightDesc: {
    ar: 'يجب أن يكون وزن المريض أكبر من 45 كجم فوق الوزن المثالي المحدد حسب الجنس والطول.',
    en: 'The patient\'s weight should be greater than 45kg above the ideal body weight determined by sex and height.'
  },
  candidateBMIDesc: {
    ar: 'مؤشر كتلة الجسم يجب أن يكون أكبر من 40، أو أكبر من 35 إذا كان هناك أمراض مرتبطة بالسمنة.',
    en: 'Body mass index should be greater than 40, or greater than 35 if there are obesity-related diseases.'
  },
  candidateAttemptsDesc: {
    ar: 'يجب أن يكون المريض قد جرب طرق أخرى لإنقاص الوزن مثل النظام الغذائي والتمارين الرياضية.',
    en: 'The patient should have tried other weight loss methods such as diet and exercise.'
  },
  candidateAgeDesc: {
    ar: 'يجب أن يكون عمر المريض بين 18 و 65 عاماً، مع بعض الاستثناءات في حالات خاصة.',
    en: 'The patient\'s age should be between 18 and 65 years, with some exceptions in special cases.'
  },
  candidateHealthProblemsDesc: {
    ar: 'وجود مشاكل صحية متعلقة بالسمنة مثل السكري، ارتفاع ضغط الدم، أو انقطاع التنفس أثناء النوم.',
    en: 'Presence of obesity-related health problems such as diabetes, high blood pressure, or sleep apnea.'
  },
  candidateNoPsychiatricDesc: {
    ar: 'عدم وجود مشاكل نفسية خطيرة أو إدمان على المخدرات أو الكحول.',
    en: 'No serious psychiatric problems or drug or alcohol addiction.'
  },
  candidateUnderstandingDesc: {
    ar: 'القدرة على فهم المخاطر والالتزامات المرتبطة بالجراحة والتغييرات المطلوبة في نمط الحياة.',
    en: 'Ability to understand the risks and commitments associated with surgery and the required lifestyle changes.'
  },
  candidatePregnancyDesc: {
    ar: 'عدم توقع الحمل في أول سنتين بعد الجراحة لتجنب المضاعفات المحتملة.',
    en: 'No pregnancy expected in the first two years after surgery to avoid potential complications.'
  },
  candidateFlexibilityTitle: {
    ar: 'المرونة في المعايير',
    en: 'Flexibility in Criteria'
  },
  // Doctor Guidelines Page
  doctorGuidelinesTitle: {
    ar: 'إرشادات الطبيب',
    en: 'Doctor Guidelines'
  },
  doctorGuidelinesIntro: {
    ar: 'دليل جراحة السمنة في الأردن - جمعية جراحة السمنة الأردنية (JSOS)',
    en: 'Guidelines for Bariatric Surgery in Jordan - The Jordanian Society for Obesity Surgery (JSOS)'
  },
  doctorGuidelinesPurpose: {
    ar: 'الغرض من هذه المعايير هو ضمان تقديم رعاية سريرية آمنة وعالية الجودة لإدارة الوزن والسمنة. وتوصي بمسارات رعاية تدعم احتياجات المرضى، بما في ذلك التدخلات الجراحية المطلوبة، المطورة وفقاً لأفضل الممارسات الدولية القائمة على الأدلة.',
    en: 'This standard aims to ensure the delivery of quality and safe clinical care for weight management and obesity. It recommends care pathways in support of patient needs, including where required surgical interventions, developed in accordance with international evidence based best practices.'
  },
  doctorGuidelinesScope: {
    ar: 'ينطبق هذا المعيار على جميع المرافق الصحية والمهنيين المرخص لهم من قبل هيئة الصحة في الأردن. يشير هذا المعيار إلى المرضى الذين يحتاجون تدخلات نمط الحياة والسريرية والجراحية (إجراءات جراحة السمنة).',
    en: 'This standard applies to all Healthcare Facilities and Professionals licensed by Health Authority in Jordan. This standard refers to patients requiring life style, clinical and surgical interventions (bariatric Surgical procedures).'
  },
  doctorGuidelinesDuties: {
    ar: 'واجبات مقدمي الرعاية الصحية',
    en: 'Duties for Healthcare Providers'
  },
  doctorGuidelinesDutiesContent: {
    ar: 'يجب على جميع مقدمي الرعاية الصحية، بما في ذلك المرافق الصحية والمهنيين: تقديم الخدمات السريرية وفقاً لمتطلبات هذا المعيار والمعايير السريرية ذات الصلة وضمان أن ممارساتهم تعكس مسارات الرعاية السريرية المعترف بها دولياً القائمة على الأدلة؛ الإبلاغ وتقديم البيانات وفقاً لإدارة البيانات؛ توثيق ومراقبة جودة وسلامة الرعاية السريرية ونتائج التدخل الجراحي لإدارة الوزن المنجز على المرضى.',
    en: 'All health care providers, including healthcare facilities and professionals, must: Provide clinical services in accordance with the requirements of this Standard, and the relevant Clinical Care Standards and ensure that their practices reflect internationally recognized evidence based clinical care pathways; report and submit data in accordance with the Data Management; Document and monitor quality and safety of clinical care and outcomes of surgical intervention for weight management performed on patients.'
  },
  doctorGuidelinesEligibility: {
    ar: 'معايير أهلية المريض لجراحة السمنة',
    en: 'Bariatric Surgery Patient Eligibility Criteria'
  },
  doctorGuidelinesEligibilityContent: {
    ar: 'يجب على المقدم ضمان أن جراحة السمنة تُقدم للمرضى الذين يستوفون المعايير التالية: استيفاء المعايير المحددة في الملحق 1؛ الخضوع لجميع التدخلات السريرية الأخرى، مع نتائج غير ناجحة كما هو محدد في الملحق 1؛ اللياقة العامة للتخدير والجراحة؛ الالتزام بالخضوع للمتابعة طويلة المدى من قبل مقدم متخصص في إدارة السمنة.',
    en: 'The provider must ensure that bariatric surgery delivered to patients who fulfill the following criteria: meet the defined criteria in Appendices 1; have undertaken all other clinical interventions, with unsuccessful outcomes as specified in Appendices1; be generally fit for anaesthesia and surgery; commit to undertaking long-term follow-up by a specialist obesity management provider.'
  },
  doctorGuidelinesServiceSpecs: {
    ar: 'مواصفات الخدمة',
    en: 'Service Specifications'
  },
  doctorGuidelinesServiceSpecsContent: {
    ar: 'يجب على مقدم الرعاية الصحية استيفاء المتطلبات التالية: ضمان أن فرق متعددة التخصصات تتكون من جميع الموظفين المرخص لهم من هيئة الصحة اللازمين لتقديم الخدمات وفقاً لهذا المعيار، وأن جراحي السمنة يستوفون متطلبات الملحق 2؛ فقط المرافق المستشفى المرخصة من هيئة الصحة (العامة والمتخصصة) مؤهلة لتقديم جراحة السمنة للبالغين.',
    en: 'The Healthcare Provider must fulfill the following requirements: Ensure that the multi-disciplinary teams comprise of all Health Authority licensed personnel necessary to deliver services in accordance with this standard, and that bariatric surgeons satisfy the requirements of Appendix2; Only Health Authority licensed hospital (general and specialized) facilities are eligible to provide bariatric surgery for adults.'
  },
  doctorGuidelinesDownload: {
    ar: 'تحميل الدليل الكامل',
    en: 'Download Full Guidelines'
  },
  doctorGuidelinesDownloadDesc: {
    ar: 'للمزيد من المعلومات التفصيلية حول معايير الأهلية، متطلبات المقدمين، وإجراءات التسجيل والمتابعة، يرجى تحميل الدليل الكامل.',
    en: 'For more detailed information about eligibility criteria, provider requirements, and recording and follow-up procedures, please download the full guidelines.'
  },
  // Doctor Guidelines Additional Content
  doctorGuidelinesIntroDesc: {
    ar: 'هذه هي التوصيات للجراحين ومقدمي الخدمات في الأردن والتي يجب اتباعها للعمل وفق المعايير الدولية.',
    en: 'These are the recommendations for surgeons and service providers in Jordan which have to be followed to work at the international standard.'
  },
  doctorGuidelinesPurposeTitle: {
    ar: 'الغرض',
    en: 'Purpose'
  },
  doctorGuidelinesScopeTitle: {
    ar: 'النطاق',
    en: 'Scope'
  },
  doctorGuidelinesDownloadButton: {
    ar: 'تحميل الدليل الكامل (PDF)',
    en: 'Download Full Guidelines (PDF)'
  },
  // Appendices
  doctorGuidelinesAppendix1Title: {
    ar: 'الملحق 1: معايير الأهلية',
    en: 'Appendix 1: Eligibility Criteria'
  },
  doctorGuidelinesAppendix1Desc: {
    ar: 'معايير مفصلة لأهلية المرضى لجراحة السمنة، بما في ذلك مؤشر كتلة الجسم، المحاولات السابقة لإنقاص الوزن، والمشاكل الصحية المرتبطة.',
    en: 'Detailed criteria for patient eligibility for bariatric surgery, including BMI, previous weight loss attempts, and associated health problems.'
  },
  doctorGuidelinesAppendix2Title: {
    ar: 'الملحق 2: متطلبات المقدمين',
    en: 'Appendix 2: Provider Requirements'
  },
  doctorGuidelinesAppendix2Desc: {
    ar: 'متطلبات المرافق الصحية والجراحين المرخص لهم، بما في ذلك المعدات المطلوبة والفرق متعددة التخصصات.',
    en: 'Requirements for licensed healthcare facilities and surgeons, including required equipment and multidisciplinary teams.'
  },
  doctorGuidelinesAppendix3Title: {
    ar: 'الملحق 3: تسجيل الإجراءات',
    en: 'Appendix 3: Procedure Recording'
  },
  doctorGuidelinesAppendix3Desc: {
    ar: 'نماذج لتسجيل الإجراءات الجراحية الشهرية، بما في ذلك معدلات المضاعفات والنتائج.',
    en: 'Forms for recording monthly surgical procedures, including complication rates and outcomes.'
  },
  doctorGuidelinesAppendix4Title: {
    ar: 'الملحق 4: المتابعة بعد الجراحة',
    en: 'Appendix 4: Post-Surgery Follow-up'
  },
  doctorGuidelinesAppendix4Desc: {
    ar: 'إجراءات المتابعة بعد الجراحة والتحقق من نتائج المرضى من خط الأساس.',
    en: 'Post-surgery follow-up procedures and validation of patient outcomes from baseline.'
  },
  // Practical Recommendations Page
  practicalRecommendationsTitle: {
    ar: 'التوصيات العملية للسمنة',
    en: 'Practical Recommendations of Obesity'
  },
  practicalRecommendationsIntro: {
    ar: 'التوصيات العملية للجمعية الأوروبية لدراسة السمنة (EASO)',
    en: 'Practical Recommendations of the European Association for the Study of Obesity (EASO)'
  },
  practicalRecommendationsDesc: {
    ar: 'هذه التوصيات العملية تقدم إرشادات شاملة لإدارة السمنة وعلاجها، بناءً على أحدث الأدلة العلمية والممارسات السريرية المثلى.',
    en: 'These practical recommendations provide comprehensive guidelines for obesity management and treatment, based on the latest scientific evidence and best clinical practices.'
  },
  practicalRecommendationsPurpose: {
    ar: 'الغرض من هذه التوصيات',
    en: 'Purpose of These Recommendations'
  },
  practicalRecommendationsPurposeContent: {
    ar: 'تهدف هذه التوصيات إلى توفير إرشادات عملية ومبنية على الأدلة للأطباء والمهنيين الصحيين في مجال إدارة وعلاج السمنة، مع التركيز على النهج متعدد التخصصات والرعاية المخصصة للمرضى.',
    en: 'These recommendations aim to provide practical, evidence-based guidelines for physicians and healthcare professionals in the field of obesity management and treatment, with a focus on multidisciplinary approaches and patient-centered care.'
  },
  practicalRecommendationsScope: {
    ar: 'نطاق التوصيات',
    en: 'Scope of Recommendations'
  },
  practicalRecommendationsScopeContent: {
    ar: 'تغطي هذه التوصيات جميع جوانب إدارة السمنة، من التشخيص والتقييم الأولي إلى العلاج طويل المدى والمتابعة، بما في ذلك التدخلات الجراحية والطبية ونمط الحياة.',
    en: 'These recommendations cover all aspects of obesity management, from diagnosis and initial assessment to long-term treatment and follow-up, including surgical, medical, and lifestyle interventions.'
  },
  practicalRecommendationsKeyAreas: {
    ar: 'المجالات الرئيسية',
    en: 'Key Areas'
  },
  practicalRecommendationsKeyAreasContent: {
    ar: 'التوصيات تغطي المجالات التالية: التقييم الشامل للمريض، استراتيجيات إنقاص الوزن، التدخلات الطبية والجراحية، الوقاية من زيادة الوزن مرة أخرى، والمتابعة طويلة المدى.',
    en: 'The recommendations cover the following areas: comprehensive patient assessment, weight loss strategies, medical and surgical interventions, prevention of weight regain, and long-term follow-up.'
  },
  practicalRecommendationsDownload: {
    ar: 'تحميل التوصيات الكاملة',
    en: 'Download Full Recommendations'
  },
  practicalRecommendationsDownloadDesc: {
    ar: 'للمزيد من المعلومات التفصيلية حول التوصيات العملية لإدارة السمنة، يرجى تحميل الوثيقة الكاملة.',
    en: 'For more detailed information about practical recommendations for obesity management, please download the full document.'
  },
  // Practical Recommendations Key Areas
  practicalRecommendationsAssessmentTitle: {
    ar: 'التقييم الشامل',
    en: 'Comprehensive Assessment'
  },
  practicalRecommendationsAssessmentDesc: {
    ar: 'تقييم شامل للمريض يشمل التاريخ الطبي، الفحص البدني، التحاليل المخبرية، والتقييم النفسي والاجتماعي.',
    en: 'Comprehensive patient assessment including medical history, physical examination, laboratory tests, and psychosocial evaluation.'
  },
  practicalRecommendationsWeightLossTitle: {
    ar: 'استراتيجيات إنقاص الوزن',
    en: 'Weight Loss Strategies'
  },
  practicalRecommendationsWeightLossDesc: {
    ar: 'استراتيجيات متعددة لإنقاص الوزن تشمل التعديلات الغذائية، النشاط البدني، والتدخلات السلوكية.',
    en: 'Multiple weight loss strategies including dietary modifications, physical activity, and behavioral interventions.'
  },
  practicalRecommendationsInterventionsTitle: {
    ar: 'التدخلات الطبية والجراحية',
    en: 'Medical and Surgical Interventions'
  },
  practicalRecommendationsInterventionsDesc: {
    ar: 'خيارات العلاج الطبي والجراحي المتاحة، مع التركيز على الفوائد والمخاطر لكل خيار.',
    en: 'Available medical and surgical treatment options, with focus on benefits and risks of each option.'
  },
  practicalRecommendationsFollowUpTitle: {
    ar: 'المتابعة طويلة المدى',
    en: 'Long-term Follow-up'
  },
  practicalRecommendationsFollowUpDesc: {
    ar: 'برامج المتابعة طويلة المدى للوقاية من زيادة الوزن مرة أخرى وضمان النجاح المستمر للعلاج.',
    en: 'Long-term follow-up programs for prevention of weight regain and ensuring sustained treatment success.'
  },
  // European Guidelines Page
  europeanGuidelinesTitle: {
    ar: 'الإرشادات الأوروبية متعددة التخصصات لجراحة التمثيل الغذائي والسمنة',
    en: 'Interdisciplinary European Guidelines on Metabolic and Bariatric Surgery'
  },
  europeanGuidelinesIntro: {
    ar: 'الإرشادات الأوروبية متعددة التخصصات لجراحة التمثيل الغذائي والسمنة - IFSO-EC و EASO',
    en: 'Interdisciplinary European Guidelines on Metabolic and Bariatric Surgery - IFSO-EC and EASO'
  },
  europeanGuidelinesDesc: {
    ar: 'هذه الإرشادات تم تطويرها من قبل الاتحاد الدولي لجراحة السمنة والاضطرابات الأيضية - الفصل الأوروبي (IFSO-EC) والجمعية الأوروبية لدراسة السمنة (EASO) لتوفير معايير شاملة لجراحة السمنة والتمثيل الغذائي.',
    en: 'These guidelines were developed by the International Federation for the Surgery of Obesity and Metabolic Disorders-European Chapter (IFSO-EC) and the European Association for the Study of Obesity (EASO) to provide comprehensive standards for metabolic and bariatric surgery.'
  },
  europeanGuidelinesPurpose: {
    ar: 'الغرض من الإرشادات',
    en: 'Purpose of Guidelines'
  },
  europeanGuidelinesPurposeContent: {
    ar: 'تهدف هذه الإرشادات إلى تحديث المعايير السريرية لتعكس المعرفة الحالية والخبرة والبيانات المبنية على الأدلة في مجال جراحة التمثيل الغذائي والسمنة، مع التركيز على إدارة شاملة للسمنة والأمراض المرتبطة بها.',
    en: 'These guidelines aim to update clinical standards to reflect current knowledge, expertise and evidence-based data in the field of metabolic and bariatric surgery, with a focus on comprehensive management of obesity and obesity-associated diseases.'
  },
  europeanGuidelinesScope: {
    ar: 'نطاق الإرشادات',
    en: 'Scope of Guidelines'
  },
  europeanGuidelinesScopeContent: {
    ar: 'تغطي الإرشادات جميع جوانب جراحة السمنة والتمثيل الغذائي، من معايير أهلية المرضى إلى التقنيات الجراحية، المتابعة طويلة المدى، وإدارة المضاعفات.',
    en: 'The guidelines cover all aspects of metabolic and bariatric surgery, from patient eligibility criteria to surgical techniques, long-term follow-up, and complication management.'
  },
  europeanGuidelinesKeyAreas: {
    ar: 'المجالات الرئيسية',
    en: 'Key Areas'
  },
  europeanGuidelinesKeyAreasContent: {
    ar: 'الإرشادات تغطي المجالات التالية: معايير الأهلية، التقنيات الجراحية، إدارة المضاعفات، المتابعة طويلة المدى، والرعاية متعددة التخصصات.',
    en: 'The guidelines cover the following areas: eligibility criteria, surgical techniques, complication management, long-term follow-up, and multidisciplinary care.'
  },
  europeanGuidelinesDownload: {
    ar: 'تحميل الإرشادات الكاملة',
    en: 'Download Full Guidelines'
  },
  europeanGuidelinesDownloadDesc: {
    ar: 'للمزيد من المعلومات التفصيلية حول الإرشادات الأوروبية لجراحة التمثيل الغذائي والسمنة، يرجى تحميل الوثيقة الكاملة.',
    en: 'For more detailed information about European guidelines for metabolic and bariatric surgery, please download the full document.'
  },
  // European Guidelines Key Areas
  europeanGuidelinesEligibilityTitle: {
    ar: 'معايير الأهلية',
    en: 'Eligibility Criteria'
  },
  europeanGuidelinesEligibilityDesc: {
    ar: 'معايير مفصلة لأهلية المرضى لجراحة السمنة والتمثيل الغذائي، بما في ذلك مؤشر كتلة الجسم، الأمراض المصاحبة، والمحاولات السابقة لإنقاص الوزن.',
    en: 'Detailed criteria for patient eligibility for metabolic and bariatric surgery, including BMI, comorbidities, and previous weight loss attempts.'
  },
  europeanGuidelinesSurgicalTitle: {
    ar: 'التقنيات الجراحية',
    en: 'Surgical Techniques'
  },
  europeanGuidelinesSurgicalDesc: {
    ar: 'وصف شامل للتقنيات الجراحية المختلفة المستخدمة في جراحة السمنة والتمثيل الغذائي، مع التركيز على الفوائد والمخاطر.',
    en: 'Comprehensive description of different surgical techniques used in metabolic and bariatric surgery, with focus on benefits and risks.'
  },
  europeanGuidelinesComplicationsTitle: {
    ar: 'إدارة المضاعفات',
    en: 'Complication Management'
  },
  europeanGuidelinesComplicationsDesc: {
    ar: 'إرشادات شاملة لإدارة المضاعفات المحتملة بعد جراحة السمنة، بما في ذلك المضاعفات المبكرة والمتأخرة.',
    en: 'Comprehensive guidelines for managing potential complications after bariatric surgery, including early and late complications.'
  },
  europeanGuidelinesFollowUpTitle: {
    ar: 'المتابعة طويلة المدى',
    en: 'Long-term Follow-up'
  },
  europeanGuidelinesFollowUpDesc: {
    ar: 'بروتوكولات المتابعة طويلة المدى للمرضى بعد جراحة السمنة، بما في ذلك المراقبة الغذائية والطبية.',
    en: 'Long-term follow-up protocols for patients after bariatric surgery, including nutritional and medical monitoring.'
  },
  // Obesity in 195 Countries Page
  obesity195CountriesTitle: {
    ar: 'الآثار الصحية للوزن الزائد والسمنة في 195 دولة على مدى 25 عاماً',
    en: 'Health Effects of Overweight and Obesity in 195 Countries over 25 Years'
  },
  obesity195CountriesIntro: {
    ar: 'دراسة شاملة حول الآثار الصحية للوزن الزائد والسمنة - مجلة نيو إنجلاند للطب',
    en: 'Comprehensive Study on Health Effects of Overweight and Obesity - New England Journal of Medicine'
  },
  obesity195CountriesDesc: {
    ar: 'هذه الدراسة الشاملة التي نشرت في مجلة نيو إنجلاند للطب تحلل البيانات من 68.5 مليون شخص لتقييم اتجاهات انتشار الوزن الزائد والسمنة بين الأطفال والبالغين بين عامي 1980 و 2015.',
    en: 'This comprehensive study published in the New England Journal of Medicine analyzes data from 68.5 million persons to assess trends in the prevalence of overweight and obesity among children and adults between 1980 and 2015.'
  },
  obesity195CountriesPurpose: {
    ar: 'الغرض من الدراسة',
    en: 'Purpose of the Study'
  },
  obesity195CountriesPurposeContent: {
    ar: 'تهدف الدراسة إلى توفير معلومات محدثة حول مستويات مؤشر كتلة الجسم المرتفع والآثار الصحية على مستوى السكان، مع التركيز على العلاقة بين مؤشر كتلة الجسم المرتفع والأمراض المزمنة المختلفة.',
    en: 'The study aims to provide timely information about levels of high BMI and health effects at the population level, with a focus on the relationship between high BMI and various chronic diseases.'
  },
  obesity195CountriesScope: {
    ar: 'نطاق الدراسة',
    en: 'Scope of the Study'
  },
  obesity195CountriesScopeContent: {
    ar: 'تغطي الدراسة 195 دولة وتشمل تحليلاً شاملاً لانتشار السمنة والوزن الزائد، عبء المرض المرتبط بمؤشر كتلة الجسم المرتفع، والاتجاهات العالمية على مدى 25 عاماً.',
    en: 'The study covers 195 countries and includes comprehensive analysis of obesity and overweight prevalence, disease burden related to high BMI, and global trends over 25 years.'
  },
  obesity195CountriesKeyFindings: {
    ar: 'النتائج الرئيسية',
    en: 'Key Findings'
  },
  obesity195CountriesKeyFindingsContent: {
    ar: 'في عام 2015، كان هناك 107.7 مليون طفل و 603.7 مليون بالغ يعانون من السمنة. منذ عام 1980، تضاعف انتشار السمنة في أكثر من 70 دولة واستمر في الزيادة في معظم الدول الأخرى.',
    en: 'In 2015, a total of 107.7 million children and 603.7 million adults were obese. Since 1980, the prevalence of obesity has doubled in more than 70 countries and has continuously increased in most other countries.'
  },
  obesity195CountriesDownload: {
    ar: 'تحميل الدراسة الكاملة',
    en: 'Download Full Study'
  },
  obesity195CountriesDownloadDesc: {
    ar: 'للمزيد من المعلومات التفصيلية حول الدراسة الشاملة حول الآثار الصحية للوزن الزائد والسمنة في 195 دولة، يرجى تحميل الوثيقة الكاملة.',
    en: 'For more detailed information about the comprehensive study on health effects of overweight and obesity in 195 countries, please download the full document.'
  },
  // Obesity in 195 Countries Key Areas
  obesity195CountriesGlobalTitle: {
    ar: 'الانتشار العالمي',
    en: 'Global Prevalence'
  },
  obesity195CountriesGlobalDesc: {
    ar: 'تحليل شامل لانتشار السمنة والوزن الزائد في 195 دولة، مع التركيز على الاتجاهات الإقليمية والاختلافات بين الدول.',
    en: 'Comprehensive analysis of obesity and overweight prevalence in 195 countries, with focus on regional trends and country differences.'
  },
  obesity195CountriesHealthTitle: {
    ar: 'الآثار الصحية',
    en: 'Health Effects'
  },
  obesity195CountriesHealthDesc: {
    ar: 'تقييم الآثار الصحية للسمنة والوزن الزائد، بما في ذلك الأمراض القلبية الوعائية، السكري، السرطان، والاضطرابات العضلية الهيكلية.',
    en: 'Assessment of health effects of obesity and overweight, including cardiovascular diseases, diabetes, cancer, and musculoskeletal disorders.'
  },
  obesity195CountriesBurdenTitle: {
    ar: 'عبء المرض',
    en: 'Disease Burden'
  },
  obesity195CountriesBurdenDesc: {
    ar: 'تحليل عبء المرض المرتبط بمؤشر كتلة الجسم المرتفع، بما في ذلك الوفيات وسنوات العمر المصححة باحتساب الإعاقة.',
    en: 'Analysis of disease burden related to high BMI, including deaths and disability-adjusted life-years.'
  },
  obesity195CountriesTrendsTitle: {
    ar: 'الاتجاهات العالمية',
    en: 'Global Trends'
  },
  obesity195CountriesTrendsDesc: {
    ar: 'تحليل الاتجاهات العالمية للسمنة والوزن الزائد على مدى 25 عاماً، مع التركيز على التغيرات في الانتشار والعبء الصحي.',
    en: 'Analysis of global trends in obesity and overweight over 25 years, with focus on changes in prevalence and health burden.'
  },
  // Nutritional Guidelines Page
  nutritionalGuidelinesTitle: {
    ar: 'الإرشادات التغذوية المتكاملة للجمعية الأمريكية لجراحة التمثيل الغذائي والسمنة 2016',
    en: 'ASMBS Integrated Health Nutritional Guidelines for the Surgical Weight Loss Patient 2016 Update'
  },
  nutritionalGuidelinesIntro: {
    ar: 'الإرشادات التغذوية المتكاملة للجمعية الأمريكية لجراحة التمثيل الغذائي والسمنة - تحديث 2016',
    en: 'American Society for Metabolic and Bariatric Surgery Integrated Health Nutritional Guidelines - 2016 Update'
  },
  nutritionalGuidelinesDesc: {
    ar: 'هذه الإرشادات التغذوية المحدثة تركز على المغذيات الدقيقة وتوفر توصيات شاملة للفحص قبل وبعد الجراحة، المكملات الوقائية، وإعادة تعويض نقص المغذيات في مرضى جراحة إنقاص الوزن.',
    en: 'These updated nutritional guidelines focus on micronutrients and provide comprehensive recommendations for preoperative and postoperative screening, preventative supplementation, and repletion of nutrient deficiencies in weight loss surgery patients.'
  },
  nutritionalGuidelinesPurpose: {
    ar: 'الغرض من الإرشادات',
    en: 'Purpose of Guidelines'
  },
  nutritionalGuidelinesPurposeContent: {
    ar: 'تهدف هذه الإرشادات إلى تحسين نتائج المرضى بعد الجراحة والحالة التغذوية من خلال التعليم المناسب قبل وبعد جراحة إنقاص الوزن حول نقص المغذيات المتوقع المرتبط بالتغيرات الفسيولوجية.',
    en: 'These guidelines aim to optimize postoperative patient outcomes and nutritional status through appropriate education before and after weight loss surgery on expected nutrient deficiencies associated with physiological alterations.'
  },
  nutritionalGuidelinesScope: {
    ar: 'نطاق الإرشادات',
    en: 'Scope of Guidelines'
  },
  nutritionalGuidelinesScopeContent: {
    ar: 'تغطي الإرشادات 92 توصية جديدة، مع التركيز على الفيتامينات B1 و B12، حمض الفوليك، الحديد، الفيتامينات A و E و K، الكالسيوم، فيتامين D، النحاس، والزنك.',
    en: 'The guidelines cover 92 new recommendations, focusing on vitamins B1 and B12, folate, iron, vitamins A, E, and K, calcium, vitamin D, copper, and zinc.'
  },
  nutritionalGuidelinesKeyFindings: {
    ar: 'النتائج الرئيسية',
    en: 'Key Findings'
  },
  nutritionalGuidelinesKeyFindingsContent: {
    ar: 'تشير البيانات إلى أن انتشار نقص المغذيات الدقيقة آخذ في الازدياد، بينما ينخفض مراقبة المرضى في المتابعة. تم مراجعة 402 مقالة من أصل 554 مقالة تم تحديدها.',
    en: 'Data continue to suggest that the prevalence of micronutrient deficiencies is increasing, while monitoring of patients at follow-up is decreasing. 402 articles were reviewed out of 554 identified articles.'
  },
  nutritionalGuidelinesDownload: {
    ar: 'تحميل الإرشادات الكاملة',
    en: 'Download Full Guidelines'
  },
  nutritionalGuidelinesDownloadDesc: {
    ar: 'للمزيد من المعلومات التفصيلية حول الإرشادات التغذوية المحدثة للجمعية الأمريكية لجراحة التمثيل الغذائي والسمنة، يرجى تحميل الوثيقة الكاملة.',
    en: 'For more detailed information about the updated nutritional guidelines from the American Society for Metabolic and Bariatric Surgery, please download the full document.'
  },
  // Nutritional Guidelines Key Areas
  nutritionalGuidelinesScreeningTitle: {
    ar: 'الفحص قبل الجراحة',
    en: 'Preoperative Screening'
  },
  nutritionalGuidelinesScreeningDesc: {
    ar: 'توصيات شاملة للفحص الروتيني لنقص المغذيات قبل جراحة إنقاص الوزن، بما في ذلك الفيتامينات والمعادن الأساسية.',
    en: 'Comprehensive recommendations for routine screening of nutrient deficiencies before weight loss surgery, including essential vitamins and minerals.'
  },
  nutritionalGuidelinesSupplementationTitle: {
    ar: 'المكملات الوقائية',
    en: 'Preventative Supplementation'
  },
  nutritionalGuidelinesSupplementationDesc: {
    ar: 'إرشادات للمكملات الوقائية للمغذيات الدقيقة قبل وبعد جراحة إنقاص الوزن لضمان الحالة التغذوية المثلى.',
    en: 'Guidelines for preventative supplementation of micronutrients before and after weight loss surgery to ensure optimal nutritional status.'
  },
  nutritionalGuidelinesRepletionTitle: {
    ar: 'إعادة تعويض النقص',
    en: 'Nutrient Repletion'
  },
  nutritionalGuidelinesRepletionDesc: {
    ar: 'استراتيجيات إعادة تعويض نقص المغذيات في مرضى جراحة إنقاص الوزن، مع التركيز على الفيتامينات والمعادن الأساسية.',
    en: 'Strategies for repletion of nutrient deficiencies in weight loss surgery patients, with focus on essential vitamins and minerals.'
  },
  nutritionalGuidelinesMonitoringTitle: {
    ar: 'المراقبة والمتابعة',
    en: 'Monitoring and Follow-up'
  },
  nutritionalGuidelinesMonitoringDesc: {
    ar: 'بروتوكولات المراقبة والمتابعة طويلة المدى للحالة التغذوية للمرضى بعد جراحة إنقاص الوزن.',
    en: 'Long-term monitoring and follow-up protocols for nutritional status of patients after weight loss surgery.'
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
    ar: 'د. محمد زيتاوي',
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
  sleeveGastrectomyComplications: {
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

  // Clinical Trials Content
  clinicalTrialsTitle: {
    ar: 'التجارب السريرية',
    en: 'Clinical Trials'
  },
  clinicalTrialsIntro: {
    ar: 'هناك العديد من الأدوية والعلاجات والجراحات والإجراءات الفعالة. هذا نتيجة للبحث والتجارب السريرية. قبل أن يصل أي دواء أو جراحة إلى السوق، يمر بسلسلة من التجارب السريرية. في هذا القسم ستتعلم عن التجارب السريرية وكيف يمكنك المشاركة في واحدة منها.',
    en: 'There are many effective drugs, treatments, surgeries and procedures. This is as a result of research and clinical trials. Before any drug or surgery makes it to market it goes through a series of clinical trials. In this section you will learn about clinical trials and how you can participate in one.'
  },
  clinicalTrialsWhatTitle: {
    ar: 'ما هي التجربة السريرية؟',
    en: 'What is a Clinical Trial?'
  },
  clinicalTrialsWhatDesc: {
    ar: 'التجربة السريرية هي دراسة بحثية تُجرى مع المرضى الذين تم تشخيصهم بأمراض خطيرة وتتضمن عادة اختبار علاجات جديدة أو إيجاد طرق لتحسين العلاجات الموجودة. تُجرى التجارب السريرية في جميع أنحاء العالم في معظم المستشفيات الكبيرة في محاولة لتحسين العلاج للعديد من الأمراض.',
    en: 'A clinical trial is a research study conducted with patients who have been diagnosed with major illness and generally involves testing of new treatments or finding ways of improving existing treatments. Clinical trials are conducted all over the world in most large hospitals in an attempt to improve treatment for many diseases.'
  },
  clinicalTrialsObjective: {
    ar: 'الهدف الرئيسي من التجربة السريرية هو مقارنة مجموعتين أو أكثر من الأشخاص، باستخدام خيارين أو أكثر من خيارات العلاج لتحديد فعالية دواء أو علاج بيولوجي مقترح.',
    en: 'The main objective of a clinical trial is to compare two or more groups of subjects, using two or more treatment options to determine the effectiveness of a proposed drug or biological treatment.'
  },
  clinicalTrialsDesign: {
    ar: 'التجارب السريرية مصممة بعناية وأخلاقية للسماح بجمع وتحليل دقيق وصادق للمعلومات لمعرفة المزيد عن المرض. مثل هذه التجارب تساعد في اكتشاف ما إذا كان العلاج الجديد الواعد آمناً وفعالاً، وكذلك إعطاء فهم أفضل للعلاج القياسي الحالي، على أمل تحسين الآثار الجانبية التي يعاني منها العديد من المرضى.',
    en: 'Clinical trials are carefully and ethically designed to allow truthful and precise collection and analysis of information to find out more about a disease. Such trials help discover whether a promising new treatment is safe and effective, as well as giving a better understanding of the current standard treatment, in the hope of improving the side effects experienced by many patients.'
  },
  clinicalTrialsTypesTitle: {
    ar: 'أنواع التجارب',
    en: 'Types of Trials'
  },
  clinicalTrialsTypesIntro: {
    ar: 'تُجرى التجارب السريرية في أربع مراحل قبل أن يمكن اعتبارها للتسجيل والاستخدام.',
    en: 'Clinical trials are conducted in four phases before they can be considered for registration and use.'
  },
  clinicalTrialsPhase1: {
    ar: 'تتضمن تجارب المرحلة الأولى عدداً صغيراً من المرضى ومصممة لاختبار سلامة وجرعة دواء جديد وتقييم الآثار الجانبية لمستويات جرعات مختلفة.',
    en: 'Phase I trials involve a small number of patients and are designed to test the safety and dosage of a new drug and to evaluate side effects of various dosage levels.'
  },
  clinicalTrialsPhase2: {
    ar: 'تتضمن تجارب المرحلة الثانية أعداداً أكبر من المرضى واختبار فعالية العلاج المعطى في جرعة معينة.',
    en: 'Phase II trials involve larger numbers of patients and test the effectiveness of a treatment given in a particular dose.'
  },
  clinicalTrialsPhase3: {
    ar: 'تجارب المرحلة الثالثة هي فحوصات كاملة النطاق للتحكم في الأدوية أو العلاجات الجديدة ومصممة لاستكشاف أكثر اكتمالاً للفوائد والمخاطر المحتملة للعلاج قيد الدراسة. غالباً، يُقارن العلاج القياسي أو الحالي بعلاج أحدث وربما أفضل. هذه التجربة هي تجربة عشوائية، مما يعني أن العلاج يُختار عشوائياً - لا يمكن للمريض ولا الطبيب أن يقررا أي علاج سيحصل عليه المريض. هذا يضمن تخصيص عدد متساوٍ من المرضى لكل علاج وإزالة أي تحيز قد يكون لدى الطبيب أو المريض لعلاج واحد أو آخر.',
    en: 'Phase III trials are full-scale controlled examinations of new drugs or treatments and are designed to more fully explore the potential benefits and risks of the treatment under study. Often, the standard or current treatment is compared to a newer and potentially better treatment. This trial is a randomised trial, meaning the treatment is chosen at random- neither the patient nor the doctor can decide which treatment the patient will receive. This ensures an equal number of patients are allocated to each treatment and removes any bias the doctor or patient may have to one treatment or another.'
  },
  clinicalTrialsPhase4: {
    ar: 'تجارب المرحلة الرابعة تسمح للشركات الدوائية بمراقبة أي آثار جانبية ضارة على نطاق أوسع من دراسات المرحلة الثالثة وتساعد في توضيح استخدامات أخرى للأدوية، على سبيل المثال، علاج مرض آخر.',
    en: 'Phase IV trials allow pharmaceutical companies to monitor any adverse side effects on a larger scale than Phase III studies and help clarify other uses for the drugs, for example, treatment of another disease.'
  },
  clinicalTrialsWhyTitle: {
    ar: 'لماذا يجب أن أدخل تجربة سريرية؟',
    en: 'Why should I enter a Clinical Trial?'
  },
  clinicalTrialsWhyDesc: {
    ar: 'يشارك المرضى في التجارب السريرية لأسباب عديدة، عادة مع أمل الحصول على فوائد علاجية مباشرة لأنفسهم. قد يشمل هذا فرصة أكبر للشفاء، أو وقت أطول للعيش أو جودة حياة أفضل. أحياناً يريد المرضى المساهمة في البحث الذي سيساعد المصابين المستقبليين بالمرض.',
    en: 'Patients take part in clinical trials for many reasons, usually with the hope of direct treatment benefits for themselves. This might include a greater chance of a cure, a longer time to live or better quality of life. Sometimes patients want to contribute to research that will help future sufferers of the disease.'
  },
  clinicalTrialsBenefits: {
    ar: 'المرضى الذين يشاركون في التجارب السريرية، والتي تُرى فيها نتائج محسنة، لديهم الفرصة الأولى للاستفادة من هذه العلاجات المحسنة.',
    en: 'Patients who participate in clinical trials, in which improved results are seen, have the first chance to benefit from these improved treatments.'
  },
  clinicalTrialsHowTitle: {
    ar: 'كيف يمكنني المشاركة في تجربة سريرية؟',
    en: 'How do I participate in a Clinical Trial?'
  },
  clinicalTrialsHowDesc: {
    ar: 'قبل أن توافق على المشاركة في تجربة سريرية، سيتم إعطاؤك ورقة معلومات تحتوي على جميع المعلومات حول التجربة، بما في ذلك المخاطر والفوائد. مع أي شكل من أشكال العلاج الذي يتم تقييمه في تجربة سريرية، يمكن أن تحدث آثار جانبية وهذا دائماً متوازن ضد فوائد العلاج. ستُعطى أيضاً الفرصة لمناقشة التجربة مع طبيبك المعالج، الذي سيكون قادراً على الإجابة على أي أسئلة.',
    en: 'Before you consent to participate in a clinical trial, you will be given an information sheet, which contains all the information about the trial, including the risks and benefits. With any form of treatment being assessed in a clinical trial, side effects can be experienced and this is always balanced against the benefits of treatment. You will also be given the opportunity to discuss the trial with your treating doctor, who will be able to answer any questions.'
  },
  clinicalTrialsConsent: {
    ar: 'إذا وافقت على المشاركة سيُطلب منك التوقيع على نموذج موافقة، يوضح أنك قرأت وفهمت الغرض من التجربة والمخاطر والفوائد المرتبطة بها. أنت حر في الانسحاب من التجربة في أي وقت. جميع الرموز الأخلاقية والقانونية التي تنطبق على الممارسة الطبية تُتبع بعناية في التجارب السريرية.',
    en: 'If you agree to participate you will be asked to sign a consent form, stating that you have read and understood the purpose of the trial and the risks and benefits attached to it. You are free to withdraw from the trial at any time. All the ethical and legal codes that apply to medical practice are carefully followed in clinical trials.'
  },
  phase1: {
    ar: 'المرحلة الأولى',
    en: 'Phase 1'
  },
  phase2: {
    ar: 'المرحلة الثانية',
    en: 'Phase 2'
  },
  phase3: {
    ar: 'المرحلة الثالثة',
    en: 'Phase 3'
  },
  phase4: {
    ar: 'المرحلة الرابعة',
    en: 'Phase 4'
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
