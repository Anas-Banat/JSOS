
import React, { useEffect, useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Image, FileText } from 'lucide-react';

const JsosMediaContent = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('photos');
  
  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);

  // Sample photos data
  const photos = [
    {
      id: 1,
      title: "Annual Conference 2023",
      date: "2023-04-15",
      url: "https://images.unsplash.com/photo-1576089073624-b5230c0bd559?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Bariatric Surgery Workshop",
      date: "2023-03-22",
      url: "https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
    },
    {
      id: 3,
      title: "Medical Team Meeting",
      date: "2023-02-10",
      url: "https://images.unsplash.com/photo-1593476123561-9516f2097158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    },
    {
      id: 4,
      title: "Public Awareness Campaign",
      date: "2023-01-05",
      url: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 5,
      title: "Board Member Election",
      date: "2022-12-12",
      url: "https://images.unsplash.com/photo-1551601651-bc60f254d532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
    },
    {
      id: 6,
      title: "Community Outreach",
      date: "2022-11-20",
      url: "https://images.unsplash.com/photo-1593476123561-9516f2097158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    }
  ];

  // Sample documents data
  const documents = [
    {
      id: 1,
      title: "Annual Report 2022",
      date: "2023-01-15",
      fileSize: "2.5 MB",
      type: "PDF"
    },
    {
      id: 2,
      title: "Research Paper: Bariatric Surgery Outcomes",
      date: "2023-03-10",
      fileSize: "1.8 MB",
      type: "PDF"
    },
    {
      id: 3,
      title: "Obesity Treatment Guidelines",
      date: "2022-11-05",
      fileSize: "3.2 MB",
      type: "PDF"
    },
    {
      id: 4,
      title: "JSOS Conference Proceedings",
      date: "2023-04-22",
      fileSize: "5.6 MB",
      type: "PDF"
    },
    {
      id: 5,
      title: "Nutritional Guidelines for Bariatric Patients",
      date: "2022-09-18",
      fileSize: "1.2 MB",
      type: "PDF"
    }
  ];

  // Format date based on selected language
  const formatDate = (dateString: string, lang: 'ar' | 'en') => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title text-center animate-on-scroll">{t('navJsosMedia')}</h1>
          
          <div className="flex justify-center mt-8 mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`px-6 py-3 text-sm font-medium border ${
                  activeTab === 'photos'
                    ? 'bg-jsos-green-600 text-white border-jsos-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-jsos-green-50'
                } rounded-s-lg`}
              >
                <div className="flex items-center">
                  <Image size={18} className="mr-2" />
                  Photos
                </div>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('documents')}
                className={`px-6 py-3 text-sm font-medium border ${
                  activeTab === 'documents'
                    ? 'bg-jsos-green-600 text-white border-jsos-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-jsos-green-50'
                } rounded-e-lg`}
              >
                <div className="flex items-center">
                  <FileText size={18} className="mr-2" />
                  Documents
                </div>
              </button>
            </div>
          </div>
          
          {activeTab === 'photos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative">
                    <img 
                      src={photo.url} 
                      alt={photo.title} 
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-bold">{photo.title}</h3>
                        <div className="flex items-center text-white/80 mt-1">
                          <Calendar size={16} className="mr-2" />
                          <span className="text-sm">{formatDate(photo.date, language)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'documents' && (
            <div className="space-y-4 animate-on-scroll">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-white rounded-lg shadow-md p-6 flex items-center hover:shadow-lg transition-all">
                  <div className="bg-jsos-red-100 p-3 rounded-full mr-4">
                    <FileText className="text-jsos-red-600" size={24} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{doc.title}</h3>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{formatDate(doc.date, language)}</span>
                      <span className="text-sm mx-2">•</span>
                      <span className="text-sm">{doc.fileSize}</span>
                      <span className="text-sm mx-2">•</span>
                      <span className="text-sm">{doc.type}</span>
                    </div>
                  </div>
                  <Button className="bg-jsos-green-600 hover:bg-jsos-green-700">
                    {t('downloadPdf')}
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="border-jsos-green-600 text-jsos-green-700 hover:bg-jsos-green-50">
              Load More
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const JsosMedia = () => {
  return (
    <LanguageProvider>
      <JsosMediaContent />
    </LanguageProvider>
  );
};

export default JsosMedia;
