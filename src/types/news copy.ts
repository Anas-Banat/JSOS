export type NewsArticle = {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  date: string;
  
  image_name?: string;
  author_id?: string;
  image_Url?: string; // For backward compatibility
  created_at: string;
  updated_at?: string;
  createdAt?: string; // For backward compatibility

};