import { ThemeProvider } from "next-themes";
import type React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Theme({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
