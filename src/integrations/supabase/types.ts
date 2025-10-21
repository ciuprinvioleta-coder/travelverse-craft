export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      article_images: {
        Row: {
          article_id: string
          caption_en: string | null
          caption_ro: string | null
          caption_ru: string | null
          created_at: string
          id: string
          image_url: string
          sort_order: number | null
        }
        Insert: {
          article_id: string
          caption_en?: string | null
          caption_ro?: string | null
          caption_ru?: string | null
          created_at?: string
          id?: string
          image_url: string
          sort_order?: number | null
        }
        Update: {
          article_id?: string
          caption_en?: string | null
          caption_ro?: string | null
          caption_ru?: string | null
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "article_images_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string
          category: string | null
          content_en: string
          content_ro: string | null
          content_ru: string | null
          country: string
          cover_image: string | null
          created_at: string
          date_visited: string | null
          excerpt_en: string
          excerpt_ro: string | null
          excerpt_ru: string | null
          id: string
          published: boolean | null
          tags: string[] | null
          title_en: string
          title_ro: string | null
          title_ru: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          category?: string | null
          content_en: string
          content_ro?: string | null
          content_ru?: string | null
          country: string
          cover_image?: string | null
          created_at?: string
          date_visited?: string | null
          excerpt_en: string
          excerpt_ro?: string | null
          excerpt_ru?: string | null
          id?: string
          published?: boolean | null
          tags?: string[] | null
          title_en: string
          title_ro?: string | null
          title_ru?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string | null
          content_en?: string
          content_ro?: string | null
          content_ru?: string | null
          country?: string
          cover_image?: string | null
          created_at?: string
          date_visited?: string | null
          excerpt_en?: string
          excerpt_ro?: string | null
          excerpt_ru?: string | null
          id?: string
          published?: boolean | null
          tags?: string[] | null
          title_en?: string
          title_ro?: string | null
          title_ru?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          country: string
          created_at: string
          highlight_en: string
          highlight_ro: string | null
          highlight_ru: string | null
          id: string
          image_url: string | null
          month: number
          name: string
          published: boolean | null
          rainfall: string | null
          reason_en: string
          reason_ro: string | null
          reason_ru: string | null
          temperature: string | null
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          highlight_en: string
          highlight_ro?: string | null
          highlight_ru?: string | null
          id?: string
          image_url?: string | null
          month: number
          name: string
          published?: boolean | null
          rainfall?: string | null
          reason_en: string
          reason_ro?: string | null
          reason_ru?: string | null
          temperature?: string | null
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          highlight_en?: string
          highlight_ro?: string | null
          highlight_ru?: string | null
          id?: string
          image_url?: string | null
          month?: number
          name?: string
          published?: boolean | null
          rainfall?: string | null
          reason_en?: string
          reason_ro?: string | null
          reason_ru?: string | null
          temperature?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      downloads: {
        Row: {
          created_at: string
          description_en: string | null
          description_ro: string | null
          description_ru: string | null
          download_count: number | null
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          published: boolean | null
          requires_email: boolean | null
          title_en: string
          title_ro: string | null
          title_ru: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_ro?: string | null
          description_ru?: string | null
          download_count?: number | null
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          published?: boolean | null
          requires_email?: boolean | null
          title_en: string
          title_ro?: string | null
          title_ru?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_ro?: string | null
          description_ru?: string | null
          download_count?: number | null
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          published?: boolean | null
          requires_email?: boolean | null
          title_en?: string
          title_ro?: string | null
          title_ru?: string | null
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
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      trip_itinerary: {
        Row: {
          created_at: string
          day_number: number
          description_en: string | null
          description_ro: string | null
          description_ru: string | null
          id: string
          sort_order: number | null
          title_en: string
          title_ro: string | null
          title_ru: string | null
          trip_id: string
        }
        Insert: {
          created_at?: string
          day_number: number
          description_en?: string | null
          description_ro?: string | null
          description_ru?: string | null
          id?: string
          sort_order?: number | null
          title_en: string
          title_ro?: string | null
          title_ru?: string | null
          trip_id: string
        }
        Update: {
          created_at?: string
          day_number?: number
          description_en?: string | null
          description_ro?: string | null
          description_ru?: string | null
          id?: string
          sort_order?: number | null
          title_en?: string
          title_ro?: string | null
          title_ru?: string | null
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_itinerary_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          cover_image: string | null
          created_at: string
          currency: string | null
          current_participants: number | null
          description_en: string
          description_ro: string | null
          description_ru: string | null
          difficulty: string | null
          end_date: string
          id: string
          max_participants: number | null
          price: number | null
          published: boolean | null
          signup_url: string | null
          start_date: string
          title_en: string
          title_ro: string | null
          title_ru: string | null
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          currency?: string | null
          current_participants?: number | null
          description_en: string
          description_ro?: string | null
          description_ru?: string | null
          difficulty?: string | null
          end_date: string
          id?: string
          max_participants?: number | null
          price?: number | null
          published?: boolean | null
          signup_url?: string | null
          start_date: string
          title_en: string
          title_ro?: string | null
          title_ru?: string | null
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          currency?: string | null
          current_participants?: number | null
          description_en?: string
          description_ro?: string | null
          description_ru?: string | null
          difficulty?: string | null
          end_date?: string
          id?: string
          max_participants?: number | null
          price?: number | null
          published?: boolean | null
          signup_url?: string | null
          start_date?: string
          title_en?: string
          title_ro?: string | null
          title_ru?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_editor: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
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
      app_role: ["admin", "editor"],
    },
  },
} as const
