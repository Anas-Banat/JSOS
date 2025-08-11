import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isRTL = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md backdrop-blur-sm' : 'bg-transparent'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container-custom mx-auto flex items-center py-4 justify-between lg:mt30">
        {/* Logo */}
        <div className='flex'>
          <Link to="/" className="text-2xl font-bold text-jsos-green-700 inline-flex items-center">
            <img 
              src={language === 'ar' ? '/logo/Ar-logo.png' : '/logo/En-logo.png'}
              alt="JSOS Logo" 
              className="flex item-end w-16 h-16 lg:w-[70px] lg:h-[70px]"
            />
          </Link>
          <div className={`flex-nowrap flex-col mt-5`}>
            <p className='flex flex-none items-center gap-2 font-bold text-[8px] lg:text-[12px]'>Jordanian Society For Obesity Surgery </p>
            <p className='flex flex-none items-center gap-2 font-bold text-[12px] lg:text-[15px]'>جمعية جراحة السمنة الاردنية</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden lg:block flex `}>
          <nav className={`flex justify-center items-center gap-2`}>
            <Link 
              to="/" 
              className={`text-foreground hover:text-jsos-green-600 transition-colors px-3 py-2 ${isRTL ? 'text-right' : 'text-left'}`}
              style={{ textAlign: isRTL ? 'right' : 'left' }}
            >
              {t('navHome')}
            </Link>

            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger 
                className={`text-foreground hover:text-jsos-green-600 transition-colors px-3 py-2 bg-transparent hover:bg-transparent ${isRTL ? 'text-right' : 'text-left'} inline-flex items-center gap-1`}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {t('navAbout')}
                <ChevronDown className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent 
                className={cn(
                  "w-[200px] p-0",
                  isRTL ? "text-right" : "text-left"
                )}
                align={isRTL ? "end" : "start"}
                sideOffset={5}
              >
                <div className="flex flex-col">
                  <Link to="/about-us" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                  {t('navWelcome')}
                  </Link>
                  <Link to="/organization-chart" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navOrgChart')}
                  </Link>
                  <Link to="/jsos-bylaw" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navJsosBylaw')}
                  </Link>
                  <Link to="/contact" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navContact')}
                  </Link>

                </div>
              </HoverCardContent>
            </HoverCard>            

            
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger 
                className={`text-foreground hover:text-jsos-green-600 transition-colors px-3 py-2 bg-transparent hover:bg-transparent ${isRTL ? 'text-right' : 'text-left'} inline-flex items-center gap-1`}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {t('navCongress')}
                <ChevronDown className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent 
                className={cn(
                  "w-[220px] p-0",
                  isRTL ? "text-right" : "text-left"
                )}
                align={isRTL ? "end" : "start"}
                sideOffset={5}
              >
                <div className="flex flex-col">
                  <Link to="/first-congress" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navFirstCongress')}
                  </Link>
                  <Link to="/second-congress" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navSecondCongress')}
                  </Link>
                  <Link to="/third-congress" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navThirdCongress')}
                  </Link>
                  <Link to="/fourth-congress" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navFourthCongress')}
                  </Link>
                  <Link to="/fifth-congress" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navFifthCongress')}
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger 
                className={`text-foreground hover:text-jsos-green-600 transition-colors px-3 py-2 bg-transparent hover:bg-transparent ${isRTL ? 'text-right' : 'text-left'} inline-flex items-center gap-1`}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {t('navGuides')}
                <ChevronDown className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent 
                className={cn(
                  "w-[300px] p-0",
                  isRTL ? "text-right" : "text-left"
                )}
                align={isRTL ? "end" : "start"}
                sideOffset={5}
              >
                <div className="flex flex-col">
                  <Link to="/doctor-guidelines" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navDoctorGuidelines')}
                  </Link>
                  <Link to="/practical-recommendations" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navPracticalRecommendations')}
                  </Link>
                  <Link to="/european-guidelines" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navEuropeanGuidelines')}
                  </Link>
                  <Link to="/obesity-countries" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navObesityCountries')}
                  </Link>
                  <Link to="/nutritional-guidelines" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navNutritionalGuidelines')}
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger 
                className={`text-foreground hover:text-jsos-green-600 transition-colors px-3 py-2 bg-transparent hover:bg-transparent ${isRTL ? 'text-right' : 'text-left'} inline-flex items-center gap-1`}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {t('navObesity')}
                <ChevronDown className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent 
                className={cn(
                  "w-[200px] p-0",
                  isRTL ? "text-right" : "text-left"
                )}
                align={isRTL ? "end" : "start"}
                sideOffset={5}
              >
                <div className="flex flex-col">
                  <Link to="/bmi" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navBmi')}
                  </Link>
                  <Link to="/candidate" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navCandidate')}
                  </Link>
                  <Link to="/disease" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navDisease')}
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger 
                className={`text-foreground hover:text-jsos-green-600 transition-colors px-3 py-2 bg-transparent hover:bg-transparent ${isRTL ? 'text-right' : 'text-left'} inline-flex items-center gap-1`}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {t('navBariatricSurgery')}
                <ChevronDown className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent 
                className={cn(
                  "w-[250px] p-0",
                  isRTL ? "text-right" : "text-left"
                )}
                align={isRTL ? "end" : "start"}
                sideOffset={5}
              >
                <div className="flex flex-col">
                  <Link to="/gastric-banding" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navGastricBanding')}
                  </Link>
                  <Link to="/biliopancreatic" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navBilioPancreatic')}
                  </Link>
                  <Link to="/one-anastomosis" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navOneAnastomosis')}
                  </Link>
                  <Link to="/roux-en-y" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navRouxEnY')}
                  </Link>
                  <Link to="/sleeve-gastrectomy" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navSleeveGastrectomy')}
                  </Link>
                  <Link to="/clinical-trials" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navClinicalTrials')}
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger 
                className={`text-foreground hover:text-jsos-green-600 transition-colors px-3 py-2 bg-transparent hover:bg-transparent ${isRTL ? 'text-right' : 'text-left'} inline-flex items-center gap-1`}
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                {t('navMedia')}
                <ChevronDown className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent 
                className={cn(
                  "w-[250px] p-0",
                  isRTL ? "text-right" : "text-left"
                )}
                align={isRTL ? "end" : "start"}
                sideOffset={5}
              >
                <div className="flex flex-col">
                  <Link to="/news" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                  {t('navNews')}
                  </Link>
                  <Link to="/events" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                  {t('navEvents')}
                  </Link>
                  <Link to="/gallery" className="px-2 py-1.5 hover:bg-jsos-green-50 cursor-pointer">
                    {t('navGallery')}
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
          </nav>
        </div>

        {/* Language Toggle and Mobile Menu */}
        <div className="flex items-center justify-end">
          <Button 
            onClick={toggleLanguage} 
            variant="outline" 
            className="bg-white/20 backdrop-blur-sm p-2 text-[12px]"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ml-2 p-1">
            <Button 
              variant="ghost" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-0"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          className="lg:hidden bg-white/95 backdrop-blur-sm p-4 shadow-md max-h-[80vh] overflow-y-auto" 
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        >
          <nav className={`flex flex-col space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <Link to="/" className="text-foreground py-2 px-4 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navHome')}
            </Link>
            
            <div className="border-t border-gray-200 my-1"></div>
            <div className="py-2 px-4 text-jsos-green-700 font-medium">{t('navAbout')}</div>
            <Link to="/about-us" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
            {t('navWelcome')}
            </Link>
            <Link to="/organization-chart" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navOrgChart')}
            </Link>
            <Link to="/jsos-bylaw" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navJsosBylaw')}
            </Link>
            <Link to="/contact" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
            {t('navContact')}
            </Link>
            
            <div className="border-t border-gray-200 my-1"></div>
            <div className="py-2 px-4 text-jsos-green-700 font-medium">{t('navCongress')}</div>
            <Link to="/first-congress" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navFirstCongress')}
            </Link>
            <Link to="/second-congress" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navSecondCongress')}
            </Link>
            <Link to="/third-congress" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navThirdCongress')}
            </Link>
            <Link to="/fourth-congress" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navFourthCongress')}
            </Link>
            <Link to="/fifth-congress" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navFifthCongress')}
            </Link>
            
            <div className="border-t border-gray-200 my-1"></div>
            <div className="py-2 px-4 text-jsos-green-700 font-medium">{t('navGuides')}</div>
            <Link to="/doctor-guidelines" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navDoctorGuidelines')}
            </Link>
            <Link to="/practical-recommendations" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navPracticalRecommendations')}
            </Link>
            <Link to="/european-guidelines" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navEuropeanGuidelines')}
            </Link>
            <Link to="/obesity-countries" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navObesityCountries')}
            </Link>
            <Link to="/nutritional-guidelines" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navNutritionalGuidelines')}
            </Link>
            
            <div className="border-t border-gray-200 my-1"></div>
            <div className="py-2 px-4 text-jsos-green-700 font-medium">{t('navObesity')}</div>
            <Link to="/bmi" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navBmi')}
            </Link>
            <Link to="/candidate" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navCandidate')}
            </Link>
            <Link to="/disease" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navDisease')}
            </Link>
            
            <div className="border-t border-gray-200 my-1"></div>
            <div className="py-2 px-4 text-jsos-green-700 font-medium">{t('navBariatricSurgery')}</div>
            <Link to="/gastric-banding" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navGastricBanding')}
            </Link>
            <Link to="/biliopancreatic" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navBilioPancreatic')}
            </Link>
            <Link to="/one-anastomosis" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navOneAnastomosis')}
            </Link>
            <Link to="/roux-en-y" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navRouxEnY')}
            </Link>
            <Link to="/sleeve-gastrectomy" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navSleeveGastrectomy')}
            </Link>
            <Link to="/clinical-trials" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navClinicalTrials')}
            </Link>
            
            <div className="border-t border-gray-200 my-1"></div>
            <div className="py-2 px-4 text-jsos-green-700 font-medium">{t('navMedia')}</div>
            <Link to="/news" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navNews')}
            </Link>
            <Link to="/events" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navEvents')}
            </Link>
            <Link to="/gallery" className="text-foreground py-2 px-6 hover:bg-jsos-green-50 rounded" onClick={() => setIsMenuOpen(false)}>
              {t('navGallery')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
