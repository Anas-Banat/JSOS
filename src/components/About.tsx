
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';

const About = () => {
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
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container-custom mx-auto">
        <h2 className="section-title text-center animate-on-scroll">{t('aboutTitle')}</h2>
        
        <div className="flex flex-col md:flex-row items-center mt-12 gap-8">
          <div className="md:w-1/2 animate-on-scroll">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-secondary to-primary opacity-30 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                alt="Doctor" 
                className="relative rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 animate-on-scroll">
            <h3 className="section-subtitle">Dr. Jordan</h3>
            <p className="text-lg leading-relaxed mb-6">
              {t('aboutContent')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-medical-50 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                  10+
                </div>
                <div>
                  <p className="font-semibold">Years Experience</p>
                </div>
              </div>
              <div className="bg-medical-50 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                  5k+
                </div>
                <div>
                  <p className="font-semibold">Satisfied Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
