ALTER TABLE "organization" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "organization" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "department" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "department" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "time_sheet_break" ALTER COLUMN "break_start" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "time_sheet_break" ALTER COLUMN "break_end" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "time_sheet" ALTER COLUMN "clock_in" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "time_sheet" ALTER COLUMN "clock_out" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "time_sheet" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "time_sheet" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "createdAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp with time zone;