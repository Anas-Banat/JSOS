
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DiseaseContent = () => {
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

          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('diseaseTitle')}</h1>
          <div className="w-full mb-8">
            <img 
              src="/images/Adjustable_Gastric_Banding.jpg" 
              alt={t('clinicalTrialsTitle')}
              className="w-full h-full object-cover rounded-lg"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('diseaseEpidemicTitle')}</h2>
            <p className="text-lg mb-6">{t('diseaseEpidemicContent')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('diseaseDefinitionTitle')}</h2>
            <p className="text-lg mb-6">{t('diseaseDefinitionContent')}</p>
            <p className="text-lg mb-8">
              <a href="/bmi" className="text-jsos-green-600 hover:text-jsos-green-800 font-semibold underline">
                {t('diseaseBMILink')}
              </a>
            </p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('diseaseHealthRisksTitle')}</h2>
            <p className="text-lg mb-8">{t('diseaseHealthRisksContent')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('diseaseCausesTitle')}</h2>
            <p className="text-lg mb-6">{t('diseaseCausesIntro')}</p>
            
                         <div className="grid md:grid-cols-2 gap-6 mb-8">
               <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                 <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('diseaseCauseGenes')}</h3>
                 <p className="text-gray-700 leading-relaxed">{t('diseaseCauseGenesDesc')}</p>
               </div>
               
               <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                 <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('diseaseCauseMetabolism')}</h3>
                 <p className="text-gray-700 leading-relaxed">{t('diseaseCauseMetabolismDesc')}</p>
               </div>
               
               <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                 <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('diseaseCauseHabits')}</h3>
                 <p className="text-gray-700 leading-relaxed">{t('diseaseCauseHabitsDesc')}</p>
               </div>
               
               <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                 <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('diseaseCauseEnvironment')}</h3>
                 <p className="text-gray-700 leading-relaxed">{t('diseaseCauseEnvironmentDesc')}</p>
               </div>
               
               <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 md:col-span-2">
                 <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('diseaseCausePsychological')}</h3>
                 <p className="text-gray-700 leading-relaxed">{t('diseaseCausePsychologicalDesc')}</p>
               </div>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Disease = () => {
  return (
    <LanguageProvider>
      <DiseaseContent />
    </LanguageProvider>
  );
};

export default Disease;
