import type { Metadata } from "next";


import "./globals.css";
import Providers from "@/redux/provider/provider";


export const metadata: Metadata = {
  title: "Your App",
  description: "Premium blog platform",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}