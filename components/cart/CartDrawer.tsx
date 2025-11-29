"use client";

import { ShoppingBag, X, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCart } from "./CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { cart, isCartOpen, closeCart } = useCart();

  const cartTotal =
    cart?.lines.edges.reduce((total, { node }) => {
      return total + parseFloat(node.merchandise.price.amount) * node.quantity;
    }, 0) || 0;

  const currencyCode =
    cart?.lines.edges[0]?.node.merchandise.price.currencyCode || "USD";

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-100 flex w-full max-w-md flex-col bg-surface shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold font-sans text-heading">Shopping Cart</h2>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 text-body hover:text-heading hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {!cart || cart.lines.edges.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-body space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.lines.edges.map((item) => (
                  <div key={item.node.id} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-sm overflow-hidden shrink-0 border border-border">
                      {item.node.merchandise.image && (
                        <Image
                          src={item.node.merchandise.image.url}
                          alt={item.node.merchandise.image.altText || "Product Image"}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-medium text-heading line-clamp-2">
                            {item.node.merchandise.product.title}
                          </h3>
                          <RemoveButton lineId={item.node.id} />
                        </div>
                        <p className="mt-1 text-sm text-body">
                          {item.node.merchandise.title}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-body">
                          Qty {item.node.quantity}
                        </p>
                        <p className="text-sm font-mono font-medium text-heading">
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
              <div className="p-4 border-t border-border bg-background">
                <div className="mb-4">
                   <div className="flex justify-between text-xs mb-1 text-body">
                      <span>Free Shipping</span>
                      <span>{cartTotal > 200 ? "Qualified!" : `${formatPrice((200 - cartTotal).toString())} away`}</span>
                   </div>
                   <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((cartTotal / 200) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-accent"
                      />
                   </div>
                </div>

                <div className="flex justify-between text-base font-medium text-heading mb-4">
                  <p>Subtotal</p>
                  <p className="font-mono">{formatPrice(cartTotal.toString(), currencyCode)}</p>
                </div>
                <a
                  href={cart.checkoutUrl}
                  className="flex w-full items-center justify-center rounded-sm border border-transparent bg-accent px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-accent-hover transition-colors cursor-pointer"
                >
                  Checkout
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
      className="ml-2 p-1 text-body hover:text-red-500 transition-colors cursor-pointer"
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