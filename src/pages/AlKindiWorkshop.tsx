
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AlKindiWorkshopContent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title">{t('alKindiWorkshopTitle') || 'Al-Kindi Workshop'}</h1>
          <p className="text-lg mb-6">
            {t('alKindiWorkshopContent') || 'Content about the Al-Kindi Workshop will be displayed here.'}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const AlKindiWorkshop = () => {
  return (
    <LanguageProvider>
      <AlKindiWorkshopContent />
    </LanguageProvider>
  );
};

export default AlKindiWorkshop;
