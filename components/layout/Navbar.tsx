import { ShoppingBag } from "lucide-react"; // You might need to install lucide-react
import Link from "next/link";

export function Navbar() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link
					href="/"
					className="text-xl font-bold tracking-tight text-gray-900"
				>
					STORE<span className="text-blue-600">FRONT</span>
				</Link>

				{/* Navigation Links */}
				<div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
					<Link href="/" className="hover:text-blue-600 transition-colors">
						New Arrivals
					</Link>
					<Link href="#" className="hover:text-blue-600 transition-colors">
						Accessories
					</Link>
					<Link href="#" className="hover:text-blue-600 transition-colors">
						Sale
					</Link>
				</div>

				{/* Cart Icon (Placeholder for now) */}
				<div className="flex items-center">
					<button type="button" className="group -m-2 flex items-center p-2">
						<ShoppingBag
							className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
							aria-hidden="true"
						/>
						<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
							0
						</span>
						<span className="sr-only">items in cart, view bag</span>
					</button>
				</div>
			</div>
		</nav>
	);
}
