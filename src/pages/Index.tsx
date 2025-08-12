import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Popup from '@/components/Popup';
import Organization from './organization/Organization';
import { useLanguage } from '@/contexts/LanguageContext';


const IndexContent = () => {
    const { t } = useLanguage();

  return (
    <>
      < Popup />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Hero />
          <Events />
          <h1 className="section-title text-center text-2xl font-bold text-jsos-green-700 m-8 lg:text-[30px]">{t('navOrgChart')}</h1>
          <Organization />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
