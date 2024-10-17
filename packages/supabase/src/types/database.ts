export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_1: string;
          address_2: string | null;
          city: string;
          country: string;
          created_at: string | null;
          id: string;
          state: string;
          updated_at: string | null;
          user_id: string;
          zip_code: string;
        };
        Insert: {
          address_1: string;
          address_2?: string | null;
          city: string;
          country: string;
          created_at?: string | null;
          id?: string;
          state: string;
          updated_at?: string | null;
          user_id: string;
          zip_code: string;
        };
        Update: {
          address_1?: string;
          address_2?: string | null;
          city?: string;
          country?: string;
          created_at?: string | null;
          id?: string;
          state?: string;
          updated_at?: string | null;
          user_id?: string;
          zip_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      department: {
        Row: {
          created_at: string | null;
          description: string;
          id: string;
          manager_id: string | null;
          name: string;
          organization_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          id?: string;
          manager_id?: string | null;
          name: string;
          organization_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          id?: string;
          manager_id?: string | null;
          name?: string;
          organization_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "department_manager_id_user_id_fk";
            columns: ["manager_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "department_organization_id_organization_id_fk";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organization";
            referencedColumns: ["id"];
          },
        ];
      };
      department_member: {
        Row: {
          department_id: string;
          user_id: string;
        };
        Insert: {
          department_id: string;
          user_id: string;
        };
        Update: {
          department_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "department_member_department_id_department_id_fk";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "department";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "department_member_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      emergency_contacts: {
        Row: {
          contact_email: string;
          contact_name: string;
          contact_number: string;
          contact_relation: string;
          created_at: string | null;
          id: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          contact_email: string;
          contact_name: string;
          contact_number: string;
          contact_relation: string;
          created_at?: string | null;
          id?: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          contact_email?: string;
          contact_name?: string;
          contact_number?: string;
          contact_relation?: string;
          created_at?: string | null;
          id?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      notes: {
        Row: {
          content: Json;
          createdAt: string | null;
          id: string;
          title: string;
          updatedAt: string | null;
          user_id: string;
        };
        Insert: {
          content: Json;
          createdAt?: string | null;
          id?: string;
          title: string;
          updatedAt?: string | null;
          user_id: string;
        };
        Update: {
          content?: Json;
          createdAt?: string | null;
          id?: string;
          title?: string;
          updatedAt?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notes_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      organization: {
        Row: {
          address_1: string;
          address_2: string | null;
          city: string;
          contact_email: string;
          contact_name: string;
          contact_number: string;
          country: string;
          created_at: string | null;
          id: string;
          logo_url: string | null;
          name: string;
          payroll_pattern: string;
          payroll_start_day: number;
          state: string;
          time_zone: string;
          type: string;
          updated_at: string | null;
          website: string | null;
          zip_code: string;
        };
        Insert: {
          address_1: string;
          address_2?: string | null;
          city: string;
          contact_email: string;
          contact_name: string;
          contact_number: string;
          country: string;
          created_at?: string | null;
          id?: string;
          logo_url?: string | null;
          name: string;
          payroll_pattern: string;
          payroll_start_day: number;
          state: string;
          time_zone: string;
          type: string;
          updated_at?: string | null;
          website?: string | null;
          zip_code: string;
        };
        Update: {
          address_1?: string;
          address_2?: string | null;
          city?: string;
          contact_email?: string;
          contact_name?: string;
          contact_number?: string;
          country?: string;
          created_at?: string | null;
          id?: string;
          logo_url?: string | null;
          name?: string;
          payroll_pattern?: string;
          payroll_start_day?: number;
          state?: string;
          time_zone?: string;
          type?: string;
          updated_at?: string | null;
          website?: string | null;
          zip_code?: string;
        };
        Relationships: [];
      };
      organization_members: {
        Row: {
          organization_id: string;
          user_id: string;
        };
        Insert: {
          organization_id: string;
          user_id: string;
        };
        Update: {
          organization_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_organization_id_fk";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_members_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      organization_owners: {
        Row: {
          organization_id: string;
          user_id: string;
        };
        Insert: {
          organization_id: string;
          user_id: string;
        };
        Update: {
          organization_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organization_owners_organization_id_organization_id_fk";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_owners_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      time_sheet: {
        Row: {
          clock_in: string;
          clock_out: string | null;
          created_at: string | null;
          date: string;
          id: string;
          notes: string | null;
          status: string;
          total_worked_minutes: number | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          clock_in: string;
          clock_out?: string | null;
          created_at?: string | null;
          date: string;
          id?: string;
          notes?: string | null;
          status?: string;
          total_worked_minutes?: number | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          clock_in?: string;
          clock_out?: string | null;
          created_at?: string | null;
          date?: string;
          id?: string;
          notes?: string | null;
          status?: string;
          total_worked_minutes?: number | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "time_sheet_user_id_user_id_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          },
        ];
      };
      time_sheet_break: {
        Row: {
          break_end: string | null;
          break_start: string;
          id: string;
          time_sheet_id: string;
        };
        Insert: {
          break_end?: string | null;
          break_start: string;
          id?: string;
          time_sheet_id: string;
        };
        Update: {
          break_end?: string | null;
          break_start?: string;
          id?: string;
          time_sheet_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "time_sheet_break_time_sheet_id_time_sheet_id_fk";
            columns: ["time_sheet_id"];
            isOneToOne: false;
            referencedRelation: "time_sheet";
            referencedColumns: ["id"];
          },
        ];
      };
      user: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          date_of_birth: string | null;
          email: string;
          employment_status: string | null;
          employment_type: string | null;
          first_name: string;
          gender: string | null;
          hire_date: string | null;
          id: string;
          job_title: string | null;
          last_name: string;
          leave_date: string | null;
          phone_number: string | null;
          role: string | null;
          salary_per_hour: number | null;
          updated_at: string | null;
          work_hours_per_week: number | null;
          working_days_per_week: string[] | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          date_of_birth?: string | null;
          email: string;
          employment_status?: string | null;
          employment_type?: string | null;
          first_name: string;
          gender?: string | null;
          hire_date?: string | null;
          id: string;
          job_title?: string | null;
          last_name: string;
          leave_date?: string | null;
          phone_number?: string | null;
          role?: string | null;
          salary_per_hour?: number | null;
          updated_at?: string | null;
          work_hours_per_week?: number | null;
          working_days_per_week?: string[] | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          date_of_birth?: string | null;
          email?: string;
          employment_status?: string | null;
          employment_type?: string | null;
          first_name?: string;
          gender?: string | null;
          hire_date?: string | null;
          id?: string;
          job_title?: string | null;
          last_name?: string;
          leave_date?: string | null;
          phone_number?: string | null;
          role?: string | null;
          salary_per_hour?: number | null;
          updated_at?: string | null;
          work_hours_per_week?: number | null;
          working_days_per_week?: string[] | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      employment_status: "active" | "inactive" | "terminated";
      employment_type: "full_time" | "part_time" | "contract" | "internship";
      organization_type: "for-profit" | "non-profit" | "government";
      payroll_pattern: "weekly" | "bi-weekly" | "monthly";
      time_sheet_status:
        | "pending"
        | "approved"
        | "rejected"
        | "clocked_in"
        | "clocked_out";
      user_roles: "admin" | "manager" | "staff" | "team_lead";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
