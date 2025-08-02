
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RouxEnYContent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
        <div className="w-full mb-8">
            <img 
              src="/images/Adjustable_Gastric_Banding.jpg" 
              alt={t('navGastricBanding')}
              className="w-full h-full object-cover rounded-lg"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('navRouxEnY')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">{t('rouxEnYDescription')}</p>
            
            <div className="flex justify-center mb-6">
              <img 
                src="/images/Roux-en-Y.jpg" 
                alt={t('navRouxEnY')}
                className="w-50 h-50 rounded-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
            
            <p className="text-lg mb-6">{t('rouxEnYProcedure')}</p>
            
            <p className="text-lg mb-6">{t('rouxEnYFoodFlow')}</p>
            
            <p className="text-lg mb-8">{t('rouxEnYMechanism')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('bilioPancreaticOutcomes')}</h2>
            <p className="text-lg mb-6">{t('rouxEnYWeightLoss')}</p>
            <p className="text-lg mb-6">{t('rouxEnYComorbidities')}</p>
            <p className="text-lg mb-6">{t('rouxEnYSafety')}</p>
            <p className="text-lg mb-8">{t('rouxEnYDeficiencies')}</p>
          </div>
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
