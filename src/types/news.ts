
export interface NewsArticle {
  id: string;
  title: string;
  title_ar: string;
  date: string;
  description: string;
  description_ar: string;
  photo_url?: string;
  photo_name?: string;
  author_id?: string;
  photoUrl?: string; // For backward compatibility
  created_at: string;
  updated_at?: string;
  createdAt?: string; // For backward compatibility
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  title: string;
  subject: string;
  created_at: string;
  createdAt?: string; // For backward compatibility
}
