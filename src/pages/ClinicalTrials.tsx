
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ClinicalTrialsContent = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <div className="w-full mb-8">
            <img 
              src="/images/Adjustable_Gastric_Banding.jpg" 
              alt={t('clinicalTrialsTitle')}
              className="w-full h-full object-cover rounded-lg"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('clinicalTrialsTitle')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">{t('clinicalTrialsIntro')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('clinicalTrialsWhatTitle')}</h2>
            <p className="text-lg mb-6">{t('clinicalTrialsWhatDesc')}</p>
            <p className="text-lg mb-6">{t('clinicalTrialsObjective')}</p>
            <p className="text-lg mb-8">{t('clinicalTrialsDesign')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('clinicalTrialsTypesTitle')}</h2>
            <p className="text-lg mb-6">{t('clinicalTrialsTypesIntro')}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('phase1')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('clinicalTrialsPhase1')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('phase2')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('clinicalTrialsPhase2')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('phase3')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('clinicalTrialsPhase3')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('phase4')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('clinicalTrialsPhase4')}</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('clinicalTrialsWhyTitle')}</h2>
            <p className="text-lg mb-6">{t('clinicalTrialsWhyDesc')}</p>
            <p className="text-lg mb-8">{t('clinicalTrialsBenefits')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('clinicalTrialsHowTitle')}</h2>
            <p className="text-lg mb-6">{t('clinicalTrialsHowDesc')}</p>
            <p className="text-lg mb-8">{t('clinicalTrialsConsent')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ClinicalTrials = () => {
  return (
    <LanguageProvider>
      <ClinicalTrialsContent />
    </LanguageProvider>
  );
};

export default ClinicalTrials;
