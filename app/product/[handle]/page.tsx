import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/product/AddToCart";
import { getProductByHandle } from "@/lib/shopify";
import { formatPrice } from "@/lib/utils";

interface ProductPageProps {
	params: Promise<{ handle: string }>;
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

export default async function ProductPage({ params }: ProductPageProps) {
	// Await params because in Next.js 15 params are async
	const { handle } = await params;
	const product = await getProductByHandle(handle);

	if (!product) {
		return notFound();
	}

	const image = product.images.edges[0]?.node;
	const variantId = product.variants.edges[0].node.id;

	return (
		<div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
				{/* Left Column: Image Gallery */}
				<div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
					{image && (
						<Image
							src={image.url}
							alt={image.altText || product.title}
							fill
							className="object-cover object-center"
							priority // Loads this image immediately (good for LCP score)
						/>
					)}
				</div>

				{/* Right Column: Product Details */}
				<div className="flex flex-col space-y-8">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">
							{product.title}
						</h1>
						<p className="mt-4 text-2xl tracking-tight text-gray-900">
							{formatPrice(
								product.priceRange.minVariantPrice.amount,
								product.priceRange.minVariantPrice.currencyCode,
							)}
						</p>
					</div>

					{/* Description (Rendered from HTML) */}
					<div
						className="prose prose-sm text-gray-500"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Ignore for now
						dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
					/>

					{/* Add to Cart Section */}
					<div className="mt-6">
						<div className="mt-6">
							<AddToCart variantId={variantId} />
						</div>
						<p className="mt-2 text-xs text-center text-gray-400">
							Free shipping on all orders.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
