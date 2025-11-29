import { getCollectionProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import { SortSelect } from "@/components/search/SortSelect";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionProducts(handle);

  if (!collection) return { title: "Collection Not Found" };

  return {
    title: `${collection.title} | Headless Store`,
    description: `Browse our ${collection.title} collection.`,
  };
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { handle } = await params;
  const { sort } = await searchParams;

  let sortKey = 'COLLECTION_DEFAULT';
  let reverse = false;

  switch (sort) {
    case 'price-asc':
      sortKey = 'PRICE';
      reverse = false;
      break;
    case 'price-desc':
      sortKey = 'PRICE';
      reverse = true;
      break;
    case 'created-desc':
        sortKey = 'CREATED';
        reverse = true;
        break;
  }

  const collection = await getCollectionProducts(handle, sortKey, reverse);

  if (!collection) {
    return notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-border gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-heading uppercase">
              {collection.title}
            </h1>
            <p className="text-body mt-2">
              {collection.products.edges.length} Products Available
            </p>
          </div>
          
          <div className="w-full md:w-auto flex justify-end">
            <SortSelect />
          </div>
        </div>
        
        {collection.products.edges.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-border rounded-sm">
            <p className="text-lg text-body">No products found in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {collection.products.edges.map((item) => (
              <ProductCard key={item.node.id} product={item.node} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}