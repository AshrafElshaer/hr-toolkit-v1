import type {
  GenerateLinkProperties,
  User as AuthUser,
} from "@supabase/supabase-js";
import type React from "react";

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type EmailOtpConfirmation =
  | {
      properties: GenerateLinkProperties;
      user: AuthUser;
    }
  | {
      properties: null;
      user: null;
    };

export type DateRangeOption = {
  title: string;
  range: { from: Date; to: Date };
};

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface DataTableFilterField<TData> {
  id: keyof TData
  label: string
  placeholder?: string
  options?: Option[]
}
