import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Calendar as CalendarIcon, Upload, Save } from "lucide-react";
import { eventService } from "../../services/eventService";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AddEvent = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [titleAr, setTitleAr] = useState("");
  const [title, setTitle] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>();
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titleAr || !descriptionAr || !date) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const eventData = {
        title_ar: titleAr,
        title: title || undefined,
        description_ar: descriptionAr,
        description: description || undefined,
        photo: photo || undefined,
        date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      };

      await eventService.createEvent(eventData);
      
      toast({
        title: language === 'ar' ? "تم النشر" : "Published",
        description: language === 'ar' ? "تم نشر الحدث بنجاح" : "Event published successfully",
      });
      
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "فشل في نشر الحدث" : "Failed to publish event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/conferences">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'العودة للأحداث' : 'Back to Events'}
            </Link>
          </Button>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {language === 'ar' ? 'إضافة حدث جديد' : 'Add New Event'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="titleAr" className="text-sm font-medium">
                  {language === 'ar' ? 'العنوان (بالعربية) *' : 'Title (Arabic) *'}
                </Label>
                <Input
                  id="titleAr"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل العنوان بالعربية' : 'Enter title in Arabic'}
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  {language === 'ar' ? 'العنوان (بالإنجليزية)' : 'Title (English)'}
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل العنوان بالإنجليزية (اختياري)' : 'Enter title in English (optional)'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionAr" className="text-sm font-medium">
                  {language === 'ar' ? 'الوصف (بالعربية) *' : 'Description (Arabic) *'}
                </Label>
                <Textarea
                  id="descriptionAr"
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل وصف الحدث بالعربية' : 'Enter event description in Arabic'}
                  className="min-h-[120px] text-right"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  {language === 'ar' ? 'الوصف (بالإنجليزية)' : 'Description (English)'}
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل وصف الحدث بالإنجليزية (اختياري)' : 'Enter event description in English (optional)'}
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {language === 'ar' ? 'تاريخ الحدث *' : 'Event Date *'}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>{language === 'ar' ? 'اختر التاريخ' : 'Pick a date'}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo" className="text-sm font-medium">
                  {language === 'ar' ? 'صورة الحدث' : 'Event Photo'}
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="flex-1"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                {photo && (
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'تم اختيار: ' : 'Selected: '}{photo.name}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {loading 
                    ? (language === 'ar' ? 'جاري النشر...' : 'Publishing...') 
                    : (language === 'ar' ? 'نشر الحدث' : 'Publish Event')
                  }
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/events">
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddEvent;