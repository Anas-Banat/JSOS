
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GastricBandingContent = () => {
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
          
          <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('navGastricBanding')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">{t('gastricBandingDescription')}</p>
            
            <p className="text-lg mb-6">{t('gastricBandingPlacement')}</p>
            
            <ul className="list-disc px-12 mb-6 space-y-2">
              <li>{t('gastricBandingMechanism1')}</li>
              <li>{t('gastricBandingMechanism2')}</li>
            </ul>
            
            <p className="text-lg mb-6">{t('gastricBandingIntact')}</p>
            
            <p className="text-lg mb-8">{t('gastricBandingAdjustment')}</p>

            <div className="flex justify-center mb-6">
              <img 
                src="/images/adjustable-gastric-banding.jpg" 
                alt={t('navGastricBanding')}
                className="w-50 h-50 rounded-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('gastricBandingImage')}</h2>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('gastricBandingOperation')}</h2>
            <p className="text-lg mb-6">{t('gastricBandingOperationDesc')}</p>
            <p className="text-lg mb-8">{t('gastricBandingPlacementDesc')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('gastricBandingWeightLoss')}</h2>
            <p className="text-lg mb-6">{t('gastricBandingWeightLossDesc')}</p>
            <p className="text-lg mb-8">{t('gastricBandingFollowUp')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('gastricBandingComorbidity')}</h2>
            <p className="text-lg mb-8">{t('gastricBandingComorbidityDesc')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('gastricBandingRisks')}</h2>
            <p className="text-lg mb-6">{t('gastricBandingRisksDesc')}</p>
            
            <h3 className="text-xl font-bold mb-4 text-jsos-green-600">{t('gastricBandingLaparoscopicRisks')}</h3>
            <ul className="list-disc px-12 mb-6 space-y-2">
              <li>{t('gastricBandingRisk1')}</li>
              <li>{t('gastricBandingRisk2')}</li>
              <li>{t('gastricBandingRisk3')}</li>
              <li>{t('gastricBandingRisk4')}</li>
              <li>{t('gastricBandingRisk5')}</li>
              <li>{t('gastricBandingRisk6')}</li>
              <li>{t('gastricBandingRisk7')}</li>
              <li>{t('gastricBandingRisk8')}</li>
            </ul>
            
            <p className="text-lg mb-8">{t('gastricBandingSafety')}</p>
            
            <h2 className="text-2xl font-bold mb-4 text-jsos-green-700">{t('gastricBandingProblems')}</h2>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingVomiting')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingVomitingDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingPortInfection')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingPortInfectionDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingWoundInfection')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingWoundInfectionDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingLeakage')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingLeakageDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingSlippage')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingSlippageDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingErosion')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingErosionDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingReflux')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingRefluxDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingAcidErosion')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingAcidErosionDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingGallstones')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingGallstonesDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingHernia')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingHerniaDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingFlabbySkin')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingFlabbySkinDesc')}</p>
            
            <h3 className="text-xl font-bold mb-3 text-jsos-green-600">{t('gastricBandingNutrientDeficiency')}</h3>
            <p className="text-lg mb-6">{t('gastricBandingNutrientDeficiencyDesc')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const GastricBanding = () => {
  return (
    <LanguageProvider>
      <GastricBandingContent />
    </LanguageProvider>
  );
};

export default GastricBanding;
