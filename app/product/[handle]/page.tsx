import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/product/AddToCart";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { VariantSelector } from "@/components/product/VariantSelector";
import { getProductByHandle } from "@/lib/shopify";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.title} | Headless Store`,
    description: product.descriptionHtml
      .substring(0, 160)
      .replace(/<[^>]*>?/gm, ""),
    openGraph: {
      images: [
        {
          url: `/og?title=${encodeURIComponent(product.title)}&subtitle=${encodeURIComponent(product.priceRange.minVariantPrice.amount)}`,
          width: 1200,
          height: 630,
        }
      ]
    }
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { handle } = await params;
  const resolvedSearchParams = await searchParams;

  const product = await getProductByHandle(handle);

  if (!product) return notFound();

  const selectedVariant =
    product.variants.edges.find(({ node: variant }) => {
      return variant.selectedOptions.every((option) => {
        const paramValue = resolvedSearchParams[option.name];
        return paramValue ? paramValue === option.value : true;
      });
    })?.node || product.variants.edges[0].node;

  const mainImage = selectedVariant.image || product.images.edges[0]?.node;
  const allImages = product.images.edges.map((edge) => edge.node);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.descriptionHtml.replace(/<[^>]*>?/gm, ""),
    image: mainImage?.url,
    offers: {
      "@type": "Offer",
      availability: selectedVariant.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      price: selectedVariant.price.amount,
      priceCurrency: selectedVariant.price.currencyCode,
    },
  };

  return (
    <div className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted Shopify Data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "All Products", href: "/collections/all" },
            { name: product.title, href: `/product/${product.handle}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/5 bg-surface rounded-sm border border-border overflow-hidden">
              {mainImage && (
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  fill
                  className="object-contain object-center p-8"
                  priority
                />
              )}
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {allImages.slice(1, 5).map((image, i) => (
                  <div key={image.url} className="relative aspect-square bg-surface rounded-sm border border-border overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.altText || `Detail ${i}`}
                      fill
                      className="object-contain object-center p-4 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-10">
            
            <div className="space-y-4 border-b border-border pb-8">
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-heading leading-tight">
                {product.title}
              </h1>
              <p className="text-3xl font-mono text-heading">
                {formatPrice(
                  selectedVariant.price.amount,
                  selectedVariant.price.currencyCode,
                )}
              </p>
            </div>

            <div 
              className="prose prose-sm text-body leading-relaxed max-w-none"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted Content
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            <VariantSelector options={product.options} />

            <div className="space-y-4 pt-4">
              {selectedVariant.availableForSale ? (
                <AddToCart variantId={selectedVariant.id} />
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-4 rounded-sm font-bold cursor-not-allowed uppercase tracking-wide"
                >
                  Out of Stock
                </button>
              )}
              <p className="text-xs text-center text-body uppercase tracking-widest">
                Free shipping on orders over $200
              </p>
            </div>

            <div className="border-t border-border pt-8 mt-8">
              <h3 className="font-bold text-heading uppercase tracking-wide text-xs mb-4">Technical Specs</h3>
              <ul className="space-y-2 text-sm font-mono text-body">
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Core</span>
                  <span className="text-heading">Poplar / Paulownia</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Flex</span>
                  <span className="text-heading">7/10 (Stiff)</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Shape</span>
                  <span className="text-heading">Twin Directional</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>Base</span>
                  <span className="text-heading">Sintered 4000</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <RelatedProducts id={product.id} />
      </div>
    </div>
  );
}