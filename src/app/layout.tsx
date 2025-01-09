import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
export const runtime = 'edge';
export const metadata: Metadata = {
  title: "Notes App",
  description: "A simple notes application",
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
