
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Events = () => {
  const { t } = useLanguage();
  const animationRef = useRef<(() => void) | undefined>();

  useEffect(() => {
    animationRef.current = setupScrollAnimation();
    return () => {
      if (animationRef.current) {
        animationRef.current();
      }
    };
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
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
    },
    {
      id: 3,
      title: "International Conference on Bariatric Surgery",
      date: "2023-11-05",
      location: "Amman, Jordan",
      image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
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
    <section id="events" className="py-16 md:py-24 bg-jsos-green-50">
      <div className="container-custom mx-auto">
        <h2 className="section-title text-center animate-on-scroll mb-12">
          {t('eventsTitle')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="card-hover border-none overflow-hidden shadow-md animate-on-scroll">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{event.title}</h3>
                <div className="flex items-center text-jsos-green-700 mb-2">
                  <Calendar size={18} className="mr-2 flex-shrink-0" />
                  <span className="text-sm">{formatDate(event.date, 'ar')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2 flex-shrink-0" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <Button variant="link" className="text-jsos-green-600 hover:text-jsos-green-800 p-0 mt-4">
                  <Link to="/events" className="flex items-center">
                    {t('eventDetailsButton')}
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="border-jsos-green-600 text-jsos-green-700 hover:bg-jsos-green-50">
            <Link to="/events">
              {t('viewAll')}
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
