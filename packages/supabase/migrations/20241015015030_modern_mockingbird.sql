DO $$ BEGIN
 CREATE TYPE "public"."employment_status" AS ENUM('active', 'inactive', 'terminated');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."employment_type" AS ENUM('full_time', 'part_time', 'contract', 'internship');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_roles" AS ENUM('admin', 'manager', 'staff', 'team_lead');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
