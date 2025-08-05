
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
          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('jsosBylawTitle')}</h1>
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
              <a 
                  href="/files/Jordanian-Society-for-Obesity-Surgery-JSOS.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-jsos-green-600 hover:bg-jsos-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                    {t('downloadPdf')}
                </a>
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
