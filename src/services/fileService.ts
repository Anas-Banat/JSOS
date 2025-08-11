
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

export interface UploadedFile {
  url: string;
  name: string;
}

export const fileService = {
  async uploadFile(bucket: string, file: File): Promise<string> {
    try {
      // Generate a unique filename to prevent collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = fileName;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);
        
      if (error) throw error;
      
      return fileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  getFileUrl(bucket: string, fileName: string): string {
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    return publicUrl;
  },

  async deleteFile(bucket: string, fileName: string): Promise<void> {
    if (!fileName) return;
    
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};

// Legacy functions for backward compatibility
export const uploadFile = async (file: File): Promise<UploadedFile> => {
  try {
    const fileName = await fileService.uploadFile('news-photos', file);
    const url = fileService.getFileUrl('news-photos', fileName);
    
    return {
      url,
      name: fileName,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (fileName: string): Promise<void> => {
  return fileService.deleteFile('news-photos', fileName);
};
