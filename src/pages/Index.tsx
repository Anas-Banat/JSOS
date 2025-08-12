import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Popup from '@/components/Popup';


const IndexContent = () => {

  return (
    <>
      < Popup />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Hero />
          <Events />
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
