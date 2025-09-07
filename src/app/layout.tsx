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
  title: "Vincent Xu Personal Website",
  description: "Collection of piano sheet music arrangements by Vincent Xu. Features J-Pop, jazz, and contemporary pieces with beginner to advanced difficulty levels.",
  openGraph: {
    title: "Vincent's Sheet Music - Piano Arrangements by Vincent Xu",
    description: "Collection of piano sheet music arrangements by Vincent Xu. Features J-Pop, jazz, and contemporary pieces.",
    url: 'https://vincentxu.dev',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'google25f9d2d72852ce4b',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vincent Xu",
    "jobTitle": "Software Engineer",
    "url": "https://vincentxu.dev",
    "sameAs": [
      "https://github.com/vincentxu123",
      "https://www.linkedin.com/in/vincent-xu-ab1169140/"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <MusicAnimationBackground /> */}
        {children}
      </body>
    </html>
  );
}
