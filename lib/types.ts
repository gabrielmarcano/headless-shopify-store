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
	options: ProductOption[]; // <--- NEW
	variants: {
		edges: Array<{
			node: ProductVariant; // <--- UPDATED (was simple object before)
		}>;
	};
};

export type ProductOption = {
	id: string;
	name: string;
	values: string[];
};

export type SelectedOption = {
	name: string;
	value: string;
};

export type ProductVariant = {
	id: string;
	title: string;
	availableForSale: boolean;
	selectedOptions: SelectedOption[];
	price: {
		amount: string;
		currencyCode: string;
	};
	image?: {
		url: string;
		altText: string;
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

export type Collection = {
	id: string;
	title: string;
	handle: string;
	image?: {
		url: string;
		altText: string;
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

export type CollectionsResponse = ShopifyResponse<{
	collections: {
		edges: Array<{ node: Collection }>;
	};
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

export type ProductRecommendationsResponse = ShopifyResponse<{
	productRecommendations: Product[];
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
