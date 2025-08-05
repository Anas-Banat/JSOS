
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ObesityCountriesContent = () => {
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
          {/* <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('obesity195CountriesTitle')}</h1>
          
          <div className="w-full mb-8">
            <img 
              src="/images/Adjustable_Gastric_Banding.jpg" 
              alt={t('obesity195CountriesTitle')}
              className="w-full h-full object-cover rounded-lg mx-auto max-w-4xl"
              style={{ maxHeight: '400px' }}
            />
          </div> */}
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-r from-jsos-green-600 to-jsos-green-700 rounded-2xl p-8 text-white mb-8">
              <h2 className="text-3xl font-bold mb-4">{t('obesity195CountriesIntro')}</h2>
              <p className="text-lg opacity-95">
                {t('obesity195CountriesDesc')}
              </p>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('obesity195CountriesPurpose')}</h2>
            <p className="text-lg mb-8">{t('obesity195CountriesPurposeContent')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('obesity195CountriesScope')}</h2>
            <p className="text-lg mb-8">{t('obesity195CountriesScopeContent')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('obesity195CountriesKeyFindings')}</h2>
            <p className="text-lg mb-8">{t('obesity195CountriesKeyFindingsContent')}</p>
            
            <p className="text-lg text-gray-700 mb-6">{t('obesity195CountriesDownloadDesc')}</p>
                <a 
                  href="/files/Obesity-in-195-countries.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-jsos-green-600 hover:bg-jsos-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('obesity195CountriesDownload')}
                </a>
            
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('obesity195CountriesGlobalTitle')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('obesity195CountriesGlobalDesc')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('obesity195CountriesHealthTitle')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('obesity195CountriesHealthDesc')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('obesity195CountriesBurdenTitle')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('obesity195CountriesBurdenDesc')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-jsos-green-600 mb-3">{t('obesity195CountriesTrendsTitle')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('obesity195CountriesTrendsDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ObesityCountries = () => {
  return (
    <LanguageProvider>
      <ObesityCountriesContent />
    </LanguageProvider>
  );
};

export default ObesityCountries;
