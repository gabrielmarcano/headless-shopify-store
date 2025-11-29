"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const currentSort = searchParams.get("sort") || "relevance";

	return (
		<div className="flex items-center gap-2">
			<label htmlFor="sort" className="text-sm text-gray-700">
				Sort by:
			</label>
			<select
				id="sort"
				value={currentSort}
				onChange={(e) => {
					const params = new URLSearchParams(searchParams.toString());

					params.set("sort", e.target.value);

					router.push(`?${params.toString()}`);
				}}
				className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-black"
			>
				<option value="relevance">Relevance</option>
				<option value="price-asc">Price: Low to High</option>
				<option value="price-desc">Price: High to Low</option>
			</select>
		</div>
	);
}
