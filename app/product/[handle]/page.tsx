import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AddToCart } from "@/components/product/AddToCart";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { VariantSelector } from "@/components/product/VariantSelector";
import { getProductByHandle } from "@/lib/shopify";
import { formatPrice } from "@/lib/utils";

interface ProductPageProps {
	params: Promise<{ handle: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
	params,
}: ProductPageProps): Promise<Metadata> {
	const { handle } = await params;
	const product = await getProductByHandle(handle);

	if (!product) return { title: "Product Not Found" };

	return {
		title: `${product.title} | Headless Store`,
		description: product.descriptionHtml
			.substring(0, 160)
			.replace(/<[^>]*>?/gm, ""), // Strip HTML tags for SEO
		openGraph: {
			images: [product.images.edges[0]?.node.url],
		},
	};
}

export default async function ProductPage({
	params,
	searchParams,
}: ProductPageProps) {
	const { handle } = await params;
	const resolvedSearchParams = await searchParams;

	const product = await getProductByHandle(handle);

	if (!product) return notFound();

	// --- LOGIC: FIND SELECTED VARIANT ---
	// 1. Iterate through all variants
	const selectedVariant =
		product.variants.edges.find(({ node: variant }) => {
			// 2. Check if every option in the variant matches the URL params
			return variant.selectedOptions.every((option) => {
				// If URL has ?Size=Large, we check if this variant's Size is Large.
				// If URL param is missing, we default to the first value (Shopify logic).
				const paramValue = resolvedSearchParams[option.name];
				return paramValue ? paramValue === option.value : true;
			});
		})?.node || product.variants.edges[0].node; // Fallback to first variant if no match

	// --- END LOGIC ---

	const image = selectedVariant.image || product.images.edges[0]?.node; // Use variant image if available

	return (
		<div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
			<Breadcrumbs
				items={[
					{ name: "Products", href: "/collections/all" },
					{ name: product.title, href: `/product/${product.handle}` },
				]}
			/>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
				{/* Image Column */}
				<div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
					{image && (
						<Image
							src={image.url}
							alt={image.altText || product.title}
							fill
							className="object-cover object-center"
							priority
						/>
					)}
				</div>

				{/* Details Column */}
				<div className="flex flex-col space-y-8">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">
							{product.title}
						</h1>
						<p className="mt-4 text-2xl tracking-tight text-gray-900">
							{formatPrice(
								selectedVariant.price.amount,
								selectedVariant.price.currencyCode,
							)}
						</p>
					</div>

					{/* --- VARIANT SELECTOR --- */}
					<VariantSelector options={product.options} />

					<div
						className="prose prose-sm text-gray-500"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Shopify content is trusted
						dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
					/>

					<div className="mt-6">
						{/* Pass selectedVariant.availableForSale to disable button if OOS */}
						{selectedVariant.availableForSale ? (
							<AddToCart variantId={selectedVariant.id} />
						) : (
							<button
								type="button"
								disabled
								className="w-full bg-gray-300 text-white py-3 rounded-md cursor-not-allowed"
							>
								Out of Stock
							</button>
						)}
						<p className="mt-2 text-xs text-center text-gray-400">
							Free shipping on all orders.
						</p>
					</div>
				</div>
			</div>

			<RelatedProducts id={product.id} />
		</div>
	);
}
