"use client";

import { useCart } from "@/components/cart/CartContext";
import { Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar() {
	const { cart, openCart } = useCart();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();

	const cartCount =
		cart?.lines?.edges.reduce((total, item) => {
			return total + item.node.quantity;
		}, 0) || 0;

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const query = formData.get("q");
		if (query) {
			router.push(`/search?q=${encodeURIComponent(query.toString())}`);
		}
	};

	return (
		<header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-4">
					<button
						type="button"
						className="lg:hidden p-2 -ml-2 text-body hover:text-heading transition-colors"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="Open menu"
					>
						<Menu className="h-6 w-6" />
					</button>

					<Link
						href="/"
						className="text-xl font-bold tracking-tighter text-heading font-sans shrink-0"
					>
						STORE<span className="text-accent">FRONT</span>
					</Link>
				</div>

				<form
					onSubmit={handleSearch}
					className="hidden md:flex items-center w-full max-w-sm relative"
				>
					<Search className="absolute left-3 h-4 w-4 text-gray-400" />
					<input
						type="text"
						name="q"
						placeholder="Search"
						className="w-full h-10 pl-9 pr-4 rounded-sm border border-border bg-white text-sm text-heading placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
					/>
				</form>

				<div className="flex items-center gap-6 ml-auto">
					<nav className="hidden lg:flex items-center gap-6">
						<Link
							href="/collections/all"
							className="text-sm font-medium text-body hover:text-heading transition-colors"
						>
							All Products
						</Link>
						<Link
							href="/collections/hydrogen"
							className="text-sm font-medium text-body hover:text-heading transition-colors"
						>
							Hydrogen
						</Link>
						<Link
							href="/collections/automated-collection"
							className="text-sm font-medium text-body hover:text-heading transition-colors"
						>
							Automated
						</Link>
						<Link
							href="/collections/frontpage"
							className="text-sm font-medium text-body hover:text-heading transition-colors"
						>
							Home Collection
						</Link>
					</nav>

					<div className="flex items-center gap-4">
						<button
							type="button"
							className="group flex items-center p-2 text-body hover:text-heading transition-colors cursor-pointer relative"
							onClick={openCart}
							aria-label="Open cart"
						>
							<ShoppingBag className="h-5 w-5" />
							{cartCount > 0 && (
								<span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white font-mono">
									{cartCount}
								</span>
							)}
						</button>
					</div>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="lg:hidden border-t border-border bg-background px-4 py-4 space-y-4">
					<form onSubmit={handleSearch} className="relative mb-4">
						<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
						<input
							type="text"
							name="q"
							placeholder="Search products..."
							className="w-full h-10 pl-9 pr-4 rounded-sm border border-border bg-white text-sm"
						/>
					</form>
					<Link
						href="/collections/all"
						className="block text-sm font-medium text-body hover:text-heading"
					>
						All Products
					</Link>
					<Link
						href="/collections/hydrogen"
						className="block text-sm font-medium text-body hover:text-heading"
					>
						Hydrogen
					</Link>
					<Link
						href="/collections/automated-collection"
						className="block text-sm font-medium text-body hover:text-heading"
					>
						Automated
					</Link>
					<Link
						href="/collections/frontpage"
						className="block text-sm font-medium text-body hover:text-heading"
					>
						Home Collection
					</Link>
				</div>
			)}
		</header>
	);
}