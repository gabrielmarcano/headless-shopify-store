import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-heading flex items-center justify-center">
      
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522056615691-da7b8106c665?q=80&w=2669&auto=format&fit=crop"
          alt="Snowboarder in deep powder"
          fill
          className="object-cover opacity-60"
          priority
        />
			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white uppercase leading-none drop-shadow-lg">
          Hydrogen Collection
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
          Engineered for peak performance and unparalleled style. 
          Discover the future of snowboarding with our latest technical drop.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/collections/all"
            className="px-8 py-4 bg-accent text-white font-bold uppercase tracking-wide text-sm rounded-sm hover:bg-accent-hover transition-colors shadow-lg"
          >
            Shop Collection
          </Link>
          <Link
            href="/collections/automated-collection"
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold uppercase tracking-wide text-sm rounded-sm hover:bg-white/20 transition-colors"
          >
            View Boards
          </Link>
        </div>
      </div>
    </div>
  );
}