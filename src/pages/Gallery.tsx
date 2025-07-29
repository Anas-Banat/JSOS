
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GalleryContent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title">{t('Gallery')}</h1>
          <p className="text-lg mb-6">
            {t('Gallery')}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Gallery = () => {
  return (
    <LanguageProvider>
      <GalleryContent />
    </LanguageProvider>
  );
};

export default Gallery;
