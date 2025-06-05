
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RouxEnYContent = () => {
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
          <h1 className="section-title">{t('rouxEnYTitle') || 'Roux-en-Y Gastric Bypass'}</h1>
          <p className="text-lg mb-6">
            {t('rouxEnYContent') || 'Information about Roux-en-Y Gastric Bypass surgery will be displayed here.'}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const RouxEnY = () => {
  return (
    <LanguageProvider>
      <RouxEnYContent />
    </LanguageProvider>
  );
};

export default RouxEnY;
