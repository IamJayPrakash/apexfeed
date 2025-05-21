import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import ToastProvider from "@/components/ToastProvider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://apexfeedblog.vercel.app/"
  ),
  title: {
    default: "ApexFeed - Share Your Thoughts",
    template: "%s | ApexFeed",
  },
  description:
    "ApexFeed - A modern blog platform for sharing your thoughts and experiences. Join our community of writers and readers.",
  keywords: [
    "blog",
    "apexfeed",
    "social media",
    "content sharing",
    "community",
    "nextjs",
    "web development",
  ],
  authors: [{ name: "ApexFeed Team" }],
  creator: "ApexFeed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://apexfeedblog.vercel.app/",
    title: "ApexFeed - Share Your Thoughts",
    description:
      "A modern blog platform for sharing your thoughts and experiences. Join our community of writers and readers.",
    siteName: "ApexFeed",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ApexFeed - Share Your Thoughts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ApexFeed - Share Your Thoughts",
    description:
      "A modern blog platform for sharing your thoughts and experiences. Join our community of writers and readers.",
    creator: "@apexfeed",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_BASE_URL || "https://apexfeedblog.vercel.app/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProviderWrapper>
            <Header />
            <ToastProvider />
            <main className="min-h-screen">{children}</main>
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
