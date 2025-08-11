import { supabase } from "@/integrations/supabase/client";
import { Gallery, GalleryPhoto, CreateGalleryData, UpdateGalleryData } from "@/types/gallery";
import { fileService } from "./fileService";

export const galleryService = {
  async getAllGalleries(): Promise<Gallery[]> {
    const { data, error } = await supabase
      .from('galleries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching galleries:', error);
      throw error;
    }

    return data || [];
  },

  async getGalleryById(id: string): Promise<Gallery | null> {
    const { data, error } = await supabase
      .from('galleries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching gallery:', error);
      throw error;
    }

    return data;
  },

  async getGalleryPhotos(galleryId: string): Promise<GalleryPhoto[]> {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .eq('gallery_id', galleryId)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching gallery photos:', error);
      throw error;
    }

    return data || [];
  },

  async createGallery(galleryData: CreateGalleryData & { coverPhotoIndex?: number }): Promise<Gallery> {
    const { data: userData } = await supabase.auth.getUser();
    
    // Create gallery
    const { data: gallery, error: galleryError } = await supabase
      .from('galleries')
      .insert({
        title_ar: galleryData.title_ar,
        title: galleryData.title,
        description_ar: galleryData.description_ar,
        description: galleryData.description,
        author_id: userData.user?.id,
        cover_photo_id: null,
      })
      .select()
      .single();

    if (galleryError) {
      console.error('Error creating gallery:', galleryError);
      throw galleryError;
    }

    let uploadedPhotoIds: string[] = [];
    // Upload photos
    if (galleryData.photos && galleryData.photos.length > 0) {
      // Upload and collect inserted photo ids
      for (let i = 0; i < galleryData.photos.length; i++) {
        const photo = galleryData.photos[i];
        try {
          const fileName = await fileService.uploadFile('gallery-photos', photo);
          const photoUrl = fileService.getFileUrl('gallery-photos', fileName);
          const { data: insertedPhoto, error: insertError } = await supabase
            .from('gallery_photos')
            .insert({
              gallery_id: gallery.id,
              photo_url: photoUrl,
              photo_name: fileName,
              order_index: i,
            })
            .select()
            .single();
          if (insertError) throw insertError;
          uploadedPhotoIds.push(insertedPhoto.id);
        } catch (error) {
          console.error('Error uploading gallery photo:', error);
          throw error;
        }
      }
    }

    // Set cover photo if index is provided
    if (
      typeof galleryData.coverPhotoIndex === 'number' &&
      uploadedPhotoIds.length > galleryData.coverPhotoIndex
    ) {
      const coverPhotoId = uploadedPhotoIds[galleryData.coverPhotoIndex];
      const { data: updatedGallery, error: updateError } = await supabase
        .from('galleries')
        .update({ cover_photo_id: coverPhotoId })
        .eq('id', gallery.id)
        .select()
        .single();
      if (updateError) {
        console.error('Error setting cover photo:', updateError);
        throw updateError;
      }
      gallery.cover_photo_id = coverPhotoId;
      // Optionally update the returned gallery object with the new cover_photo_id
      if (updatedGallery) {
        Object.assign(gallery, updatedGallery);
      }
    }

    return gallery;
  },

  async updateGallery(id: string, galleryData: UpdateGalleryData): Promise<Gallery> {
    const { data, error } = await supabase
      .from('galleries')
      .update({
        title_ar: galleryData.title_ar,
        title: galleryData.title,
        description_ar: galleryData.description_ar,
        description: galleryData.description,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating gallery:', error);
      throw error;
    }

    // Upload new photos if provided
    if (galleryData.photos && galleryData.photos.length > 0) {
      await this.uploadGalleryPhotos(id, galleryData.photos);
    }

    return data;
  },

  async deleteGallery(id: string): Promise<void> {
    // First, delete all photos in the gallery
    const photos = await this.getGalleryPhotos(id);
    for (const photo of photos) {
      if (photo.photo_name) {
        await fileService.deleteFile('gallery-photos', photo.photo_name);
      }
    }

    // Delete the gallery (cascade will delete gallery_photos)
    const { error } = await supabase
      .from('galleries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting gallery:', error);
      throw error;
    }
  },

  async uploadGalleryPhotos(galleryId: string, photos: File[]): Promise<void> {
    // Get current max order index
    const { data: existingPhotos } = await supabase
      .from('gallery_photos')
      .select('order_index')
      .eq('gallery_id', galleryId)
      .order('order_index', { ascending: false })
      .limit(1);

    let currentOrderIndex = existingPhotos && existingPhotos.length > 0 
      ? existingPhotos[0].order_index + 1 
      : 0;

    for (const photo of photos) {
      try {
        const fileName = await fileService.uploadFile('gallery-photos', photo);
        const photoUrl = fileService.getFileUrl('gallery-photos', fileName);

        await supabase
          .from('gallery_photos')
          .insert({
            gallery_id: galleryId,
            photo_url: photoUrl,
            photo_name: fileName,
            order_index: currentOrderIndex++,
          });
      } catch (error) {
        console.error('Error uploading gallery photo:', error);
        throw error;
      }
    }
  },

  async deleteGalleryPhoto(photoId: string): Promise<void> {
    // Get photo details first
    const { data: photo } = await supabase
      .from('gallery_photos')
      .select('photo_name')
      .eq('id', photoId)
      .single();

    if (photo?.photo_name) {
      await fileService.deleteFile('gallery-photos', photo.photo_name);
    }

    const { error } = await supabase
      .from('gallery_photos')
      .delete()
      .eq('id', photoId);

    if (error) {
      console.error('Error deleting gallery photo:', error);
      throw error;
    }
  },
};