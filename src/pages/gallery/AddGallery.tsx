import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Save, X } from "lucide-react";
import { galleryService } from "@/services/galleryService";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AddGallery = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [titleAr, setTitleAr] = useState("");
  const [title, setTitle] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState<number | null>(null);

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titleAr || !descriptionAr) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (photos.length === 0) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "يرجى رفع صورة واحدة على الأقل" : "Please upload at least one photo",
        variant: "destructive",
      });
      return;
    }

    if (coverPhotoIndex === null) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "يرجى اختيار صورة غلاف" : "Please select a cover photo",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const galleryData = {
        title_ar: titleAr,
        title: title || undefined,
        description_ar: descriptionAr,
        description: description || undefined,
        photos: photos,
        coverPhotoIndex: coverPhotoIndex,
      };

      const newGallery = await galleryService.createGallery(galleryData);
      
      toast({
        title: language === 'ar' ? "تم النشر" : "Published",
        description: language === 'ar' ? "تم نشر المعرض بنجاح" : "Gallery published successfully",
      });
      
      navigate(`/gallery/${newGallery.id}`);
    } catch (error) {
      console.error("Error creating gallery:", error);
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "فشل في نشر المعرض" : "Failed to publish gallery",
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
            <Link to="/gallery">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'العودة للمعرض' : 'Back to Gallery'}
            </Link>
          </Button>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {language === 'ar' ? 'إضافة معرض جديد' : 'Add New Gallery'}
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
                  placeholder={language === 'ar' ? 'أدخل عنوان المعرض بالعربية' : 'Enter gallery title in Arabic'}
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
                  placeholder={language === 'ar' ? 'أدخل عنوان المعرض بالإنجليزية (اختياري)' : 'Enter gallery title in English (optional)'}
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
                  placeholder={language === 'ar' ? 'أدخل وصف المعرض بالعربية' : 'Enter gallery description in Arabic'}
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
                  placeholder={language === 'ar' ? 'أدخل وصف المعرض بالإنجليزية (اختياري)' : 'Enter gallery description in English (optional)'}
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photos" className="text-sm font-medium">
                  {language === 'ar' ? 'صور المعرض' : 'Gallery Photos'}
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotosChange}
                    className="flex-1"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                
                {photos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      {language === 'ar' ? 'الصور المختارة:' : 'Selected photos:'}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={photo.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                            onClick={() => removePhoto(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          <div className="absolute bottom-2 left-2">
                            <label className="flex items-center gap-1 cursor-pointer bg-white/80 rounded px-2 py-1 text-xs">
                              <input
                                type="radio"
                                name="coverPhoto"
                                checked={coverPhotoIndex === index}
                                onChange={() => setCoverPhotoIndex(index)}
                              />
                              {language === 'ar' ? 'غلاف' : 'Cover'}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                    : (language === 'ar' ? 'نشر المعرض' : 'Publish Gallery')
                  }
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/gallery">
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

export default AddGallery;