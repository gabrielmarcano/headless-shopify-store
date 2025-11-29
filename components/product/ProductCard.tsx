import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	const image = product.images.edges[0]?.node;
	const price = product.priceRange.minVariantPrice;

	return (
		<Link
			href={`/product/${product.handle}`}
			className="group block overflow-hidden"
		>
			<div className="relative aspect-square sm:aspect-4/5 bg-gray-100 rounded-lg overflow-hidden border border-transparent group-hover:border-gray-200 transition-colors">
				{image ? (
					<Image
						src={image.url}
						alt={image.altText || product.title}
						fill
						className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
						sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
					/>
				) : (
					<div className="flex items-center justify-center h-full text-gray-400">
						No Image
					</div>
				)}
			</div>

			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
				</div>
				<p className="text-sm font-medium text-gray-900">
					{formatPrice(price.amount, price.currencyCode)}
				</p>
			</div>
		</Link>
	);
}
