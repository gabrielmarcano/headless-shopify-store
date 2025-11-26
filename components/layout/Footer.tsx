export function Footer() {
	return (
		<footer className="bg-gray-50 border-t mt-auto">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<p className="text-center text-xs leading-5 text-gray-500">
					&copy; {new Date().getFullYear()} Headless Storefront, Inc. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
}
