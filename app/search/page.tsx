import { ProductCard } from "@/components/product/ProductCard";
import { SortSelect } from "@/components/search/SortSelect";
import { searchProducts } from "@/lib/shopify";
import type { Product } from "@/lib/types";

export const metadata = {
	title: "Search Results",
	description: "Search for products in our store.",
};

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	const query = (params.q as string) || "";
	const sort = (params.sort as string) || "relevance";

	let sortKey = "RELEVANCE";
	let reverse = false;

	switch (sort) {
		case "price-asc":
			sortKey = "PRICE";
			reverse = false;
			break;
		case "price-desc":
			sortKey = "PRICE";
			reverse = true;
			break;
	}

	const products = query
		? await searchProducts(query, sortKey, reverse)
		: { edges: [] };

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="flex justify-between items-end mb-8">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900">
					{query ? `Results for "${query}"` : "Search"}
				</h1>

				{products.edges.length > 0 && <SortSelect />}
			</div>

			{products.edges.length === 0 ? (
				<div className="text-center py-20">
					<p className="text-xl text-gray-500">No results found.</p>
					<p className="text-gray-400">
						Try searching for "snowboard" or "shirt".
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.edges.map((item: { node: Product }) => (
						<ProductCard key={item.node.id} product={item.node} />
					))}
				</div>
			)}
		</div>
	);
}
