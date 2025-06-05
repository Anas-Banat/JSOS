
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-jsos-green-900 text-white py-12">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/1a255b67-2187-46dc-a20b-9da450f40a26.png" 
                alt="JSOS Logo" 
                className="h-12 me-2 bg-white rounded-full p-1" 
              />
              {/* <span className="font-bold text-xl">{t('websiteAcronym')}</span> */}
            </Link>
            <p className="text-white/80 text-sm mb-4">
              {t('overviewContent')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-white hover:text-jsos-red-400 transition-colors p-2 rounded-full bg-jsos-green-800/50 hover:bg-jsos-green-800">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-jsos-red-400 transition-colors p-2 rounded-full bg-jsos-green-800/50 hover:bg-jsos-green-800">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-jsos-red-400 transition-colors p-2 rounded-full bg-jsos-green-800/50 hover:bg-jsos-green-800">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">{t('navGuides')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jsos-bylaw" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('navJsosBylaw')}
                </Link>
              </li>
              <li>
                <Link to="/doctor-guidelines" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('navDoctorGuidelines')}
                </Link>
              </li>
              <li>
                <Link to="/practical-recommendations" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('navPracticalRecommendations')}
                </Link>
              </li>
              <li>
                <Link to="/european-guidelines" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('navEuropeanGuidelines')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links - Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">{t('navBariatricSurgery')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gastric-banding" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('navGastricBanding')}
                </Link>
              </li>
              <li>
                <Link to="/biliopancreatic" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('navBilioPancreatic')}
                </Link>
              </li>
              <li>
                <Link to="/one-anastomosis" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('navOneAnastomosis')}
                </Link>
              </li>
              <li>
                <Link to="/roux-en-y" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('navRouxEnY')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">{t('navContact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-jsos-red-400 flex-shrink-0 mt-1" />
                <span className="text-white/80 text-sm">
                  {t('footerAddress')}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-jsos-red-400" />
                <span className="text-white/80 text-sm">
                  +962 6 1234567
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-jsos-red-400" />
                <span className="text-white/80 text-sm">
                  info@jsos.org
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/80 text-sm">{t('footerText')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
