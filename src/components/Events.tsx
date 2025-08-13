
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { eventService } from "../services/eventService";
import { Event } from "../types/event";



const Events = () => {
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const animationRef = useRef<(() => void) | undefined>();
  const [loading, setLoading] = useState(true);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPagePast, setCurrentPagePast] = useState(1);
  const eventsPerPage = 12;
  const { language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    animationRef.current = setupScrollAnimation();
    return () => {
      if (animationRef.current) {
        animationRef.current();
      }
    };
  }, []);

  // Function to format date based on language
  const formatDate = (dateString: string, language: 'ar' | 'en') => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
      const fetchEvents = async () => {
        try {
          const data = await eventService.getAllEvents();
          setEvents(data);
        } catch (error) {
          console.error("Error fetching events:", error);
          toast({
            title: language === 'ar' ? "خطأ" : "Error",
            description: language === 'ar' ? "فشل في تحميل الأحداث" : "Failed to load events",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
  
      fetchEvents();
    }, [language, toast]);

   // تقسيم الأحداث
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter(event => new Date(event.date) >= today);
  const pastEvents = events.filter(event => new Date(event.date) < today);

  // Pagination للأحداث القادمة
  const totalPagesUpcoming = Math.ceil(upcomingEvents.length / eventsPerPage);
  const paginatedUpcoming = upcomingEvents.slice((currentPageUpcoming - 1) * eventsPerPage, currentPageUpcoming * eventsPerPage);
  // Pagination للأحداث السابقة
  const totalPagesPast = Math.ceil(pastEvents.length / eventsPerPage);
  const paginatedPast = pastEvents.slice((currentPagePast - 1) * eventsPerPage, currentPagePast * eventsPerPage);


  return (
    <section id="events" className="py-16 md:py-24 bg-jsos-green-50">
      <div className="container-custom mx-auto">
        <h2 className="section-title text-center mb-12">
          {t('eventsTitle')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="card-hover border-none overflow-hidden shadow-md ">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.photo_url} 
                  alt={language === 'ar' ? event.title_ar : event.title || event.title_ar}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{language === 'ar' ? event.title_ar : event.title || event.title_ar}</h3>
                <div className="flex items-center text-jsos-green-700 mb-2">
                  <Calendar size={18} className="mr-2 flex-shrink-0" />
                  <span className="text-sm">{formatDate(event.date, 'ar')}</span>
                </div>
                <Button variant="link" className="text-jsos-green-600 hover:text-jsos-green-800 p-0 mt-4">
                  <Link to={`/events/${event.id}`} className="flex items-center">
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
