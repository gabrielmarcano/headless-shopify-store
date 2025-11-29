import { getProductRecommendations } from "@/lib/shopify";
import { ProductGrid } from "./ProductGrid";

export async function RelatedProducts({ id }: { id: string }) {
	const products = await getProductRecommendations(id);

	if (!products || products.length === 0) return null;

	const limitedProducts = products.slice(0, 4);

	return (
		<div className="mt-16 border-t pt-16">
			<h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
				You Might Also Like
			</h2>
			<ProductGrid products={limitedProducts} />
		</div>
	);
}
