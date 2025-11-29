import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Headless Storefront",
    template: "%s | Headless Storefront",
  },
  description: "Premium snowboarding gear and apparel. Engineered for performance.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Headless Storefront",
    title: "Headless Storefront",
    description: "Premium snowboarding gear and apparel.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Headless Storefront Social Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Headless Storefront",
    description: "Premium snowboarding gear and apparel.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased bg-background text-heading flex min-h-screen flex-col">
        <CartProvider>
          <CartDrawer />
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}