
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
              <div className="doctor-circle w-32 h-32 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="President" 
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl">Dr. Ahmad Al-Khateeb</h3>
              <p className="text-jsos-green-700">President</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-24 h-24 mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Vice President" 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Dr. Sarah Al-Hassan</h3>
                <p className="text-jsos-green-700">Vice President</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-24 h-24 mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                    alt="Secretary General" 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Dr. Khalid Mahmoud</h3>
                <p className="text-jsos-green-700">Secretary General</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-24 h-24 mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" 
                    alt="Treasurer" 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">Dr. Lama Al-Omari</h3>
                <p className="text-jsos-green-700">Treasurer</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-20 h-20 mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Board Member" 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">Dr. Omar Al-Jabri</h3>
                <p className="text-jsos-green-700">Board Member</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-20 h-20 mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Board Member" 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">Dr. Rania Al-Masri</h3>
                <p className="text-jsos-green-700">Board Member</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-20 h-20 mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1612531386530-97286d97c2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Board Member" 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">Dr. Fadi Al-Salem</h3>
                <p className="text-jsos-green-700">Board Member</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="doctor-circle w-20 h-20 mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Board Member" 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">Dr. Nour Al-Qasem</h3>
                <p className="text-jsos-green-700">Board Member</p>
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
