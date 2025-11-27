import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { getCollectionProducts } from "@/lib/shopify";

interface CollectionPageProps {
	params: Promise<{ handle: string }>;
}

export async function generateMetadata({
	params,
}: CollectionPageProps): Promise<Metadata> {
	const { handle } = await params;
	const collection = await getCollectionProducts(handle);

	if (!collection) return { title: "Collection Not Found" };

	return {
		title: `${collection.title} | Headless Store`,
		description: `Browse our ${collection.title} collection.`,
	};
}

export default async function CollectionPage({ params }: CollectionPageProps) {
	const { handle } = await params;
	const collection = await getCollectionProducts(handle);

	if (!collection) {
		return notFound();
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
				{collection.title}
			</h1>

			{collection.products.edges.length === 0 ? (
				<p className="text-gray-500">No products found in this collection.</p>
			) : (
				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{collection.products.edges.map((item) => (
						<ProductCard key={item.node.id} product={item.node} />
					))}
				</div>
			)}
		</div>
	);
}
