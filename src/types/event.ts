export interface Event {
    id: string;
    title_ar: string;
    title?: string;
    description_ar: string;
    description?: string;
    photo_name?: string;
    photo_url?: string;
    author_id?: string;
    date: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface CreateEventData {
    title_ar: string;
    title?: string;
    description_ar: string;
    description?: string;
    photo?: File;
    date: string;
  }
  
  export interface UpdateEventData {
    title_ar?: string;
    title?: string;
    description_ar?: string;
    description?: string;
    photo?: File;
    date?: string;
  }