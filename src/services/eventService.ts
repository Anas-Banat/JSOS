import { supabase } from "@/integrations/supabase/client";
import { uploadFile, deleteFile } from "./fileService";
import { CreateEventData, UpdateEventData, Event } from "../types/event";

export const eventService = {
  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }

    return data || [];
  },

  async getEventById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching event:', error);
      throw error;
    }

    return data;
  },

  async createEvent(eventData: CreateEventData): Promise<Event> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    let photo_url = null;
    let photo_name = null;

    // Upload photo if provided
    if (eventData.photo) {
      const uploadResult = await uploadFile(eventData.photo);
      photo_url = uploadResult.url;
      photo_name = uploadResult.name;
    }

    const { data, error } = await supabase
      .from('events')
      .insert({
        title_ar: eventData.title_ar,
        title: eventData.title,
        description_ar: eventData.description_ar,
        description: eventData.description,
        photo_url,
        photo_name,
        author_id: user.id,
        date: eventData.date,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      throw error;
    }

    return data;
  },

  async updateEvent(id: string, eventData: UpdateEventData): Promise<Event> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    let photo_url = undefined;
    let photo_name = undefined;

    // Upload new photo if provided
    if (eventData.photo) {
      const uploadResult = await uploadFile(eventData.photo);
      photo_url = uploadResult.url;
      photo_name = uploadResult.name;
    }

    const updateData: any = {
      title_ar: eventData.title_ar,
      title: eventData.title,
      description_ar: eventData.description_ar,
      description: eventData.description,
      date: eventData.date,
    };

    if (photo_url !== undefined) {
      updateData.photo_url = photo_url;
      updateData.photo_name = photo_name;
    }

    const { data, error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating event:', error);
      throw error;
    }

    return data;
  },

  async deleteEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },
};