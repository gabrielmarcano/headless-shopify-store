"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { addToCart, createCart } from "@/lib/shopify";

type CartContextType = {
	cartId: string | null;
	addItem: (variantId: string) => Promise<void>;
	openCart: () => void;
	isCartOpen: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cartId, setCartId] = useState<string | null>(null);
	const [isCartOpen, setIsCartOpen] = useState(false);

	// Load Cart ID from local storage on boot
	useEffect(() => {
		const storedId = localStorage.getItem("shopify_cart_id");
		if (storedId) setCartId(storedId);
	}, []);

	const openCart = () => setIsCartOpen(true);

	const addItem = async (variantId: string) => {
		if (!cartId) {
			// Scenario A: No cart exists yet. Create one.
			const newCart = await createCart(variantId);
			setCartId(newCart.id);
			localStorage.setItem("shopify_cart_id", newCart.id);
		} else {
			// Scenario B: Cart exists. Add to it.
			await addToCart(cartId, variantId);
		}
		openCart(); // Open the drawer so user sees the update
	};

	return (
		<CartContext.Provider value={{ cartId, addItem, openCart, isCartOpen }}>
			{children}
		</CartContext.Provider>
	);
}

// Custom Hook to use the context easily
export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
