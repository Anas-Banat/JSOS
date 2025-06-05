
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DoctorGuidelinesContent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title">{t('doctorGuidelinesTitle') || 'Doctor Guidelines'}</h1>
          <p className="text-lg mb-6">
            {t('doctorGuidelinesContent') || 'Content about the Doctor Guidelines will be displayed here.'}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const DoctorGuidelines = () => {
  return (
    <LanguageProvider>
      <DoctorGuidelinesContent />
    </LanguageProvider>
  );
};

export default DoctorGuidelines;
