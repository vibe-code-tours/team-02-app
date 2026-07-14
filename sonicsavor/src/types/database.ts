export interface Database {
  public: {
    Tables: {
      menu_items: {
        Row: {
          id: string;
          name: string;
          category: string;
          cuisine: string;
          price: number;
          description: string;
          mood_description: string;
          dietary_tags: string[];
          mood_tags: string[];
          image_url: string;
          embedding: number[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          cuisine: string;
          price: number;
          description: string;
          mood_description: string;
          dietary_tags?: string[];
          mood_tags?: string[];
          image_url?: string;
          embedding?: number[] | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          category?: string;
          cuisine?: string;
          price?: number;
          description?: string;
          mood_description?: string;
          dietary_tags?: string[];
          mood_tags?: string[];
          image_url?: string;
          embedding?: number[] | null;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          role: "guest" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: "guest" | "admin";
        };
        Update: {
          email?: string;
          role?: "guest" | "admin";
        };
      };
    };
    Functions: {
      match_menu_items: {
        Args: {
          query_embedding: number[];
          match_count: number;
        };
        Returns: {
          id: string;
          name: string;
          description: string;
          cuisine: string;
          course: string;
          price: number;
          dietary_tags: string[];
          mood_tags: string[];
          mood_description: string;
          image_url: string | null;
        }[];
      };
    };
  };
}
