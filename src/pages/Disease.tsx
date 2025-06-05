
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DiseaseContent = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title">{t('diseaseTitle') || 'Obesity as a Disease'}</h1>
          <p className="text-lg mb-6">
            {t('diseaseContent') || 'Information about obesity as a disease will be displayed here.'}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Disease = () => {
  return (
    <LanguageProvider>
      <DiseaseContent />
    </LanguageProvider>
  );
};

export default Disease;
