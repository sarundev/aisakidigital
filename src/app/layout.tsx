import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import AOSProvider from "@/components/AOSProvider";
import PageTracker from "@/components/PageTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-khmer",
  subsets: ["khmer"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AisakiDigital",
  description: "AisakiDigital is a trusted digital marketing agency in Cambodia specializing in Facebook Ads, TikTok growth, and online business promotion.",
  openGraph: {
    title: 'Aisaki Digital | Professional Digital Services',
    description: 'Trusted digital marketing agency in Cambodia. We specialize in Facebook Ads, TikTok growth, and online business promotion.',
    url: 'https://www.aisakikh.com',
    siteName: 'Aisaki Digital',
    images: [
      {
        url: 'https://www.aisakikh.com/image/cover.png',
        width: 1200,
        height: 630,
        alt: 'Aisaki Digital Home Page',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aisaki Digital | Professional Digital Services',
    description: 'Trusted digital marketing agency in Cambodia specializing in Facebook Ads and TikTok growth.',
    images: ['https://www.aisakikh.com/image/cover.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKhmer.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
        <PageTracker />
        <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}
