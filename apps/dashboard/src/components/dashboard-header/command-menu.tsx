"use client";

import { roleBasedNavigation } from "@/constants/sidebar-navigations";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@toolkit/supabase/queries";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "@toolkit/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@toolkit/ui/command";
import {
  CalendarPlus,
  ChevronDown,
  ChevronUp,
  CornerDownLeft,
  Search,
  Settings,
} from "lucide-react";
import { FiCommand } from "react-icons/fi";

import { NoteSheet } from "@/features/user/components/notes/note-sheet";

import { useCurrentUser } from "@/features/user/hooks/use-current-user";
// import EventForm from "@/app/(root)/(home)/_components/calendar/event-form";
import { useSession } from "@/features/user/hooks/use-session";
import { RiStickyNoteAddLine } from "react-icons/ri";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [isNewNote, setIsNewNote] = React.useState(false);
  const [isNewEvent, setIsNewEvent] = React.useState(false);

  const router = useRouter();

  const user = useCurrentUser();
  const allowedNavigation = React.useMemo(() => {
    return roleBasedNavigation(user?.role ?? "");
  }, [user?.role]);

  useHotkeys("meta+k", () => setOpen((open) => !open), {
    enableOnFormTags: true,
  });

  const quickActions = React.useMemo(() => {
    return [
      {
        title: "New Note",
        Icon: <RiStickyNoteAddLine className="size-4 mr-4" />,
        ActionComponent: (
          <NoteSheet isOpen={isNewNote} setIsOpen={setIsNewNote} />
        ),
        onSelect() {
          setIsNewNote(true);
        },
      },
      // {
      // 	title: "New Event",
      // 	Icon: <CalendarPlus className="size-4 mr-4" />,
      // 	ActionComponent: (
      // 		<EventForm isOpen={isNewEvent} setIsOpen={setIsNewEvent} />
      // 	),
      // 	onSelect() {
      // 		setIsNewEvent(true);
      // 	},
      // },
    ];
  }, [isNewNote, isNewEvent]);

  return (
    <>
      <Button
        variant={"outline"}
        className="text-secondary-foreground w-72 flex items-center gap-2 px-2"
        onClick={() => setOpen(true)}
      >
        <FiCommand className="size-4" />
        <span>Command Menu</span>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="relative">
          <Search className=" size-4 absolute left-4 top-4 text-muted-foreground" />
          <CommandInput
            placeholder="Type a command or search..."
            className="pl-10"
          />
        </div>
        <CommandList className="flex-1">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup
            className="*:text-foreground/75 *:aria-selected:text-foreground"
            heading="Navigation"
          >
            {allowedNavigation.map((route) => {
              return (
                <CommandItem
                  key={route.path}
                  onSelect={() => {
                    router.push(route.path);
                    setOpen(false);
                  }}
                  className="hover:border gap-4 aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70"
                >
                  {route.icon}
                  <span>{route.title}</span>
                </CommandItem>
              );
            })}
            <CommandItem
              key="settings"
              onSelect={() => {
                router.push("/settings");
                setOpen(false);
              }}
              className="hover:border gap-4 aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70"
            >
              <Settings size={18} />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup
            className="*:text-foreground/75 hover:text-foreground "
            heading="Quick actions"
          >
            {quickActions.map((action) => (
              <QuickAction key={action.title} {...action} />
            ))}
          </CommandGroup>
        </CommandList>
        <CommandSeparator />
        <div className="flex items-center justify-between p-2 text-sm *:flex *:items-center *:gap-2">
          <div>
            <span>ESC</span>
            <span className="text-muted-foreground">to close</span>
          </div>
          <div>
            <ChevronUp className="bg-secondary size-5 p-0.5 rounded" />
            <ChevronDown className="bg-secondary size-5 p-0.5 rounded" />
            <span className="text-muted-foreground">to navigate</span>
          </div>
          <div>
            <CornerDownLeft className="bg-secondary size-5 p-0.5 rounded" />

            <span className="text-muted-foreground">to select</span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}

type QuickActionProps = {
  title: string;
  Icon: React.JSX.Element;
  onSelect: () => void;
  ActionComponent: React.JSX.Element;
};

function QuickAction({
  title,
  ActionComponent,
  onSelect,
  Icon,
}: QuickActionProps) {
  return (
    <>
      <CommandItem
        className="hover:border aria-selected:border aria-selected:bg-accent/70 hover:bg-accent/70"
        onSelect={onSelect}
      >
        {Icon}
        <span>{title}</span>
      </CommandItem>
      {ActionComponent}
    </>
  );
}
