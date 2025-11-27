"use client";

import { Loader2, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "./CartContext";

export function CartDrawer() {
	const { cart, isCartOpen, closeCart } = useCart();

	// --- NEW CALCULATION LOGIC ---
	const cartTotal =
		cart?.lines.edges.reduce((total, { node }) => {
			return total + parseFloat(node.merchandise.price.amount) * node.quantity;
		}, 0) || 0;

	// Grab currency from the first item, or default to USD
	const currencyCode =
		cart?.lines.edges[0]?.node.merchandise.price.currencyCode || "USD";
	// -----------------------------

	if (!isCartOpen) return null;

	return (
		<div className="fixed inset-0 z-100 flex justify-end">
			<button
				type="button"
				className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity cursor-default w-full h-full border-none"
				onClick={closeCart}
				aria-label="Close cart overlay"
			/>

			<div className="relative w-full max-w-md bg-white shadow-xl h-full flex flex-col animate-in slide-in-from-right duration-300 z-10">
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
					<button
						type="button"
						onClick={closeCart}
						className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto p-4 space-y-6">
					{!cart || cart.lines.edges.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
							<ShoppingBag className="w-16 h-16 opacity-20" />
							<p>Your cart is empty.</p>
						</div>
					) : (
						cart.lines.edges.map((item) => (
							<div key={item.node.id} className="flex gap-4">
								<div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0">
									{item.node.merchandise.image && (
										<Image
											src={item.node.merchandise.image.url}
											alt={
												item.node.merchandise.image.altText || "Product Image"
											}
											fill
											className="object-cover"
										/>
									)}
								</div>
								<div className="flex flex-col flex-1 justify-between">
									<div>
										<div className="flex justify-between items-start">
											<h3 className="text-base font-medium text-gray-900 line-clamp-2">
												{item.node.merchandise.product.title}
											</h3>
											<RemoveButton lineId={item.node.id} />
										</div>
										<p className="mt-1 text-sm text-gray-500">
											{item.node.merchandise.title}
										</p>
									</div>
									<div className="flex items-center justify-between">
										<p className="text-sm text-gray-500">
											Qty {item.node.quantity}
										</p>
										<p className="text-sm font-medium text-gray-900">
											{formatPrice(
												item.node.merchandise.price.amount,
												item.node.merchandise.price.currencyCode,
											)}
										</p>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				{cart && cart.lines.edges.length > 0 && (
					<div className="p-4 border-t bg-gray-50">
						<div className="flex justify-between text-base font-medium text-gray-900 mb-4">
							<p>Subtotal</p>
							{/* --- USE THE CALCULATED TOTAL --- */}
							<p>{formatPrice(cartTotal.toString(), currencyCode)}</p>
						</div>
						<a
							href={cart.checkoutUrl}
							className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
						>
							Checkout
						</a>
					</div>
				)}
			</div>
		</div>
	);
}

function RemoveButton({ lineId }: { lineId: string }) {
	const { removeItem } = useCart();
	const [isRemoving, setIsRemoving] = useState(false);

	const handleRemove = async () => {
		setIsRemoving(true);
		await removeItem(lineId);
		setIsRemoving(false);
	};

	return (
		<button
			type="button"
			onClick={handleRemove}
			disabled={isRemoving}
			className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
			aria-label="Remove item"
		>
			{isRemoving ? (
				<Loader2 className="w-4 h-4 animate-spin" />
			) : (
				<Trash2 className="w-4 h-4" />
			)}
		</button>
	);
}
