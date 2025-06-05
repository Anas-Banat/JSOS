
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
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

  const testimonials = [
    {
      id: 1,
      text: t('testimonial1'),
      name: 'Sarah Ahmed',
      title: 'Patient',
      delay: 0
    },
    {
      id: 2,
      text: t('testimonial2'),
      name: 'Mohammed Ali',
      title: 'Patient',
      delay: 0.1
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom mx-auto">
        <h2 className="section-title text-center animate-on-scroll">{t('testimonialsTitle')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-lg animate-on-scroll">
              <CardContent className="p-8">
                <div className="text-3xl mb-4 text-primary">❝</div>
                <p className="text-lg mb-6 italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
