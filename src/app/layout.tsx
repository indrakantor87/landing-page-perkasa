import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perkasa Networks | Internet Fiber Optic Tercepat",
  description: "Provider internet fiber optic #juaranyawifi. Koneksi stabil, unlimited tanpa FUP, dan harga transparan.",
  icons: {
    icon: [
      { url: '/logo-web.png' },
      { url: '/logo-web.png', sizes: '32x32' },
      { url: '/logo-web.png', sizes: '192x192' },
    ],
    shortcut: '/logo-web.png',
    apple: '/logo-web.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
