"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import React, { useState, useContext, useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DashboardContent = () => { 
  const { t, language } = useLanguage();
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Check if user can add/edit
  const canManage = user && userRole && ['admin', 'editor'].includes(userRole);

  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      
      // Check if user has proper role
      if (!userRole || !['admin', 'editor'].includes(userRole)) {
        toast({
          title: t('accessDenied'),
          description: t('notAuthorized'),
          variant: 'destructive',
        });
        navigate('/emp-portal');
        return;
      }
    } catch (error) {
      console.error('Error fetching user', error);
      toast({
        title: t('error'),
        description: t('tryAgain'),
        variant: 'destructive',
      });
      navigate('/emp-portal');
    } finally {
      setLoading(false);
    }
}, [navigate, loading, userRole]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="section-title text-4xl font-bold text-jsos-green-700 mb-6">{t('dashboard')}</h1>
          </div>
          
            <div className="bg-gray-1 dark:bg-dark py-10 sm:pb-20 ">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-4 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-2 px-10">
                  {/* Admin Accounts Management */}
                  {user && userRole === 'admin' && (            
                    <article className="group flex max-w-xl flex-col items-start justify-between px-5 bg-white dark:bg-gray-700 py-5 rounded-xl shadow-testimonial dark:shadow-none">
                      <div className="relative z-10 mx-auto mb-5 h-[100%] w-[100%] ">
                        <img
                          src="/images/dashboard/Admin.JPG"
                          alt={t('accountsManagement')}
                          height={400}
                          className="w-full rounded-xl h-[250px] group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        />
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg/6 font-semibold text-dark dark:text-white group-hover:text-blue">
                        <button onClick={() => navigate(`/dashboard/accounts-management`)}>{t('accountsManagement')}</button>
                        </h3>
                      </div>
                    </article>
                  )}

                  {/* Admin and Editor Dashboard */}
                  {canManage && (         
                    <>
                      <article className="group flex max-w-xl flex-col items-start justify-between px-5 bg-white dark:bg-gray-700 py-5 rounded-xl shadow-testimonial dark:shadow-none">
                        <div className="relative z-10 mx-auto mb-5 h-[100%] w-[100%] ">
                          <img
                            src="/images/dashboard/Add-News.JPG"
                            alt={t('addNews')}
                            height={400}
                            className="w-full rounded-xl h-[250px] group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg/6 font-semibold text-dark dark:text-white group-hover:text-blue">
                            <button onClick={() => navigate(`/dashboard/add-news`)}>{t('addNews')}</button>
                          </h3>
                        </div>
                      </article>
                      
                      <article className="group flex max-w-xl flex-col items-start justify-between px-5 bg-white dark:bg-gray-700 py-5 rounded-xl shadow-testimonial dark:shadow-none">
                          <div className="relative z-10 mx-auto mb-5 h-[100%] w-[100%] ">
                            <img
                              src="/images/dashboard/Event.jpg"
                              alt={t('addEvent')}
                              height={400}
                              className="w-full rounded-xl h-[250px] group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                          </div>
                          <div className="group relative">
                            <h3 className="mt-3 text-lg/6 font-semibold text-dark dark:text-white group-hover:text-blue">
                              <button onClick={() => navigate(`/add-events`)}>{t('addEvent')}</button>
                            </h3>
                          </div>
                        </article>

                        <article className="group flex max-w-xl flex-col items-start justify-between px-5 bg-white dark:bg-gray-700 py-5 rounded-xl shadow-testimonial dark:shadow-none">
                          <div className="relative z-10 mx-auto mb-5 h-[100%] w-[100%] ">
                            <img
                              src="/images/dashboard/Gellary.jpg"
                              alt={t('addGallery')}
                              height={400}
                              className="w-full rounded-xl h-[250px] group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                          </div>
                          <div className="group relative">
                            <h3 className="mt-3 text-lg/6 font-semibold text-dark dark:text-white group-hover:text-blue">
                              <button onClick={() => navigate(`/add-gallery`)}>{t('addGallery')}</button>
                            </h3>
                          </div>
                        </article>
                    </>
                  )}
                </div>
              </div>
            </div>
          <div>
        </div>

        </div>
      </main>
      <Footer />
    </div>

  );
};

const Dashboard = () => {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
};

export default Dashboard;
