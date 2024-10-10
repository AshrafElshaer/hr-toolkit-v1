"use client";

import { cn } from "@toolkit/ui/cn";
import { Plus } from "lucide-react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

type UploadZoneProps = React.ComponentProps<"div"> & {
  options?: DropzoneOptions;
  children?: React.ReactNode;
};

export default function UploadZone({
  className,
  options,
  children,
  ...props
}: UploadZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(options);

  return (
    <div
      {...getRootProps()}
      className={cn("border border-dashed p-4 relative group overflow-hidden", className)}
      {...props}
    >
      <input {...getInputProps()} />
      {children ?? (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}

      <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer w-full h-full bg-background/50 ">
        <Plus className="size-8 text-current" />
      </div>
    </div>
  );
}
