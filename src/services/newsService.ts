import { NewsArticle, ContactMessage } from '@/types/news';
import { supabase } from '@/integrations/supabase/client';

// Helper function to map database news to our interface
const mapNewsFromDB = (dbNews: any): NewsArticle => {
  return {
    id: dbNews.id,
    title: dbNews.title,
    title_ar: dbNews.title_ar || '',
    date: dbNews.date,
    description: dbNews.description,
    description_ar: dbNews.description_ar || '',
    photo_url: dbNews.photo_url,
    photo_name: dbNews.photo_name,
    author_id: dbNews.author_id,
    created_at: dbNews.created_at,
    updated_at: dbNews.updated_at,
    // For backward compatibility
    photoUrl: dbNews.photo_url,
    createdAt: dbNews.created_at
  };
};

// Helper function to map database contact to our interface
const mapContactFromDB = (dbContact: any): ContactMessage => {
  return {
    ...dbContact,
    createdAt: dbContact.created_at
  };
};

// News Service
export const getNews = async (): Promise<NewsArticle[]> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });
      
    if (error) throw error;
    
    return data ? data.map(mapNewsFromDB) : [];
  } catch (error) {
    console.error('Error getting news', error);
    return [];
  }
};

export const getNewsById = async (id: string): Promise<NewsArticle | null> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .maybeSingle();
      
    if (error) throw error;
    
    return data ? mapNewsFromDB(data) : null;
  } catch (error) {
    console.error(`Error getting news article with id ${id}`, error);
    return null;
  }
};

export const addNews = async (article: Omit<NewsArticle, 'id' | 'created_at' | 'author_id'>): Promise<NewsArticle> => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) throw userError;
    
    const userId = userData.user?.id;
    
    const { data, error } = await supabase
      .from('news')
      .insert([
        { 
          title: article.title,
          title_ar: article.title_ar,
          date: article.date,
          description: article.description,
          description_ar: article.description_ar,
          photo_url: article.photo_url,
          photo_name: article.photo_name,
          author_id: userId
        }
      ])
      .select()
      .single();
      
    if (error) throw error;
    
    return mapNewsFromDB(data);
  } catch (error) {
    console.error('Error adding news article', error);
    throw new Error('Failed to add news article');
  }
};

export const updateNews = async (id: string, article: Partial<Omit<NewsArticle, 'id' | 'created_at' | 'author_id'>>): Promise<NewsArticle> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .update({ 
        title: article.title,
        title_ar: article.title_ar,
        date: article.date,
        description: article.description,
        description_ar: article.description_ar,
        photo_url: article.photo_url,
        photo_name: article.photo_name,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return mapNewsFromDB(data);
  } catch (error) {
    console.error('Error updating news article', error);
    throw new Error('Failed to update news article');
  }
};

export const filterNews = async (searchTerm: string = '', date: string = ''): Promise<NewsArticle[]> => {
  try {
    let query = supabase
      .from('news')
      .select('*');
      
    // Apply search filter
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,title_ar.ilike.%${searchTerm}%,description_ar.ilike.%${searchTerm}%`);
    }
    
    // Apply date filter
    if (date) {
      query = query.eq('date', date);
    }
    
    // Order by date
    query = query.order('date', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data ? data.map(mapNewsFromDB) : [];
  } catch (error) {
    console.error('Error filtering news', error);
    return [];
  }
};

// Contact Service
export const addContactMessage = async (message: Omit<ContactMessage, 'id' | 'created_at'>): Promise<ContactMessage> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([message])
      .select()
      .single();
      
    if (error) throw error;
    
    return mapContactFromDB(data);
  } catch (error) {
    console.error('Error adding contact message', error);
    throw new Error('Failed to add contact message');
  }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data ? data.map(mapContactFromDB) : [];
  } catch (error) {
    console.error('Error getting contact messages', error);
    return [];
  }
};

export const canEditNews = async (newsId: string): Promise<boolean> => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) return false;
    
    // Check if user has admin role using the has_role function
    const { data: isAdmin, error: adminError } = await supabase
      .rpc('has_role', { requested_role: 'admin' });
      
    if (adminError) {
      console.error('Error checking admin role:', adminError);
      return false;
    }
    
    // Admin can edit any news
    if (isAdmin) return true;
    
    // Check if user has editor role using the has_role function
    const { data: isEditor, error: editorError } = await supabase
      .rpc('has_role', { requested_role: 'editor' });
      
    if (editorError) {
      console.error('Error checking editor role:', editorError);
      return false;
    }
    
    // Editor can only edit their own news
    if (isEditor) {
      const { data: newsData, error: newsError } = await supabase
        .from('news')
        .select('author_id')
        .eq('id', newsId)
        .single();
        
      if (newsError || !newsData) return false;
      
      return newsData.author_id === userData.user.id;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking edit permissions', error);
    return false;
  }
};
