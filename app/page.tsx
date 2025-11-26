import { getProductsInCollection } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/lib/types";

export default async function Home() {
  const products = await getProductsInCollection();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
        New Arrivals
      </h1>
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((item: { node: Product }) => (
          <ProductCard key={item.node.id} product={item.node} />
        ))}
      </div>
    </main>
  );
}