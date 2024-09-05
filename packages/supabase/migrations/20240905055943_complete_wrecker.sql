ALTER TABLE "time_sheet" RENAME COLUMN "total_worked" TO "total_worked_minutes";--> statement-breakpoint
ALTER TABLE "time_sheet_break" DROP CONSTRAINT "time_sheet_break_time_sheet_id_time_sheet_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "time_sheet_break" ADD CONSTRAINT "time_sheet_break_time_sheet_id_time_sheet_id_fk" FOREIGN KEY ("time_sheet_id") REFERENCES "public"."time_sheet"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
