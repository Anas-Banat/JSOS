import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { addNews } from '@/services/newsService';
import { uploadFile } from '@/services/fileService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from '@/components/ui/aspect-ratio';

const AddNews = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("english");
  
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
    
    if (!title || !date || !description || !photo) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload photo
      const uploadedFile = await uploadFile(photo);
      
      // Add news article with both languages
      await addNews({
        title,
        title_ar: titleAr,
        date,
        description,
        description_ar: descriptionAr,
        photo_url: uploadedFile.url,
        photo_name: uploadedFile.name
      });
      
      toast({
        description: 'News article added successfully!',
      });
      
      // Redirect to news page
      navigate('/news');
      
    } catch (error) {
      console.error('Error adding news article', error);
      toast({
        title: t('error'),
        description: t('tryAgain'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="form-container">
        <h2 className="text-2xl font-bold mb-6 text-news-primary text-center">
          {t('addNewsTitle')}
        </h2>
        
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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className={`w-full ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
          <TabsList className={`grid grid-cols-2 mb-4 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <TabsTrigger value="english" className='bg-news-primary text-white'>{t('EnglishContents')}</TabsTrigger>
              <TabsTrigger value="arabic" className='bg-news-primary text-white'>{t('ArabicContents')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="english" className={`space-y-6 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <div className="space-y-2">
                <Label htmlFor="title" className={`${language === 'ar' ? 'justify-end' : 'justify-start'}`}>{t('titleEnglish')}</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className={`${language === 'ar' ? 'justify-end' : 'justify-start'}`}>{t('descriptionEnglish')}</Label>
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
              <div className={`space-y-2 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                <Label htmlFor="title_ar" className={language === 'ar' ? 'text-right' : 'text-left'}>{t('titleArabic')}</Label>
                <Input
                  id="title_ar"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className={`space-y-6 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description_ar" className={`${language === 'ar' ? 'justify-end' : 'justify-start'}`}>{t('descriptionArabic')}</Label>
                <Textarea
                  id="description_ar"
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  rows={5}
                  className={`space-y-6 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}
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
                required
              />
            </div>
            
            {photoPreview && (
              <div className="mt-4">
                <AspectRatio ratio={16/9} className="bg-muted">
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    className="rounded-md object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-news-primary hover:bg-news-primary/90 text-white"
            >
              {isSubmitting ? t('loading') : t('submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
