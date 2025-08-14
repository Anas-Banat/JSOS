import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';

const members = [
  {
    ar: "غازي راجي غازي قسايمه",
    en: "Ghazi Raji Ghazi Qasaymeh"
  },
  {
    ar: "خليل يعقوب زيادين",
    en: "Khalil Yaqoub Ziadin"
  },
  {
    ar: "سلام صالح  موسى درادكه",
    en: "Salam Saleh Mousa Daradkeh"
  },
  {
    ar: "عبدالكريم حسين قاسم العمري",
    en: "Abdelkarim Hussein Qasem Al-Omari"
  },
  {
    ar: "اسعد محمد حمدي غزال",
    en: "Asaad Mohammad Hamdi Ghazal"
  },
  {
    ar: "محمد احمد عبدالهادي خريس",
    en: "Mohammad Ahmad Abdelhadi Khreis"
  },
  {
    ar: "ناصر محمد طاهر الحموري",
    en: "Nasser Mohammad Taher Al-Hamouri"
  },
  {
    ar: "عماد محمد مصطفى الزيات",
    en: "Imad Mohammad Mustafa Al-Zayyat"
  },
  {
    ar: "محمد احمد مجلي الكوفحي",
    en: "Mohammad Ahmad Majli Al-Koufahi"
  },
  {
    ar: "رائد محمد عبدالفتاح تيم",
    en: "Raed Mohammad Abdel-Fattah Teem"
  },
  {
    ar: "فراس وليد فارس عبيدات",
    en: "Firas Waleed Faris Obeidat"
  },
  {
    ar: "نزار محمد نمر عمرو",
    en: "Nizar Mohammad Nimer Amro"
  },
  {
    ar: "اسامه منير عبد الجليل ضمره",
    en: "Osama Muneer Abdeljaleel Damrah"
  },
  {
    ar: "اياد احمد عبدالقادر القرقز",
    en: "Eyad Ahmad Abdelqader Al-Qarqaz"
  },
  {
    ar: "اياد اسعد شحاده عيد",
    en: "Eyad Asaad Shahadeh Eid"
  },
  {
    ar: "سامي سالم محمود الاحمد",
    en: "Sami Salem Mahmoud Al-Ahmad"
  },
  {
    ar: "تغلب سمير عيسى مزاهره",
    en: "Tagleb Sameer Issa Mazahreh"
  },
  {
    ar: "صالح حكمت صالح حماد",
    en: "Saleh Hikmat Saleh Hamad"
  },
  {
    ar: "هيثم غازي بكري قنديل",
    en: "Haitham Ghazi Bakri Qandeel"
  },
  {
    ar: "حسن عبدالسلام حسن حسين",
    en: "Hassan Abdulsalam Hassan Hussein"
  },
  {
    ar: "محمد عزيز طاهر الهيجاوي",
    en: "Mohammad Aziz Taher Al-Heijawi"
  },
  {
    ar: "احمد عبدالله يونس بشير",
    en: "Ahmad Abdullah Younes Basheer"
  },
  {
    ar: "اسماعيل محمد عيد النجادات",
    en: "Ismail Mohammad Eid Al-Najadat"
  },
  {
    ar: "مالك عبدالكريم محمد الكساسبه",
    en: "Malek Abdelkarim Mohammad Al-Kasasbeh"
  },
  {
    ar: "محمد نظمي محمد الحنيطي",
    en: "Mohammad Nazmi Mohammad Al-Hneiti"
  },
  {
    ar: "مهدي نمر محمد اللحام",
    en: "Mahdi Nimer Mohammad Al-Laham"
  },
  {
    ar: "اسامه حمدالله مصطفى حامد",
    en: "Osama Hamdallah Mustafa Hamed"
  },
  {
    ar: "عمر عايد عليان الشوابكه",
    en: "Omar Ayed Alian Al-Shawabkeh"
  },
  {
    ar: "حسان محمد عبدالله القضاه",
    en: "Hassan Mohammad Abdullah Al-Qudah"
  },
  {
    ar: "محمد عبدالوهاب محمد الزيتاوي",
    en: "Mohammad Abdulwahab Mohammad Al-Zaytawi"
  },
  {
    ar: "اشرف جمال سليم حداد",
    en: "Ashraf Jamal Salim Haddad"
  },
  {
    ar: "محمد زيدون  احمد الرشدان",
    en: "Mohammad Zaidoun Ahmad Al-Rashdan"
  },
  {
    ar: "محمد نبيه نافع نوفل",
    en: "Mohammad Nabih Nafe Nofal"
  },
  {
    ar: "محمود احمد حسن رمضان",
    en: "Mahmoud Ahmad Hassan Ramadan"
  },
  {
    ar: "محمود حسن عبدالقادر صالح",
    en: "Mahmoud Hassan Abdelqader Saleh"
  },
  {
    ar: "عبدالرحمن شاهر حسين مصلح",
    en: "Abdulrahman Shahir Hussein Musleh"
  },
  {
    ar: "هشام عيسى صالح الشعباني",
    en: "Hesham Issa Saleh Al-Shaabani"
  },
  {
    ar: "صهيب محمد عاطف حراره",
    en: "Suhaib Mohammad Atef Hararah"
  },
  {
    ar: "محمد راضي عبدالهادي الطراونه",
    en: "Mohammad Radi Abdelhadi Al-Tarawneh"
  },
  {
    ar: "هبه اكرم عبدالرؤوف الشنطي",
    en: "Heba Akram Abdulraouf Al-Shanti"
  },
  {
    ar: "حمزه محمد اديب محي الدين الحلواني",
    en: "Hamzeh Mohammad Adeeb Mohiuddin Al-Helwani"
  },
  {
    ar: "ياسمين احمد عبدالقادر ابوهزيم",
    en: "Yasmin Ahmad Abdelqader Abu Hazeem"
  },
  {
    ar: "حمزه ابراهيم محمود البلص",
    en: "Hamzeh Ibrahim Mahmoud Al-Ballas"
  },
  {
    ar: "احمد سالم نمور الرومي",
    en: "Ahmad Salem Namour Al-Roumi"
  }
];

const MembersContent = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-20 ">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-jsos-green-600 mb-6 text-center">{t('navMembersPage')}</h2>
          <ul className="space-y-4">
            {members.map((member, idx) => (
              <li
                key={idx}
                className="flex flex-col items-start border-b border-jsos-green-100 pb-2"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                <span className="text-lg font-medium text-jsos-green-800">{language === 'ar' ? member.ar : member.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
    );
  }

  const Members = () => {
    return (
      <LanguageProvider>
        <MembersContent />
      </LanguageProvider>
    );
  };
  
  export default Members;
