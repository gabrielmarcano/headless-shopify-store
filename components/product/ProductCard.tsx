"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  
  const defaultVariantId = product.variants?.edges[0]?.node?.id;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!defaultVariantId) return;
    
    setIsAdding(true);
    await addItem(defaultVariantId);
    setIsAdding(false);
  };

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-surface border border-border flex items-center justify-center p-6 transition-colors hover:border-gray-300">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image
          </div>
        )}

        {defaultVariantId && (
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-accent hover:bg-accent-hover text-white p-2 rounded-full shadow-sm z-10"
            aria-label="Quick Add"
          >
            {isAdding ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      <div className="mt-4 flex justify-between items-start gap-4">
        <div>
          <h3 className="text-sm font-medium text-heading group-hover:text-accent transition-colors">
            {product.title}
          </h3>
          <p className="mt-1 text-xs text-body">
             Snowboard
          </p>
        </div>
        <p className="text-sm font-mono font-medium text-heading">
          {formatPrice(price.amount, price.currencyCode)}
        </p>
      </div>
    </Link>
  );
}