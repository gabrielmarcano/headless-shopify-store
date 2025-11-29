import { ChevronRight } from "lucide-react";
import Link from "next/link";

type BreadcrumbItem = {
	name: string;
	href: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
	return (
		<nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
			<Link href="/" className="hover:text-gray-900 transition-colors">
				Home
			</Link>
			{items.map((item) => (
				<div key={item.name} className="flex items-center space-x-2">
					<ChevronRight className="w-4 h-4" />
					<Link
						href={item.href}
						className="hover:text-gray-900 transition-colors"
					>
						{item.name}
					</Link>
				</div>
			))}
		</nav>
	);
}
