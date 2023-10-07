"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@material-tailwind/react";

import { LayoutContextProvider } from "@/contexts/layout-context";

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <LayoutContextProvider>{children}</LayoutContextProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Providers;
