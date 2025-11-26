import { getProductsInCollection } from "@/lib/shopify";
import Image from "next/image";

export default async function Home() {
  const products = await getProductsInCollection();

  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">My Headless Store</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((item) => {
          const product = item.node;
          console.log(product);
          const image = product.images.edges[0]?.node || {};

          
          return (
            <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <div className="relative w-full h-64 mb-4">
                 <Image
                   src={image.url}
                   alt={image.altText || "Product Image"}
                   fill
                   className="object-cover rounded"
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 />
              </div>
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600">
                ${product.priceRange.minVariantPrice.amount}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}