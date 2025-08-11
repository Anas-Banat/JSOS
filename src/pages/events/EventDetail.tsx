import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Edit, Trash2, Clock } from "lucide-react";
import { eventService } from "../../services/eventService";
import { Event } from "../../types/event";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const { user, userRole } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      try {
        const data = await eventService.getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast({
          title: language === 'ar' ? "خطأ" : "Error",
          description: language === 'ar' ? "فشل في تحميل الحدث" : "Failed to load event",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, language, toast]);

  const handleDelete = async () => {
    if (!event) return;

    try {
      await eventService.deleteEvent(event.id);
      toast({
        title: language === 'ar' ? "تم الحذف" : "Deleted",
        description: language === 'ar' ? "تم حذف الحدث بنجاح" : "Event deleted successfully",
      });
      navigate("/events");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "فشل في حذف الحدث" : "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const canEdit = user && userRole && event && (
    userRole === 'admin' || 
    (userRole === 'editor' && event.author_id === user.id)
  );

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

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
        <div className="container mx-auto">
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {language === 'ar' ? 'الحدث غير موجود' : 'Event Not Found'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === 'ar' ? 'الحدث المطلوب غير موجود.' : 'The requested event was not found.'}
            </p>
            <Button asChild>
              <Link to="/conferences">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'ar' ? 'العودة للأحداث' : 'Back to Events'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link to="/conferences">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'العودة للأحداث' : 'Back to Events'}
            </Link>
          </Button>
          
          {canEdit && (
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/edit-conferences/${event.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </Link>
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    {language === 'ar' ? 'حذف' : 'Delete'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {language === 'ar' ? 'تأكيد الحذف' : 'Confirm Deletion'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                    {language === 'ar' 
                      ? 'هل أنت متأكد من حذف هذا الحدث؟ لا يمكن التراجع عن هذا الإجراء.'
                      : 'Are you sure you want to delete this event? This action cannot be undone.'
                    }
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      {language === 'ar' ? 'حذف' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <Card className="overflow-hidden border-0 shadow-lg">
          {event.photo_url && (
            <div className="aspect-video overflow-hidden">
              <img
                src={event.photo_url}
                alt={language === 'ar' ? event.title_ar : event.title || event.title_ar}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardContent className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {language === 'ar' ? event.title_ar : event.title || event.title_ar}
              </h1>
              
              <div className="flex items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
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
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {language === 'ar' ? event.description_ar : event.description || event.description_ar}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDetail;