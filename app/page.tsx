import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ProductCard } from "@/components/ProductCard";
import { getCollections, getProductsInCollection } from "@/lib/shopify";
import type { Collection, Product } from "@/lib/types"; // Import Collection type

export default async function Home() {
	const products = await getProductsInCollection(8);
	const collections = await getCollections();

	return (
		<div>
			<Hero />

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
				{/* SECTION 1: Shop by Category */}
				<section>
					<h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
						Shop by Category
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Typed correctly now: item.node is a Collection */}
						{collections.map((item: { node: Collection }) => {
							const collection = item.node;
							return (
								<Link
									key={collection.id}
									href={`/collections/${collection.handle}`}
									className="group relative h-64 overflow-hidden rounded-lg bg-gray-200"
								>
									{collection.image && (
										<Image
											src={collection.image.url}
											alt={collection.title}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
										/>
									)}
									<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
									<div className="absolute bottom-4 left-4">
										<h3 className="text-xl font-bold text-white">
											{collection.title}
										</h3>
									</div>
								</Link>
							);
						})}
					</div>
				</section>

				{/* SECTION 2: New Arrivals */}
				<section>
					<div className="flex justify-between items-end mb-6">
						<h2 className="text-2xl font-bold tracking-tight text-gray-900">
							New Arrivals
						</h2>
						<Link
							href="/collections/all"
							className="text-sm font-medium text-blue-600 hover:text-blue-500"
						>
							View all &rarr;
						</Link>
					</div>

					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{products.map((item: { node: Product }) => (
							<ProductCard key={item.node.id} product={item.node} />
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
