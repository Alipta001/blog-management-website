"use client";

import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const CompatibleThemeProvider = NextThemesProvider as ComponentType<
  PropsWithChildren<{
    attribute: "class";
    defaultTheme: string;
    enableSystem: boolean;
    disableTransitionOnChange: boolean;
  }>
>;

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <CompatibleThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </CompatibleThemeProvider>
  );
}
