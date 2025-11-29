"use client";

import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}