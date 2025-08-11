import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Gallery } from "@/types/gallery";

const EditGallery = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [titleAr, setTitleAr] = useState("");
  const [title, setTitle] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      if (!id) return;

      try {
        const data = await galleryService.getGalleryById(id);
        if (data) {
          setGallery(data);
          setTitleAr(data.title_ar);
          setTitle(data.title || "");
          setDescriptionAr(data.description_ar);
          setDescription(data.description || "");
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
        toast({
          title: language === 'ar' ? "خطأ" : "Error",
          description: language === 'ar' ? "فشل في تحميل المعرض" : "Failed to load gallery",
          variant: "destructive",
        });
        navigate("/gallery");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchGallery();
  }, [id, language, toast, navigate]);

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos([...photos, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titleAr || !descriptionAr || !id) {
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
      const galleryData = {
        title_ar: titleAr,
        title: title || undefined,
        description_ar: descriptionAr,
        description: description || undefined,
        photos: photos.length > 0 ? photos : undefined,
      };

      await galleryService.updateGallery(id, galleryData);
      
      toast({
        title: language === 'ar' ? "تم التحديث" : "Updated",
        description: language === 'ar' ? "تم تحديث المعرض بنجاح" : "Gallery updated successfully",
      });
      
      navigate(`/gallery/${id}`);
    } catch (error) {
      console.error("Error updating gallery:", error);
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "فشل في تحديث المعرض" : "Failed to update gallery",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
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

  if (!gallery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
        <div className="container mx-auto">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">
              {language === 'ar' ? 'المعرض غير موجود' : 'Gallery Not Found'}
            </h3>
            <Button asChild>
              <Link to="/gallery">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'ar' ? 'العودة للمعرض' : 'Back to Gallery'}
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
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to={`/gallery/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'العودة للمعرض' : 'Back to Gallery'}
            </Link>
          </Button>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {language === 'ar' ? 'تعديل المعرض' : 'Edit Gallery'}
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
                  {language === 'ar' ? 'إضافة صور جديدة' : 'Add New Photos'}
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
                      {language === 'ar' ? 'الصور الجديدة:' : 'New photos:'}
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
                    ? (language === 'ar' ? 'جاري التحديث...' : 'Updating...') 
                    : (language === 'ar' ? 'تحديث المعرض' : 'Update Gallery')
                  }
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to={`/gallery/${id}`}>
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

export default EditGallery;