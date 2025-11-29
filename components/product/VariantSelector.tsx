"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductOption } from "@/lib/types";

export function VariantSelector({ options }: { options: ProductOption[] }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isActive = (name: string, value: string) => {
		const currentValue = searchParams.get(name);
		return currentValue === value;
	};

	const handleSelect = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="space-y-4 mb-6">
			{options.map((option) => (
				<div key={option.id}>
					<h3 className="text-sm font-medium text-gray-900 mb-2">
						{option.name}
					</h3>
					<div className="flex flex-wrap gap-2">
						{option.values.map((value) => {
							const active = isActive(option.name, value);
							return (
								<button
									type="button"
									key={value}
									onClick={() => handleSelect(option.name, value)}
									className={`
                    px-4 py-2 text-sm border rounded-full transition-all
                    ${
											active
												? "border-blue-600 bg-blue-600 text-white"
												: "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
										}
                  `}
								>
									{value}
								</button>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
}
