import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getNewsById, updateNews, canEditNews } from '@/services/newsService';
import { uploadFile } from '@/services/fileService';
import { NewsArticle } from '@/types/news';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const EditNews = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("english");
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Check if user has proper role
        if (!userRole || !['admin', 'editor'].includes(userRole)) {
          toast({
            title: t('accessDenied'),
            description: t('notAuthorized'),
            variant: 'destructive',
          });
          navigate('/news');
          return;
        }
        
        // Check if user can edit this article
        const hasPermission = await canEditNews(id);
        if (!hasPermission) {
          toast({
            title: t('accessDenied'),
            description: "You don't have permission to edit this article",
            variant: 'destructive',
          });
          navigate('/news');
          return;
        }
        
        const article = await getNewsById(id);
        if (article) {
          setTitle(article.title || '');
          setTitleAr(article.title_ar || '');
          setDate(article.date);
          setDescription(article.description || '');
          setDescriptionAr(article.description_ar || '');
          setPhotoUrl(article.photoUrl || article.photo_url || null);
          setPhotoPreview(article.photoUrl || article.photo_url || null);
        } else {
          navigate('/news');
        }
      } catch (error) {
        console.error('Error fetching article', error);
        toast({
          title: t('error'),
          description: t('tryAgain'),
          variant: 'destructive',
        });
        navigate('/news');
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, navigate, t, userRole, language]); // Add currentLanguage as dependency
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an image
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: t('error'),
          description: t('invalidFileType'),
          variant: 'destructive',
        });
        return;
      }
      
      setPhoto(selectedFile);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !description) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: 'destructive',
      });
      return;
    }
    
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      let uploadedFile = { url: photoUrl, name: '' };
      
      // Upload photo if changed
      if (photo) {
        uploadedFile = await uploadFile(photo);
      }
      
      // Update news article
      await updateNews(id, {
        title,
        title_ar: titleAr,
        date,
        description,
        description_ar: descriptionAr,
        photo_url: uploadedFile.url,
        photo_name: uploadedFile.name || undefined
      });
      
      toast({
        description: 'News article updated successfully!',
      });
      
      // Redirect to news detail
      navigate(`/news/${id}`);
      
    } catch (error) {
      console.error('Error updating news article', error);
      toast({
        title: t('error'),
        description: t('tryAgain'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>{t('loading')}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="form-container">
      <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('navBilioPancreatic')}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date" className={language === 'ar' ? 'text-right' : 'text-left'}>{t('newsDate')}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="english" className='bg-news-primary text-white'>{t('EnglishContents')}</TabsTrigger>
              <TabsTrigger value="arabic" className='bg-news-primary text-white'>{t('ArabicContents')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="english" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className={language === 'ar' ? 'text-right' : 'text-left'}>{t('titleEnglish')}</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className={language === 'ar' ? 'text-right' : 'text-left'}>{t('descriptionEnglish')}</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="arabic" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title_ar" className={language === 'ar' ? 'text-right' : 'text-left'}>{t('titleArabic')}</Label>
                <Input
                  id="title_ar"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="text-right"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description_ar" className={language === 'ar' ? 'text-right' : 'text-left'}>{t('descriptionArabic')}</Label>
                <Textarea
                  id="description_ar"
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  rows={5}
                  className="text-right"
                  dir="rtl"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="space-y-2">
            <Label htmlFor="photo" className={language === 'ar' ? 'text-right' : 'text-left'}>{t('newsPhoto')}</Label>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full"
              />
            </div>
            
            {photoPreview && (
              <div className="mt-4">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="rounded-md object-contain max-h-[300px] mx-auto"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate(`/news/${id}`)}
            >
              {t('Cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-news-primary hover:bg-news-primary/90 text-white"
            >
              {isSubmitting ? t('loading') : t('Update')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
