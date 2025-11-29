import Image from "next/image";
import Link from "next/link";

export function Hero() {
	return (
		<div className="relative bg-gray-900 h-[600px] flex items-center">
			<div className="absolute inset-0 overflow-hidden">
				<Image
					src="https://images.unsplash.com/photo-1522056615691-da7b8106c665?q=80&w=2669&auto=format&fit=crop"
					alt="Hero background"
					fill
					className="object-cover opacity-50"
					priority
				/>
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
				<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
					Summer 2025 Drop
				</h1>
				<p className="mt-6 text-xl text-gray-300 max-w-3xl">
					Our latest collection of premium streetwear is here. Designed for
					comfort, engineered for style.
				</p>
				<div className="mt-10 flex gap-4 justify-center sm:justify-start">
					<Link
						href="/collections/all"
						className="inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
					>
						Shop All
					</Link>
					<Link
						href="/collections/automated-collection"
						className="inline-block rounded-md border border-white px-8 py-3 text-base font-medium text-white hover:bg-white/10"
					>
						View Snowboards
					</Link>
				</div>
			</div>
		</div>
	);
}
