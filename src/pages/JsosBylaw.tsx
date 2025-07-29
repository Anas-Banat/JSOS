
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const JsosBylawContent = () => {
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
          <h1 className="section-title mb-20">{t('jsosBylawTitle')}</h1>
          <p className="text-lg mb-6">
            {t('jsosBylawContent1')}
          </p>
          <p className="text-lg mb-6">
            {t('jsosBylawContent2')}
          </p>
          <p className="text-lg mb-6">
            {t('jsosBylawContent3')}
          </p>
          <div className="mt-8 animate-on-scroll">
              <Button asChild className="btn-primary" size="lg">
                <a href="/files/Jordanian-Society-for-Obesity-Surgery-JSOS.pdf">{t('downloadPdf')}</a>
              </Button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const JsosBylaw = () => {
  return (
    <LanguageProvider>
      <JsosBylawContent />
    </LanguageProvider>
  );
};

export default JsosBylaw;
