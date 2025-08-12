
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutUsContent = () => {
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
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="section-title text-4xl font-bold text-jsos-green-700 mb-6">{t('aboutTitle')}</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxedanimate-on-scroll">
              {t('aboutContent')}
            </p>
          </div>

          
        </div>
      </main>
      <Footer />
    </div>
  );
};

const AboutUs = () => {
  return (
    <LanguageProvider>
      <AboutUsContent />
    </LanguageProvider>
  );
};

export default AboutUs;
