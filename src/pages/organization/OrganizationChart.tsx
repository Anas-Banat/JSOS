
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Organization from '@/pages/organization/Organization';

const OrganizationChartContent = () => {
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
          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px] animate-on-scroll">{t('navOrgChart')}</h1>
          <p className="text-gray-600 mb-12 animate-on-scroll">
            {t('overviewContent')}
          </p>
          
          <Organization />
           
        </div>
      </main>
      <Footer />
    </div>
  );
};

const OrganizationChart = () => {
  return (
    <LanguageProvider>
      <OrganizationChartContent />
    </LanguageProvider>
  );
};

export default OrganizationChart;
