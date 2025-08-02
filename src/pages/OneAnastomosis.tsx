
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OneAnastomosisContent = () => {
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
          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('navOneAnastomosis')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">{t('oneAnastomosisDescription')}</p>
            
            <p className="text-lg mb-8">{t('oneAnastomosisComponents')}</p>

            <div className="flex justify-center mb-6">
              <img 
                src="/images/One_Anastomosis_Gastric.jpg" 
                alt={t('navGastricBanding')}
                className="w-50 h-50 rounded-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('oneAnastomosisOperation')}</h2>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('oneAnastomosisGastricPouch')}</h3>
            <p className="text-lg mb-6">{t('oneAnastomosisGastricPouchDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('oneAnastomosisJejunalBypass')}</h3>
            <p className="text-lg mb-6">{t('oneAnastomosisJejunalBypassDesc')}</p>
            
            <p className="text-lg mb-6">{t('oneAnastomosisVariations')}</p>
            
            <p className="text-lg mb-8">{t('oneAnastomosisBileReflux')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('bilioPancreaticOutcomes')}</h2>
            <p className="text-lg mb-6">{t('oneAnastomosisWeightLoss')}</p>
            <p className="text-lg mb-6">{t('oneAnastomosisSupplementation')}</p>
            <p className="text-lg mb-6">{t('oneAnastomosisFatMalabsorption')}</p>
            <p className="text-lg mb-8">{t('oneAnastomosisTrends')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('oneAnastomosisReferences')}</h2>
            <div className="space-y-2 text-sm">
              <p>{t('oneAnastomosisRef1')}</p>
              <p>{t('oneAnastomosisRef2')}</p>
              <p>{t('oneAnastomosisRef3')}</p>
              <p>{t('oneAnastomosisRef4')}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const OneAnastomosis = () => {
  return (
    <LanguageProvider>
      <OneAnastomosisContent />
    </LanguageProvider>
  );
};

export default OneAnastomosis;
