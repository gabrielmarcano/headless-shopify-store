// --- PRODUCT TYPES ---
export type Product = {
	id: string;
	title: string;
	handle: string;
	priceRange: {
		minVariantPrice: {
			amount: string;
			currencyCode: string;
		};
	};
	images: {
		edges: Array<{
			node: {
				url: string;
				altText: string;
			};
		}>;
	};
};

export type ProductByHandle = Product & {
	descriptionHtml: string;
	variants: {
		edges: Array<{
			node: {
				id: string;
				title: string;
			};
		}>;
	};
};

// --- CART TYPES ---
export type CartLine = {
	node: {
		id: string;
		quantity: number;
		merchandise: {
			id: string;
			title: string;
			image: {
				url: string;
				altText: string;
			};
			product: {
				title: string;
				handle: string;
			};
			price: {
				amount: string;
				currencyCode: string;
			};
		};
	};
};

export type Cart = {
	id: string;
	checkoutUrl: string;
	lines: {
		edges: Array<CartLine>;
	};
};

// --- API RESPONSE WRAPPERS ---

export type ShopifyResponse<Data> = {
	data: Data;
	errors?: Array<{ message: string }>; // Added error typing
};

export type ProductsResponse = ShopifyResponse<{
	products: {
		edges: Array<{ node: Product }>;
	};
}>;

export type ProductResponse = ShopifyResponse<{
	product: ProductByHandle;
}>;

export type CollectionResponse = ShopifyResponse<{
	collectionByHandle: {
		title: string;
		products: {
			edges: Array<{ node: Product }>;
		};
	} | null;
}>;

export type SearchResponse = ShopifyResponse<{
	search: {
		edges: Array<{ node: Product }>;
	};
}>;

export type CartCreateResponse = ShopifyResponse<{
	cartCreate: {
		cart: Cart;
	};
}>;

export type CartAddResponse = ShopifyResponse<{
	cartLinesAdd: {
		cart: Cart;
	};
}>;

export type CartRemoveResponse = ShopifyResponse<{
	cartLinesRemove: {
		cart: Cart;
	};
}>;

export type GetCartResponse = ShopifyResponse<{
	cart: Cart;
}>;
