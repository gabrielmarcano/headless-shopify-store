import { getProductsInCollection, getCollections } from "@/lib/shopify";
import { Hero } from "@/components/home/Hero";
import Link from "next/link";
import Image from "next/image";
import type { Product, Collection } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

export default async function Home() {
  const products = await getProductsInCollection(8);
  const collections = await getCollections();

  return (
    <div className="bg-background min-h-screen pb-24">
      <Hero />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 -mt-24 relative z-20">
        
        
        <section>
          <h2 className="sr-only">Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.slice(0, 3).map((item: { node: Collection }) => {
              const collection = item.node;
              return (
                <Link 
                  key={collection.id} 
                  href={`/collections/${collection.handle}`}
                  className="group relative h-[400px] overflow-hidden rounded-sm bg-gray-900 border border-border shadow-xl"
                >
                  {collection.image && (
                    <Image
                      src={collection.image.url}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-8 border-l-4 border-accent pl-4">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                      {collection.title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                      Explore Category &rarr;
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-border pb-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tighter text-heading uppercase">
                New Arrivals
              </h2>
              <p className="text-body mt-2 text-sm">
                The latest gear dropped this week.
              </p>
            </div>
            <Link 
              href="/collections/all" 
              className="text-sm font-medium text-accent hover:text-heading transition-colors mt-4 md:mt-0"
            >
              View all products &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((item: { node: Product }) => (
              <ProductCard key={item.node.id} product={item.node} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}