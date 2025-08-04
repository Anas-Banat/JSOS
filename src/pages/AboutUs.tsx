
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutUsContent = () => {
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
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="section-title text-4xl font-bold text-jsos-green-700 mb-6">{t('aboutTitle')}</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('aboutContent')}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Vision & Mission Cards */}
            <div className="lg:col-span-1 flex flex-col justify-center">
              <div className="bg-gradient-to-br from-jsos-green-50 to-jsos-green-100 p-8 rounded-2xl shadow-lg border border-jsos-green-200 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-jsos-green-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-jsos-green-700">{t('visionTitle')}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{t('visionContent')}</p>
              </div>

              <div className="bg-gradient-to-br from-jsos-green-50 to-jsos-green-100 p-8 rounded-2xl shadow-lg border border-jsos-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-jsos-green-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-jsos-green-700">{t('missionTitle')}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{t('missionContent')}</p>
              </div>
            </div>

            {/* Main Image */}
            <div className="lg:col-span-2">
              <div className="relative h-full min-h-[600px]">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-jsos-green-500 to-jsos-red-500 opacity-20 blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80"  
                  alt="About JSOS" 
                  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Extended Content Sections */}
          <div className="space-y-8">
            {/* Jordan's Achievements */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-jsos-green-600 to-jsos-green-700 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div>{t('aboutJordanAchievementsTitle')}</div>
                  </div>
                </h3>
              </div>
              <div className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('aboutExtendedContent')}
                </p>
              </div>
            </div>

            {/* Foundation */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-jsos-green-600 to-jsos-green-700 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <div>{t('aboutFoundationTitle')}</div>
                  </div>
                </h3>
              </div>
              <div className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t('aboutFoundation')}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('aboutRole')}
                </p>
              </div>
            </div>

            {/* Scientific Meetings */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-jsos-green-600 to-jsos-green-700 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <div>{t('aboutScientificMeetingsTitle')}</div>
                  </div>
                </h3>
              </div>
              <div className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('aboutMeetings')}
                </p>
              </div>
            </div>

            {/* Necessity */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-jsos-green-600 to-jsos-green-700 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <div>{t('aboutNecessityTitle')}</div>
                  </div>
                </h3>
              </div>
              <div className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('aboutNecessity')}
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

const AboutUs = () => {
  return (
    <LanguageProvider>
      <AboutUsContent />
    </LanguageProvider>
  );
};

export default AboutUs;
