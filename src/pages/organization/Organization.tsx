







import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import { Card, CardContent } from '@/components/ui/card';

const Organization = () => {  
    const { t } = useLanguage();
      
    useEffect(() => {
        const cleanupAnimation = setupScrollAnimation();
        return () => cleanupAnimation();
    }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 animate-on-scroll">
            <div className="flex flex-col items-center mb-12">
              <div className="doctor-circle w-40 h-40 mb-4">
                <img 
                  src="/members/Sami_Ahmed.jpg" 
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
                    src="/members/mohammad_khres.jpg" 
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
                    src="/members/mohammad_zetawi.jpg" 
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
                    src="/members/mohammad_rashdan.jpg" 
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
                    src="/members/taglab.jpg" 
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
                    src="/members/damrah.jpg" 
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
                    src="/members/Omar.jpg" 
                    alt={t('boardMember')}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">{t('omar')} </h3>
                <p className="text-jsos-green-700">{t('boardMember')}</p>
              </div>

            </div>
          </div>
  );
};

export default Organization;
