import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans, Rubik } from "next/font/google";
import "./styles/globals.scss"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Gaia DG Portfolio",
  description: "Portfolio website of Gaia Di Gregorio, frontend developer.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Gaia DG Portfolio",
    description: "Portfolio website of Gaia Di Gregorio, frontend developer.",
    url: "https://gaiadg.dev",
    siteName: "Gaia DG Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gaia Di Gregorio Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSans.variable} ${rubik.variable}`}>
        {children}
      </body>
    </html>
  );
}
