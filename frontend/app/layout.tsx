import type { Metadata } from "next";


import "./globals.css";
import Providers from "@/redux/provider/provider";
import ThemeProvider from "@/components/common/theme/theme-provider";


export const metadata: Metadata = {
  title: "GolpoKotha",
  description: "Premium blog platform",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>

      </body>
    </html>
  );
}