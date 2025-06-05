
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EventsContent = () => {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);

  // Sample upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: "5th Annual JSOS Congress",
      date: "2023-09-15",
      location: "Amman, Jordan",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Obesity Treatment Workshop",
      date: "2023-10-22",
      location: "Irbid, Jordan",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "International Conference on Bariatric Surgery",
      date: "2023-11-05",
      location: "Amman, Jordan",
      image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  // Sample past events data
  const pastEvents = [
    {
      id: 4,
      title: "4th Annual JSOS Congress",
      date: "2022-09-10",
      location: "Amman, Jordan",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 5,
      title: "Nutrition Symposium",
      date: "2022-07-15",
      location: "Dead Sea, Jordan",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
    },
    {
      id: 6,
      title: "Al-Kindi Workshop on Bariatric Surgery",
      date: "2022-05-20",
      location: "Amman, Jordan",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  // Function to format date based on language
  const formatDate = (dateString: string, language: 'ar' | 'en') => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString(language === 'ar' ? 'ar-JO' : 'en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title text-center animate-on-scroll">{t('eventsTitle')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden animate-on-scroll hover:shadow-xl transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <div className="flex items-center text-jsos-green-700 mb-2">
                    <Calendar size={18} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{formatDate(event.date, language)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <Button className="mt-4 w-full bg-jsos-green-600 hover:bg-jsos-green-700">
                    {t('eventDetailsButton')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <h2 className="section-subtitle mt-16 text-center animate-on-scroll">{t('pastEventsTitle')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden animate-on-scroll hover:shadow-lg transition-all">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center text-jsos-green-700 mb-2">
                    <Calendar size={16} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{formatDate(event.date, language)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <Button variant="outline" className="mt-3 w-full border-jsos-green-600 text-jsos-green-700 hover:bg-jsos-green-50">
                    {t('eventDetailsButton')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Events = () => {
  return (
    <LanguageProvider>
      <EventsContent />
    </LanguageProvider>
  );
};

export default Events;
