
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getNewsById } from '@/services/newsService';
import { NewsArticle } from '@/types/news';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NewsDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user, userRole } = useAuth();
  
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const foundArticle = await getNewsById(id);
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          navigate('/news');
        }
      } catch (error) {
        console.error('Error fetching article', error);
        navigate('/news');
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, navigate, language]);
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>{t('loading')}</p>
      </div>
    );
  }
  
  if (!article) {
    return null;
  }

  // Determine which content to show based on current language
  const title = language === 'ar' && article.title_ar ? article.title_ar : article.title;
  const description = language === 'ar' && article.description_ar ? article.description_ar : article.description;
  
  // Check if user can edit (admin can edit any article)
  const canEdit = user && userRole && (
    userRole === 'admin' || userRole === 'editor'

    // editor can edit their own
    //(userRole === 'editor' && article.author_id === user.id)
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">

          <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                onClick={() => navigate('/news')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t('allNews')}</span>
              </Button>
              
              {canEdit && (
                <Button
                  variant="outline"
                  onClick={() => navigate(`/edit-news/${id}`)}
                  className="flex items-center gap-2 bg-blue text-white dark:bg-dark dark:text-white dark:hover:bg-blue hover:text-white hover:bg-news-primary "
                >
                  <Edit className="h-4 w-4" />
                  <span>{t('edit')}</span>
                </Button>
              )}
            </div>
            
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative bg-muted">
                <img 
                  src={article.photoUrl || article.photo_url} 
                  alt={title}
                  className="w-full h-auto object-contain max-h-[500px]" 
                />
              </div>
              
              <div className="p-6 md:p-8">
                <h1 className="text-3xl font-bold text-news-primary mb-4">
                  {title}
                </h1>
                
                <p className="text-gray-500 mb-6">
                  {new Date(article.date).toLocaleDateString()}
                </p>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>

    
  );
};

const NewsDetail = () => {
  return (
    <LanguageProvider>
      <NewsDetailContent />
    </LanguageProvider>
  );
};

export default NewsDetail;
