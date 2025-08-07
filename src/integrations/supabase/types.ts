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
      appointments: {
        Row: {
          admin_notes: string | null
          appointment_date: string
          appointment_time: string
          confirmation_token: string | null
          confirmed_by_admin_at: string | null
          created_at: string
          id: string
          notes: string | null
          status: string
          treatment_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          appointment_date: string
          appointment_time: string
          confirmation_token?: string | null
          confirmed_by_admin_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          treatment_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          appointment_date?: string
          appointment_time?: string
          confirmation_token?: string | null
          confirmed_by_admin_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          treatment_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_hours: {
        Row: {
          break_end_time: string | null
          break_start_time: string | null
          close_time: string
          created_at: string
          day_of_week: number
          id: number
          is_open: boolean
          open_time: string
        }
        Insert: {
          break_end_time?: string | null
          break_start_time?: string | null
          close_time: string
          created_at?: string
          day_of_week: number
          id?: number
          is_open?: boolean
          open_time: string
        }
        Update: {
          break_end_time?: string | null
          break_start_time?: string | null
          close_time?: string
          created_at?: string
          day_of_week?: number
          id?: number
          is_open?: boolean
          open_time?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          currency: string
          id: string
          items: Json
          order_number: string
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          id?: string
          items: Json
          order_number: string
          status?: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          items?: Json
          order_number?: string
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          name: string
          price: number
          product_benefits: string[] | null
          sizes: Json | null
          stripe_product_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          product_benefits?: string[] | null
          sizes?: Json | null
          stripe_product_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          product_benefits?: string[] | null
          sizes?: Json | null
          stripe_product_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      products_duplicate: {
        Row: {
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          name: string
          price: number
          product_benefits: string[] | null
          stripe_product_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          product_benefits?: string[] | null
          stripe_product_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          product_benefits?: string[] | null
          stripe_product_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          created_at: string
          day_of_week: number | null
          end_time: string
          id: number
          is_available: boolean
          start_time: string
        }
        Insert: {
          created_at?: string
          day_of_week?: number | null
          end_time: string
          id?: number
          is_available?: boolean
          start_time: string
        }
        Update: {
          created_at?: string
          day_of_week?: number | null
          end_time?: string
          id?: number
          is_available?: boolean
          start_time?: string
        }
        Relationships: []
      }
      treatments: {
        Row: {
          benefits: string[] | null
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          duration_minutes: number | null
          featured: boolean | null
          id: number
          image_url: string | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          duration_minutes?: number | null
          featured?: boolean | null
          id?: number
          image_url?: string | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          duration_minutes?: number | null
          featured?: boolean | null
          id?: number
          image_url?: string | null
          name?: string
          price?: number
          updated_at?: string | null
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
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rate_limit: {
        Args: {
          identifier: string
          max_attempts?: number
          window_minutes?: number
        }
        Returns: boolean
      }
      current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never> | { user_id?: string }
        Returns: boolean
      }
      keep_alive: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      log_security_event: {
        Args: {
          action_type: string
          details?: Json
          ip_address?: unknown
          user_agent?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "customer" | "admin"
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
      app_role: ["customer", "admin"],
    },
  },
} as const
