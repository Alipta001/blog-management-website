import type { Metadata } from "next";


import "./globals.css";
import Providers from "@/redux/provider/provider";
import ThemeProvider from "@/components/common/theme/theme-provider";


export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.PUBLIC_SITE_URL || "https://yourdomain.com",
  ),
  verification: {
    google: "7bIfWyxRH5a1fh-qQvCnHuJ97SSQuToGTYfCi7UN1qk", // Replace with your actual Google verification code
  },

  title: {
    default: "GolpoKotha | Premium Tech & Editorial Blog",
    template: "%s | GolpoKotha",
  },
  description: "Discover thoughtful technology, ideas, and editorial stories on GolpoKotha.",
  applicationName: "GolpoKotha",
  keywords: ["GolpoKotha", "technology blog", "editorial blog", "online articles", "reading platform"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "GolpoKotha",
    title: "GolpoKotha | Premium Tech & Editorial Blog",
    description: "Discover thoughtful technology, ideas, and editorial stories on GolpoKotha.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GolpoKotha | Premium Tech & Editorial Blog",
    description: "Discover thoughtful technology, ideas, and editorial stories on GolpoKotha.",
  },
  robots: {
    index: true,
    follow: true,
  },
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