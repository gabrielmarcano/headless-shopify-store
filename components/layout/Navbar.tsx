"use client";

import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";

export function Navbar() {
	const { cart, openCart } = useCart();

	// Calculate total quantity of all items in the cart
	const cartCount =
		cart?.lines?.edges.reduce((total, item) => {
			return total + item.node.quantity;
		}, 0) || 0;

	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link
					href="/"
					className="text-xl font-bold tracking-tight text-gray-900"
				>
					STORE<span className="text-blue-600">FRONT</span>
				</Link>

				{/* SEARCH BAR (New Feature) */}
				<div className="hidden md:flex flex-1 max-w-md mx-8">
					<form action="/search" className="relative w-full">
						<input
							type="text"
							name="q"
							placeholder="Search for products..."
							className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none transition-all"
						/>
						<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
					</form>
				</div>

				{/* Navigation Links (Simplified for space) */}
				<div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
					<Link href="/collections/all" className="hover:text-blue-600">
						All
					</Link>
					<Link href="/collections/hydrogen" className="hover:text-blue-600">
						Hydrogen
					</Link>
				</div>

				{/* Cart Icon */}
				<div className="flex items-center">
					<button
						type="button"
						className="group -m-2 flex items-center p-2"
						onClick={openCart}
					>
						<div className="relative">
							<ShoppingBag
								className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
								aria-hidden="true"
							/>
							{cartCount > 0 && (
								<span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
									{cartCount}
								</span>
							)}
						</div>

						{/* Desktop Text Label (Optional, often hidden on mobile) */}
						<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 sr-only sm:not-sr-only">
							{cartCount}
						</span>
						<span className="sr-only">items in cart, view bag</span>
					</button>
				</div>
			</div>
		</nav>
	);
}
