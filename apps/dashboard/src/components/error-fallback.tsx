"use client";

import { Button } from "@toolkit/ui/button";

export function ErrorFallback({
  error,
  reset,
}: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <h1 className="text-lg font-bold">Something went wrong!</h1>
      <Button onClick={reset} variant="outline">
        Try Again
      </Button>
    </div>
  );
}
