import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { filterNews } from '@/services/newsService';
import { NewsArticle } from '@/types/news';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const NewsContent = () => {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const newsPerPage = 12;
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const filteredNews = await filterNews(searchTerm, filterDate);
        setNews(filteredNews);
      } catch (error) {
        console.error('Error fetching news', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [searchTerm, filterDate, language]); // Add currentLanguage as dependency to refresh when language changes
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilterDate('');
  };

  // Function to get the title based on language
  const getTitle = (article: NewsArticle) => {
    if (language === 'ar' && article.title_ar) {
      return article.title_ar;
    }
    return article.title;
  };

  // Function to get the description based on language
  const getDescription = (article: NewsArticle) => {
    if (language === 'ar' && article.description_ar) {
      return article.description_ar;
    }
    return article.description;
  };
  
  // حساب عدد الصفحات
  const totalPages = Math.ceil(news.length / newsPerPage);
  // الأخبار الخاصة بالصفحة الحالية
  const paginatedNews = news.slice((currentPage - 1) * newsPerPage, currentPage * newsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto py-8 px-4">
      <h1 className="section-title text-center mb-12 text-4xl font-bold text-jsos-green-700 mb-6">{t('navNews')}</h1>

      {/* Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={t('searchNews')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full md:w-auto pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            {(searchTerm || filterDate) && (
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-news-primary text-news-primary hover:bg-news-primary/10"
              >
                {t('clearFilters')}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <div className="spinner" />
          <p className="mt-4">{t('loading')}</p>
        </div>
      ) : news.length > 0 ? (
        <>
        <div className="space-y-8">
          {paginatedNews.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col md:flex-row"
            >
              <div className="md:w-1/3">
                <img 
                  src={item.photoUrl || item.photo_url} 
                  alt={getTitle(item)} 
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '300px' }}
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center text-jsos-green-700 mb-2">
                  <Calendar size={18} className="mr-2 flex-shrink-0" />
                  <span className="text-sm">{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-1">
                  {getTitle(item)}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {getDescription(item)}
                </p>
                <Button
                  onClick={() => navigate(`/news/${item.id}`)}
                  variant="outline" 
                  className="border-jsos-green-600 text-jsos-green-700 hover:bg-jsos-green-50">
                  {t('readMore')}
                </Button>
              </div>
            </div>
          ))}
        </div>


        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedNews.map((article) => (
            <div key={article.id} className="news-card p-4 group flex max-w-xl flex-col justify-between px-5 bg-white dark:bg-gray-700 py-5 rounded-xl shadow-testimonial dark:shadow-none">
              <AspectRatio ratio={16/9} className="relative z-10 mx-auto mb-5 h-[100%] w-[100%] items-center">
                <img 
                  src={article.photoUrl || article.photo_url} 
                  alt={getTitle(article)} 
                  className="news-card-image bg-gray-200/90 object-cover w-full rounded-xl h-[200px] group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  //className="news-card-image bg-gray-200/90 object-contain w-full h-full"
                />
              </AspectRatio>
              <div className="news-card-content mt-6 lg:mt-0">
                <h2 className="news-title line-clamp-2 dark:text-white">{getTitle(article)}</h2>
                <p className="news-date dark:text-white">{new Date(article.date).toLocaleDateString()}</p>
                <p className="news-description line-clamp-3 dark:text-white">{getDescription(article)}</p>
                <div className="mt-4 flex justify-end">
                  <Link 
                    to={`/news/${article.id}`}
                    className="bg-news-primary py-2 px-4 text-white dark:text-dark dark:bg-white rounded-lg hover:text-news-primary-dark hover:underline transition-colors duration-300 ease-in-out font-medium"
                  >
                    {t('readMore')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div> */}


        {/* أزرار التنقل بين الصفحات */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {t('previous') || 'السابق'}
            </Button>
            <span>
              {t('page') || 'صفحة'} {currentPage} {t('of') || 'من'} {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {t('next') || 'التالي'}
            </Button>
          </div>
        )}
        </>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">{t('noNewsFound')}</p>
        </div>
      )}
      </div>
    </main>
      <Footer />
    </div>
  );
};

const News = () => {
  return (
    <LanguageProvider>
      <NewsContent />
    </LanguageProvider>
  );
};

export default News;
