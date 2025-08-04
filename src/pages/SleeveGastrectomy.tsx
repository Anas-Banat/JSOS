
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SleeveGastrectomyContent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <div className="w-full mb-8">
            <img 
              src="/images/Adjustable_Gastric_Banding.jpg" 
              alt={t('navSleeveGastrectomy')}
              className="w-full h-full object-cover rounded-lg"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('navSleeveGastrectomy')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">{t('sleeveGastrectomyDescription')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('sleeveGastrectomyProcedure')}</h2>
            <p className="text-lg mb-8">{t('sleeveGastrectomyProcedureDesc')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('sleeveGastrectomyOutcomes')}</h2>
            <p className="text-lg mb-6">{t('sleeveGastrectomyOutcomesDesc')}</p>
            <p className="text-lg mb-8">{t('sleeveGastrectomyComplications')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('sleeveGastrectomyReferences')}</h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">{t('sleeveGastrectomyRef1')}</p>
              <p className="text-gray-700">{t('sleeveGastrectomyRef2')}</p>
              <p className="text-gray-700">{t('sleeveGastrectomyRef3')}</p>
              <p className="text-gray-700">{t('sleeveGastrectomyRef4')}</p>
              <p className="text-gray-700">{t('sleeveGastrectomyRef5')}</p>
              <p className="text-gray-700">{t('sleeveGastrectomyRef6')}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const SleeveGastrectomy = () => {
  return (
    <LanguageProvider>
      <SleeveGastrectomyContent />
    </LanguageProvider>
  );
};

export default SleeveGastrectomy;
