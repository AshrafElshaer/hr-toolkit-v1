DO $$ BEGIN
 CREATE TYPE "public"."organization_type" AS ENUM('for-profit', 'non-profit', 'government');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."payroll_pattern" AS ENUM('weekly', 'bi-weekly', 'monthly');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."time_sheet_status" AS ENUM('pending', 'approved', 'rejected', 'clocked_in', 'clocked_out');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
