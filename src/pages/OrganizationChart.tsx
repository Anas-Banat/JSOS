
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
          <h1 className="section-title text-center animate-on-scroll">{t('navOrgChart')}</h1>
          <p className="text-center text-gray-600 mb-12 animate-on-scroll">
            {t('overviewContent')}
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 animate-on-scroll">
            <div className="flex flex-col items-center mb-12">
              <div className="doctor-circle w-40 h-40 mb-4">
                <img 
                  src="public\members\Sami_Ahmed.jpg" 
                  alt={t('president')} 
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl">{t('samiAhmed')}</h3>
              <p className="text-jsos-green-700">{t('president')} </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-32 h-32 mb-3">
                  <img 
                    src="public\members\mohammad_khres.jpg" 
                    alt={t('vicePresident')}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{t('mohammaKdhres')}</h3>
                <p className="text-jsos-green-700">{t('vicePresident')}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-32 h-32 mb-3">
                  <img 
                    src="public\members\mohammad_zetawi.jpg" 
                    alt={t('treasurer')}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{t('mohammadZetawi')}</h3>
                <p className="text-jsos-green-700">{t('treasurer')}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-32 h-32 mb-3">
                  <img 
                    src="public\members\mohammad_rashdan.jpg" 
                    alt={t('secretary')}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{t('mohammadRashdan')}</h3>
                <p className="text-jsos-green-700">{t('secretary')}</p>
              </div>

            
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-32 h-32 mb-3">
                  <img 
                    src="public\members\taglab.jpg" 
                    alt={t('scientificCommittee')} 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">{t('taglebMazahreh')} </h3>
                <p className="text-jsos-green-700">{t('scientificCommittee')} </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="doctor-circle w-32 h-32 mb-3">
                  <img 
                    src="public\members\damrah.jpg" 
                    alt={t('boardMember')} 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">{t('osamaDamrah')} </h3>
                <p className="text-jsos-green-700">{t('boardMember')} </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="doctor-circle w-32 h-32 mb-3">
                  <img 
                    src="public\members\Omar.jpg" 
                    alt={t('boardMember')}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">{t('omar')} </h3>
                <p className="text-jsos-green-700">{t('boardMember')}</p>
              </div>

            </div>
          </div> 
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
