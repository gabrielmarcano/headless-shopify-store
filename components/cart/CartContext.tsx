"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { addToCart, createCart, getCart, removeFromCart } from "@/lib/shopify";
import type { Cart } from "@/lib/types";

type CartContextType = {
	cart: Cart | undefined;
	addItem: (variantId: string) => Promise<void>;
	removeItem: (lineId: string) => Promise<void>;
	openCart: () => void;
	closeCart: () => void;
	isCartOpen: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Cart | undefined>(undefined);
	const [isCartOpen, setIsCartOpen] = useState(false);

	useEffect(() => {
		const checkCart = async () => {
			const storedId = localStorage.getItem("shopify_cart_id");
			if (storedId) {
				const existingCart = await getCart(storedId);
				if (existingCart) {
					setCart(existingCart);
				} else {
					localStorage.removeItem("shopify_cart_id");
				}
			}
		};
		checkCart();
	}, []);

	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);

	const addItem = async (variantId: string) => {
		let newCart: Cart;
		if (!cart?.id) {
			newCart = await createCart(variantId);
			localStorage.setItem("shopify_cart_id", newCart.id);
		} else {
			newCart = await addToCart(cart.id, variantId);
		}
		setCart(newCart);
		openCart();
	};

	const removeItem = async (lineId: string) => {
		if (!cart?.id) return;
		const updatedCart = await removeFromCart(cart.id, lineId);
		setCart(updatedCart);
	};

	return (
		<CartContext.Provider
			value={{ cart, addItem, removeItem, openCart, closeCart, isCartOpen }}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
