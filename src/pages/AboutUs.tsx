
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
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/2 animate-on-scroll">
              <h1 className="section-title">{t('aboutTitle')}</h1>
              <p className="text-lg mb-6 leading-relaxed">
                {t('aboutContent')}
              </p>

              <div className="space-y-6">
                <div className="bg-jsos-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-jsos-green-700">{t('visionTitle')}</h3>
                  <p>{t('visionContent')}</p>
                </div>

                <div className="bg-jsos-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-jsos-green-700">{t('missionTitle')}</h3>
                  <p>{t('missionContent')}</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 animate-on-scroll">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-jsos-green-500 to-jsos-red-500 opacity-30 blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80"  
                  alt="About JSOS" 
                  className="rounded-xl shadow-xl relative z-10 w-full my-12"
                />
              </div>
            </div>
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
