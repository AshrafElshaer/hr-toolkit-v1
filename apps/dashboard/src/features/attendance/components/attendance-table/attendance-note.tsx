import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@toolkit/ui/alert-dialog";
import { Button } from "@toolkit/ui/button";
import { Input } from "@toolkit/ui/input";
import { Label } from "@toolkit/ui/label";
import { Textarea } from "@toolkit/ui/textarea";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { TbClockX } from "react-icons/tb";
import { toast } from "sonner";
import { rejectTimeSheetAction } from "../../lib/attendance.actions";

interface AttendanceNoteProps {
  children: React.ReactNode;
  notesId: string[];
}

export function AttendanceNote({ children, notesId }: AttendanceNoteProps) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const { executeAsync: rejectTimeSheet, isExecuting: isRejecting } = useAction(
    rejectTimeSheetAction,
    {
      onSuccess: () => {
        setOpen(false);
      },
    },
  );

  async function handleRejectTimeSheet() {
    toast.promise(rejectTimeSheet({ ids: notesId, note }), {
      loading: "Rejecting record...",
      success: "Record rejected successfully",
      error: ({ error }) => error.serverError ?? "Failed to reject record",
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex items-center gap-2">
            <TbClockX className="size-5" />
            Rejection Note
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please enter a note for the attendance rejection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full items-center gap-2">
          <h4 className="font-medium">Note :</h4>
          <Textarea
            id="note"
            className="w-full"
            rows={5}
            placeholder="State the reason for rejection"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <AlertDialogCancel disabled={isRejecting}>Cancel</AlertDialogCancel>
          <Button
            size="sm"
            disabled={!note.length || isRejecting}
            variant="destructive"
            onClick={handleRejectTimeSheet}
          >
            Continue
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
