
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsContent = () => {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);

  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: "JSOS Annual Meeting 2023",
      titleAr: "الاجتماع السنوي لجمعية جراحة السمنة الأردنية ٢٠٢٣",
      date: "2023-04-15",
      excerpt: "The Jordanian Society for Obesity Surgery successfully held its annual meeting with over 200 attendees from across the Middle East.",
      excerptAr: "عقدت جمعية جراحة السمنة الأردنية اجتماعها السنوي بنجاح بحضور أكثر من ٢٠٠ مشارك من مختلف أنحاء الشرق الأوسط.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "New Research Published on Bariatric Surgery Outcomes",
      titleAr: "نشر بحث جديد حول نتائج جراحة السمنة",
      date: "2023-03-22",
      excerpt: "JSOS members published a groundbreaking study on long-term outcomes of bariatric surgery in the prestigious International Journal of Surgery.",
      excerptAr: "نشر أعضاء جمعية جراحة السمنة الأردنية دراسة رائدة حول النتائج طويلة المدى لجراحة السمنة في المجلة الدولية المرموقة للجراحة.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "Partnership with European Association for Endoscopic Surgery",
      titleAr: "شراكة مع الجمعية الأوروبية لجراحة المناظير",
      date: "2023-02-10",
      excerpt: "JSOS has established a new partnership with the European Association for Endoscopic Surgery to promote knowledge exchange and training opportunities.",
      excerptAr: "أقامت جمعية جراحة السمنة الأردنية شراكة جديدة مع الجمعية الأوروبية لجراحة المناظير لتعزيز تبادل المعرفة وفرص التدريب.",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Obesity Awareness Campaign Launched",
      titleAr: "إطلاق حملة توعية بالسمنة",
      date: "2023-01-05",
      excerpt: "JSOS launched a nationwide campaign to raise awareness about obesity and its treatment options, reaching over 5,000 individuals.",
      excerptAr: "أطلقت جمعية جراحة السمنة الأردنية حملة وطنية لزيادة الوعي حول السمنة وخيارات علاجها، ووصلت إلى أكثر من ٥٠٠٠ شخص.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80"
    },
    {
      id: 5,
      title: "New Board Members Elected",
      titleAr: "انتخاب أعضاء مجلس إدارة جدد",
      date: "2022-12-12",
      excerpt: "JSOS members elected a new board during the annual general assembly to lead the society for the next two years.",
      excerptAr: "انتخب أعضاء جمعية جراحة السمنة الأردنية مجلس إدارة جديد خلال الجمعية العمومية السنوية لقيادة الجمعية للعامين المقبلين.",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  // Function to format date based on language
  const formatDate = (dateString: string, language: 'ar' | 'en') => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString(language === 'ar' ? 'ar-JO' : 'en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title text-center animate-on-scroll mb-12">{t('navNews')}</h1>
          
          <div className="space-y-8">
            {newsItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden animate-on-scroll hover:shadow-lg transition-all flex flex-col md:flex-row"
              >
                <div className="md:w-1/3">
                  <img 
                    src={item.image} 
                    alt={language === 'ar' ? item.titleAr : item.title} 
                    className="w-full h-full object-cover"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center text-jsos-green-700 mb-2">
                    <Calendar size={18} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{formatDate(item.date, language)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {language === 'ar' ? item.titleAr : item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'ar' ? item.excerptAr : item.excerpt}
                  </p>
                  <Button variant="outline" className="border-jsos-green-600 text-jsos-green-700 hover:bg-jsos-green-50">
                    {t('learnMore')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="border-jsos-green-600 text-jsos-green-700 hover:bg-jsos-green-50">
              Load More
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const News = () => {
  return (
    <LanguageProvider>
      <NewsContent />
    </LanguageProvider>
  );
};

export default News;
