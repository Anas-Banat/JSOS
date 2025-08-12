import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus } from "lucide-react";
import { eventService } from "../../services/eventService";
import { Event } from "../../types/event";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPagePast, setCurrentPagePast] = useState(1);
  const eventsPerPage = 12;
  const { language } = useLanguage();
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

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

  const canAddEvent = user && userRole && (userRole === 'admin' || userRole === 'editor');

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {language === 'ar' ? 'الأحداث' : 'Events'}
          </h1>
          {canAddEvent && (
            <Button asChild className="gap-2">
              <Link to="/add-conference">
                <Plus className="h-4 w-4" />
                {language === 'ar' ? 'إضافة حدث' : 'Add Event'}
              </Link>
            </Button>
          )}
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {language === 'ar' ? 'لا توجد أحداث' : 'No Events'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'لم يتم نشر أي أحداث بعد.' : 'No events have been published yet.'}
            </p>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={val => setActiveTab(val as "upcoming" | "past")} className="w-full mb-8">
            <TabsList 
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                className={`grid grid-cols-2 mb-4 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}
                >   
              <TabsTrigger value="upcoming" className="bg-primary text-white">{language === 'ar' ? 'الأحداث القادمة' : 'Upcoming Events'}</TabsTrigger>
              <TabsTrigger value="past" className="bg-primary text-white">{language === 'ar' ? 'الأحداث السابقة' : 'Past Events'}</TabsTrigger>
            </TabsList>
            <TabsContent 
                value="upcoming"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                className={`${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
              {paginatedUpcoming.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'ar' ? 'لا توجد أحداث قادمة' : 'No upcoming events'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedUpcoming.map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                        <Link to={`/events/${event.id}`}>
                          {event.photo_url && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={event.photo_url}
                                alt={language === 'ar' ? event.title_ar : event.title || event.title_ar}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <CardHeader className="pb-3">
                            <CardTitle className="line-clamp-2 text-lg">
                              {language === 'ar' ? event.title_ar : event.title || event.title_ar}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-3 mb-4">
                              {language === 'ar' ? event.description_ar : event.description || event.description_ar}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>
                                {new Date(event.date).toLocaleDateString(
                                  language === 'ar' ? 'ar-SA' : 'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  }
                                )}
                              </span>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                  {/* أزرار التنقل للأحداث القادمة */}
                  {totalPagesUpcoming > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <Button
                        onClick={() => setCurrentPageUpcoming((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPageUpcoming === 1}
                      >
                        {language === 'ar' ? 'السابق' : 'Previous'}
                      </Button>
                      <span>
                        {language === 'ar' ? 'صفحة' : 'Page'} {currentPageUpcoming} {language === 'ar' ? 'من' : 'of'} {totalPagesUpcoming}
                      </span>
                      <Button
                        onClick={() => setCurrentPageUpcoming((prev) => Math.min(prev + 1, totalPagesUpcoming))}
                        disabled={currentPageUpcoming === totalPagesUpcoming}
                      >
                        {language === 'ar' ? 'التالي' : 'Next'}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            <TabsContent 
                value="past"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
                className={`${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
              {paginatedPast.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'ar' ? 'لا توجد أحداث سابقة' : 'No past events'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedPast.map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                        <Link to={`/events/${event.id}`}>
                          {event.photo_url && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={event.photo_url}
                                alt={language === 'ar' ? event.title_ar : event.title || event.title_ar}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <CardHeader className="pb-3">
                            <CardTitle className="line-clamp-2 text-lg">
                              {language === 'ar' ? event.title_ar : event.title || event.title_ar}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-3 mb-4">
                              {language === 'ar' ? event.description_ar : event.description || event.description_ar}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>
                                {new Date(event.date).toLocaleDateString(
                                  language === 'ar' ? 'ar-SA' : 'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  }
                                )}
                              </span>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                  {/* أزرار التنقل للأحداث السابقة */}
                  {totalPagesPast > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <Button
                        onClick={() => setCurrentPagePast((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPagePast === 1}
                      >
                        {language === 'ar' ? 'السابق' : 'Previous'}
                      </Button>
                      <span>
                        {language === 'ar' ? 'صفحة' : 'Page'} {currentPagePast} {language === 'ar' ? 'من' : 'of'} {totalPagesPast}
                      </span>
                      <Button
                        onClick={() => setCurrentPagePast((prev) => Math.min(prev + 1, totalPagesPast))}
                        disabled={currentPagePast === totalPagesPast}
                      >
                        {language === 'ar' ? 'التالي' : 'Next'}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Events;