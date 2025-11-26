"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";

export function AddToCart({ variantId }: { variantId: string }) {
	const { addItem } = useCart();
	const [isPending, setIsPending] = useState(false);

	const handleAdd = async () => {
		setIsPending(true);
		await addItem(variantId);
		setIsPending(false);
	};

	return (
		<button
			type="button"
			onClick={handleAdd}
			disabled={isPending}
			className={`w-full flex items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white transition-colors
        ${isPending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
      `}
		>
			{isPending ? "Adding..." : "Add to Cart"}
		</button>
	);
}
