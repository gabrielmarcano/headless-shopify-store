"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ProductOption } from "@/lib/types";

export function VariantSelector({ options }: { options: ProductOption[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasNoOptions = options.length === 1 && options[0].values[0] === "Default Title";
  if (hasNoOptions) return null;

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
    <div className="space-y-6">
      {options.map((option) => (
        <div key={option.id}>
          <h3 className="text-xs font-bold text-heading uppercase tracking-wide mb-3 font-sans">
            {option.name}
          </h3>
          <div className="flex flex-wrap gap-3">
            {option.values.map((value) => {
              const active = isActive(option.name, value);
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(option.name, value)}
                  className={`
                    px-6 py-2 text-sm border rounded-full transition-all font-mono cursor-pointer
                    ${active 
                      ? "border-accent bg-accent text-white shadow-sm" 
                      : "border-border bg-surface text-body hover:border-gray-400 hover:text-heading"
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