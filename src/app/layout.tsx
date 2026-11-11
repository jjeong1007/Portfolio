import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Karla } from "next/font/google";
import { Companion } from "@/components/ui/companion";
import { Footer } from "@/components/ui/footer";
import { GridOverlay } from "@/components/ui/grid-overlay";
import { Navbar } from "@/components/ui/navbar";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jason Jeong",
    template: "%s — Jason Jeong",
  },
  description: "Product designer. Playful minimalism.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${bricolage.variable} ${karla.variable}`}>
      <body>
        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
          <GridOverlay />
          <Companion />
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}
