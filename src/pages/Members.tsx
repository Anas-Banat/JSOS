
import React, { useEffect } from 'react';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const MembersContent = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Ahmad Al-Khateeb',
      nameAr: 'د. أحمد الخطيب',
      position: 'President',
      positionAr: 'رئيس الجمعية',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 2,
      name: 'Dr. Sarah Al-Hassan',
      nameAr: 'د. سارة الحسن',
      position: 'Vice President',
      positionAr: 'نائب الرئيس',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 3,
      name: 'Dr. Khalid Mahmoud',
      nameAr: 'د. خالد محمود',
      position: 'Secretary General',
      positionAr: 'الأمين العام',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'
    },
    {
      id: 4,
      name: 'Dr. Lama Al-Omari',
      nameAr: 'د. لمى العمري',
      position: 'Treasurer',
      positionAr: 'أمين الصندوق',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
    },
    {
      id: 5,
      name: 'Dr. Omar Al-Jabri',
      nameAr: 'د. عمر الجابري',
      position: 'Board Member',
      positionAr: 'عضو مجلس الإدارة',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 6,
      name: 'Dr. Rania Al-Masri',
      nameAr: 'د. رانيا المصري',
      position: 'Board Member',
      positionAr: 'عضو مجلس الإدارة',
      image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
    },
    {
      id: 7,
      name: 'Dr. Fadi Al-Salem',
      nameAr: 'د. فادي السالم',
      position: 'Board Member',
      positionAr: 'عضو مجلس الإدارة',
      image: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 8,
      name: 'Dr. Nour Al-Qasem',
      nameAr: 'د. نور القاسم',
      position: 'Board Member',
      positionAr: 'عضو مجلس الإدارة',
      image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title text-center animate-on-scroll">{t('membersTitle')}</h1>
          <p className="text-center text-gray-600 mb-12 animate-on-scroll">{t('membersSubtitle')}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex flex-col items-center text-center animate-on-scroll">
                <div className="doctor-circle w-40 h-40 mb-4">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={doctor.image} alt={language === 'ar' ? doctor.nameAr : doctor.name} className="object-cover" />
                    <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-bold text-lg">{language === 'ar' ? doctor.nameAr : doctor.name}</h3>
                <p className="text-jsos-green-700">{language === 'ar' ? doctor.positionAr : doctor.position}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Members = () => {
  return (
    <LanguageProvider>
      <MembersContent />
    </LanguageProvider>
  );
};

export default Members;
