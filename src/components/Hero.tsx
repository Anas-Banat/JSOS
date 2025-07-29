
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { setupScrollAnimation } from '@/utils/animation';
import { Star, Flag, Info } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();
  const animationRef = useRef<() => void>();

  useEffect(() => {
    animationRef.current = setupScrollAnimation();
    return () => {
      if (animationRef.current) {
        animationRef.current();
      }
    };
  }, []);

  return (
    <section id="home" className="pt-28 md:pt-32 pb-16 bg-gradient-to-b from-jsos-green-100 to-white">
      <div className="container-custom mx-auto">
        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground animate-on-scroll">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mt-4 text-muted-foreground animate-on-scroll">
              {t('heroSubtitle')}
            </p>
            <div className="mt-8 animate-on-scroll">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/about-us">{t('learnMore')}</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-on-scroll">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-jsos-green-500 to-jsos-red-500 opacity-30 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80" 
                alt="JSOS Conference" 
                className="relative w-full rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
        
        {/* Vision, Mission, and Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Vision */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-jsos-green-100 animate-on-scroll hover:shadow-lg transition-all">
            <div className="bg-jsos-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Star className="text-jsos-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-jsos-green-800">{t('visionTitle')}</h3>
            <p className="text-gray-600">{t('visionContent')}</p>
          </div>
          
          {/* Mission */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-jsos-green-100 animate-on-scroll hover:shadow-lg transition-all">
            <div className="bg-jsos-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Flag className="text-jsos-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-jsos-green-800">{t('missionTitle')}</h3>
            <p className="text-gray-600">{t('missionContent')}</p>
          </div>
          
          {/* Overview */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-jsos-green-100 animate-on-scroll hover:shadow-lg transition-all">
            <div className="bg-jsos-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Info className="text-jsos-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-jsos-green-800">{t('overviewTitle')}</h3>
            <p className="text-gray-600">{t('overviewContent')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
