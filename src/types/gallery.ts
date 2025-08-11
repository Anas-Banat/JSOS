export interface Gallery {
    id: string;
    title_ar: string;
    title?: string;
    description_ar: string;
    description?: string;
    author_id?: string;
    created_at: string;
    updated_at: string;
    cover_photo_id?: string | null; // allow null for DB compatibility
  }
  
  export interface GalleryPhoto {
    id: string;
    gallery_id: string;
    title_ar?: string;
    title?: string;
    photo_url: string;
    photo_name?: string;
    order_index: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface CreateGalleryData {
    title_ar: string;
    title?: string;
    description_ar: string;
    description?: string;
    photos: File[];
  }
  
  export interface UpdateGalleryData {
    title_ar?: string;
    title?: string;
    description_ar?: string;
    description?: string;
    photos?: File[];
  }