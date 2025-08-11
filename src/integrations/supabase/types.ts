export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string
          subject: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone: string
          subject: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string
          subject?: string
          title?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          author_id: string | null
          created_at: string
          date: string
          description: string | null
          description_ar: string
          id: string
          photo_name: string | null
          photo_url: string | null
          title: string | null
          title_ar: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          description_ar: string
          id?: string
          photo_name?: string | null
          photo_url?: string | null
          title?: string | null
          title_ar: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          description_ar?: string
          id?: string
          photo_name?: string | null
          photo_url?: string | null
          title?: string | null
          title_ar?: string
          updated_at?: string
        }
        Relationships: []
      }
      galleries: {
        Row: {
          author_id: string | null
          created_at: string
          description: string | null
          description_ar: string
          id: string
          title: string | null
          title_ar: string
          updated_at: string
          cover_photo_id: string | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          description?: string | null
          description_ar: string
          id?: string
          title?: string | null
          title_ar: string
          updated_at?: string
          cover_photo_id?: string | null
        }
        Update: {
          author_id?: string | null
          created_at?: string
          description?: string | null
          description_ar?: string
          id?: string
          title?: string | null
          title_ar?: string
          updated_at?: string
          cover_photo_id?: string | null
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          created_at: string
          gallery_id: string
          id: string
          order_index: number | null
          photo_name: string | null
          photo_url: string
          title: string | null
          title_ar: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          gallery_id: string
          id?: string
          order_index?: number | null
          photo_name?: string | null
          photo_url: string
          title?: string | null
          title_ar?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          gallery_id?: string
          id?: string
          order_index?: number | null
          photo_name?: string | null
          photo_url?: string
          title?: string | null
          title_ar?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_photos_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "galleries"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author_id: string | null
          created_at: string
          date: string
          description: string | null
          description_ar: string
          id: string
          photo_name: string | null
          photo_url: string | null
          title: string | null
          title_ar: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          description_ar: string
          id?: string
          photo_name?: string | null
          photo_url?: string | null
          title?: string | null
          title_ar: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          description_ar?: string
          id?: string
          photo_name?: string | null
          photo_url?: string | null
          title?: string | null
          title_ar?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      has_role: {
        Args: { requested_role: Database["public"]["Enums"]["user_role"] }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "editor", "viewer"],
    },
  },
} as const
