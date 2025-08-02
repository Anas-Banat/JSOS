
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BilioPancreaticContent = () => {
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
          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('navBilioPancreatic')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">{t('bilioPancreaticDescription')}</p>
            
            <p className="text-lg mb-4">{t('bilioPancreaticComponents')}</p>
            
            <ul className="list-disc px-12 mb-6 space-y-2">
              <li>{t('bilioPancreaticComponent1')}</li>
              <li>{t('bilioPancreaticComponent2')}</li>
              <li>{t('bilioPancreaticComponent3')}</li>
              <li>{t('bilioPancreaticComponent4')}</li>
            </ul>
            
            <p className="text-lg mb-8">{t('bilioPancreaticHistory')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('bilioPancreaticProcedure')}</h2>
            <p className="text-lg mb-6">{t('bilioPancreaticProcedureStep1')}</p>
            <p className="text-lg mb-8">{t('bilioPancreaticProcedureStep2')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('bilioPancreaticOutcomes')}</h2>
            <p className="text-lg mb-6">{t('bilioPancreaticOutcomesDesc')}</p>
            <p className="text-lg mb-6">{t('bilioPancreaticTrends')}</p>
            <p className="text-lg mb-8">{t('bilioPancreaticModifications')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('bilioPancreaticReferences')}</h2>
            <div className="space-y-2 text-sm">
              <p>{t('bilioPancreaticRef1')}</p>
              <p>{t('bilioPancreaticRef2')}</p>
              <p>{t('bilioPancreaticRef3')}</p>
              <p>{t('bilioPancreaticRef4')}</p>
              <p>{t('bilioPancreaticRef5')}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const BilioPancreatic = () => {
  return (
    <LanguageProvider>
      <BilioPancreaticContent />
    </LanguageProvider>
  );
};

export default BilioPancreatic;
