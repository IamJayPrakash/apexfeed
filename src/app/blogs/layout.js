import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header";
import SessionProviderWrapper from "../../components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ApexFeed - Blog App",
  description: "A beautiful blog app built with Next.js, Shadcn, and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <main className="container mx-auto px-4 py-8 min-h-[80vh]">{children}</main>
    </SessionProviderWrapper>
  );
}
