import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
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
			.replace(/<[^>]*>?/gm, ""),
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

	const selectedVariant =
		product.variants.edges.find(({ node: variant }) => {
			return variant.selectedOptions.every((option) => {
				const paramValue = resolvedSearchParams[option.name];
				return paramValue ? paramValue === option.value : true;
			});
		})?.node || product.variants.edges[0].node;

	const image = selectedVariant.image || product.images.edges[0]?.node;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.title,
		description: product.descriptionHtml.replace(/<[^>]*>?/gm, ""),
		image: image?.url,
		offers: {
			"@type": "Offer",
			availability: selectedVariant.availableForSale
				? "https://schema.org/InStock"
				: "https://schema.org/OutOfStock",
			price: selectedVariant.price.amount,
			priceCurrency: selectedVariant.price.currencyCode,
		},
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Shopify content is trusted
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd),
				}}
			/>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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

					<VariantSelector options={product.options} />

					<div
						className="prose prose-sm text-gray-500"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Shopify content is trusted
						dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
					/>

					<div className="mt-6">
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
