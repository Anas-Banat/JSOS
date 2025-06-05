
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
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

  const services = [
    {
      id: 1,
      title: t('service1Title'),
      description: t('service1Desc'),
      icon: "🏥",
      delay: 0
    },
    {
      id: 2,
      title: t('service2Title'),
      description: t('service2Desc'),
      icon: "🥗",
      delay: 0.1
    },
    {
      id: 3,
      title: t('service3Title'),
      description: t('service3Desc'),
      icon: "💊",
      delay: 0.2
    },
    {
      id: 4,
      title: t('service4Title'),
      description: t('service4Desc'),
      icon: "🩺",
      delay: 0.3
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-medical-50">
      <div className="container-custom mx-auto">
        <h2 className="section-title text-center animate-on-scroll">{t('servicesTitle')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service) => (
            <Card key={service.id} className="card-hover border-none shadow-md animate-on-scroll">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
