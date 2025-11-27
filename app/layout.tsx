import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Headless Storefront | Next.js + Shopify",
	description: "A high-performance e-commerce demo built with Next.js 15.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} flex min-h-screen flex-col`}>
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
