import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ImageIcon, Calendar } from "lucide-react";
import { galleryService } from "@/services/galleryService";
import { Gallery } from "@/types/gallery";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GalleryPageContent = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [coverPhotoUrls, setCoverPhotoUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const galleriesPerPage = 12;
  const { t, language } = useLanguage();
  const { user, userRole } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await galleryService.getAllGalleries();
        setGalleries(data);
        // Fetch cover photo URLs for galleries with cover_photo_id
        const coverIds = data.filter(g => g.cover_photo_id).map(g => g.cover_photo_id);
        if (coverIds.length > 0) {
            const { data: photos, error } = await supabase
            .from('gallery_photos')
            .select('id, photo_url')
            .in('id', coverIds);
          if (!error && photos) {
            const urlMap: Record<string, string> = {};
            for (const photo of photos) {
              urlMap[photo.id] = photo.photo_url;
            }
            setCoverPhotoUrls(urlMap);
          }
        }
      } catch (error) {
        console.error("Error fetching galleries:", error);
        toast({
          title: language === 'ar' ? "خطأ" : "Error",
          description: language === 'ar' ? "فشل في تحميل المعرض" : "Failed to load galleries",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, [language, toast]);

  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);

  const canCreateGallery = user && userRole && (userRole === 'admin' || userRole === 'editor');

  // حساب عدد الصفحات
  const totalPages = Math.ceil(galleries.length / galleriesPerPage);
  // المعارض الخاصة بالصفحة الحالية
  const paginatedGalleries = galleries.slice((currentPage - 1) * galleriesPerPage, currentPage * galleriesPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="section-title text-4xl font-bold text-jsos-green-700 mb-6">{t('navGallery')}</h1>
          </div>

            {loading ? (
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
            ) : (
              <div className="container mx-auto max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                  {canCreateGallery && (
                    <Button asChild>
                      <Link to="/add-gallery">
                        <Plus className="mr-2 h-4 w-4" />
                        {language === 'ar' ? 'إضافة معرض' : 'Add Gallery'}
                      </Link>
                    </Button>
                  )}
                </div>

                {galleries.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {language === 'ar' ? 'لا توجد معارض' : 'No Galleries'}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {language === 'ar' ? 'لم يتم إنشاء أي معارض بعد.' : 'No galleries have been created yet.'}
                    </p>
                    {canCreateGallery && (
                      <Button asChild>
                        <Link to="/add-gallery">
                          <Plus className="mr-2 h-4 w-4" />
                          {language === 'ar' ? 'إضافة أول معرض' : 'Add First Gallery'}
                        </Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 leading-relaxedanimate-on-scroll">
                    {paginatedGalleries.map((gallery) => (
                      <Card key={gallery.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          {gallery.cover_photo_id && coverPhotoUrls[gallery.cover_photo_id] ? (
                            <img src={coverPhotoUrls[gallery.cover_photo_id]} alt="cover" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                          ) : (
                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                          )}
                        </div>
                        
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                            {language === 'ar' ? gallery.title_ar : gallery.title || gallery.title_ar}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {language === 'ar' ? gallery.description_ar : gallery.description || gallery.description_ar}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(gallery.created_at).toLocaleDateString('en-US')}
                            </div>
                            
                            <Button size="sm" asChild>
                              <Link to={`/gallery/${gallery.id}`}>
                                {language === 'ar' ? 'عرض' : 'View'}
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* أزرار التنقل بين الصفحات */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <Button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        {language === 'ar' ? 'السابق' : 'Previous'}
                      </Button>
                      <span>
                        {language === 'ar' ? 'صفحة' : 'Page'} {currentPage} {language === 'ar' ? 'من' : 'of'} {totalPages}
                      </span>
                      <Button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        {language === 'ar' ? 'التالي' : 'Next'}
                      </Button>
                    </div>
                  )}
                  </>
                )}
              </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
const GalleryPage = () => {
  return (
    <LanguageProvider>
      <GalleryPageContent />
    </LanguageProvider>
  );
};

export default GalleryPage;