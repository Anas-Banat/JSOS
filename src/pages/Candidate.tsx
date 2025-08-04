
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CandidateContent = () => {
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
          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('candidateTitle')}</h1>
          
          <div className="w-full mb-8">
            <img 
              src="/images/Adjustable_Gastric_Banding.jpg" 
              alt={t('candidateTitle')}
              className="w-full h-full object-cover rounded-lg"
              style={{ maxHeight: '400px' }}
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-8">{t('candidateIntro')}</p>
            
            <h2 className="text-2xl font-bold mb-6 text-jsos-green-700">{t('candidateCriteria')}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('candidateWeight')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('candidateWeightDesc')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('candidateBMI')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('candidateBMIDesc')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('candidateAttempts')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('candidateAttemptsDesc')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('candidateAge')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('candidateAgeDesc')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('candidateHealthProblems')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('candidateHealthProblemsDesc')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('candidateNoPsychiatric')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('candidateNoPsychiatricDesc')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('candidateUnderstanding')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('candidateUnderstandingDesc')}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('candidatePregnancy')}</h3>
                <p className="text-gray-700 leading-relaxed">{t('candidatePregnancyDesc')}</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('candidateFlexibilityTitle')}</h2>
            <p className="text-lg mb-8">{t('candidateFlexibility')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Candidate = () => {
  return (
    <LanguageProvider>
      <CandidateContent />
    </LanguageProvider>
  );
};

export default Candidate;
