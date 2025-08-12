import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2, Calendar, X } from "lucide-react";
import { galleryService } from "@/services/galleryService";
import { Gallery, GalleryPhoto } from "@/types/gallery";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const GalleryDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const { t, language } = useLanguage();
  const { user, userRole } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);

  useEffect(() => {
    const fetchGalleryData = async () => {
      if (!id) return;

      try {
        const [galleryData, photosData] = await Promise.all([
          galleryService.getGalleryById(id),
          galleryService.getGalleryPhotos(id)
        ]);
        
        setGallery(galleryData);
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        toast({
          title: language === 'ar' ? "خطأ" : "Error",
          description: language === 'ar' ? "فشل في تحميل المعرض" : "Failed to load gallery",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [id, language, toast]);

  const handleDelete = async () => {
    if (!gallery) return;

    try {
      await galleryService.deleteGallery(gallery.id);
      toast({
        title: language === 'ar' ? "تم الحذف" : "Deleted",
        description: language === 'ar' ? "تم حذف المعرض بنجاح" : "Gallery deleted successfully",
      });
      navigate("/gallery");
    } catch (error) {
      console.error("Error deleting gallery:", error);
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "فشل في حذف المعرض" : "Failed to delete gallery",
        variant: "destructive",
      });
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    try {
      await galleryService.deleteGalleryPhoto(photoId);
      setPhotos(photos.filter(photo => photo.id !== photoId));
      toast({
        title: language === 'ar' ? "تم الحذف" : "Deleted",
        description: language === 'ar' ? "تم حذف الصورة بنجاح" : "Photo deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' ? "فشل في حذف الصورة" : "Failed to delete photo",
        variant: "destructive",
      });
    }
  };

  const canEdit = user && userRole && gallery && (
    userRole === 'admin' || 
    (userRole === 'editor' && gallery.author_id === user.id)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">

            {loading ? (
                <div className="container mx-auto">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">
                      {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                    </p>
                  </div>
                </div>
            ) : !gallery ? (
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
            ) : (
              <div className="container mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/gallery">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {language === 'ar' ? 'العودة للمعرض' : 'Back to Gallery'}
                    </Link>
                  </Button>
                  
                  {canEdit && (
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link to={`/edit-gallery/${gallery.id}`}>
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
                                ? 'هل أنت متأكد من حذف هذا المعرض؟ سيتم حذف جميع الصور أيضاً. لا يمكن التراجع عن هذا الإجراء.'
                                : 'Are you sure you want to delete this gallery? All photos will also be deleted. This action cannot be undone.'
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

                <Card className="mb-8 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {language === 'ar' ? gallery.title_ar : gallery.title || gallery.title_ar}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(gallery.created_at).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {language === 'ar' ? gallery.description_ar : gallery.description || gallery.description_ar}
                    </div>
                  </CardContent>
                </Card>

                {photos.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      {language === 'ar' ? 'لا توجد صور في هذا المعرض' : 'No photos in this gallery'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative group">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer">
                              <img
                                src={photo.photo_url}
                                alt={language === 'ar' ? photo.title_ar || '' : photo.title || photo.title_ar || ''}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                            <div className="relative">
                              <img
                                src={photo.photo_url}
                                alt={language === 'ar' ? photo.title_ar || '' : photo.title || photo.title_ar || ''}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {canEdit && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeletePhoto(photo.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
          )} 
        </div>
      </main>
      <Footer />
    </div>
  );
};

const GalleryDetail = () => {
  return (
    <LanguageProvider>
      <GalleryDetailContent />
    </LanguageProvider>
  );
};

export default GalleryDetail;