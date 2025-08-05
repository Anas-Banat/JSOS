
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FirstCongressContent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title text-center text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('navFirstCongress')}</h1>
          <div className="w-full mb-8">
            <img 
              src="/images/1st-congress.jpg" 
              alt={t('navFirstCongress')}
              className="w-full h-full object-cover rounded-lg mx-auto max-w-4xl"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const FirstCongress = () => {
  return (
    <LanguageProvider>
      <FirstCongressContent />
    </LanguageProvider>
  );
};

export default FirstCongress;
