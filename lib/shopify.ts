"use server";

import type {
	Cart,
	CartAddResponse,
	CartCreateResponse,
	CartRemoveResponse,
	CollectionResponse,
	CollectionsResponse,
	GetCartResponse,
	ProductByHandle,
	ProductRecommendationsResponse,
	ProductResponse,
	ProductsResponse,
	SearchResponse,
} from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData<T>(query: string, variables?: object): Promise<T> {
	if (!domain || !storefrontAccessToken) {
		throw new Error("Missing Shopify API Environment Variables");
	}

	const URL = `https://${domain}/api/2023-10/graphql.json`;

	const options = {
		endpoint: URL,
		method: "POST",
		headers: {
			"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
	};

	try {
		const response = await fetch(URL, options);
		const data = await response.json();

		if (data.errors) {
			console.error("Shopify API Error:", data.errors);
			throw new Error(data.errors[0].message);
		}

		return data as T;
	} catch (error) {
		console.error("Fetch Error:", error);
		throw new Error("Failed to fetch data from Shopify");
	}
}

// --- QUERIES ---

export async function getProductsInCollection(limit = 8) {
	const query = `
  {
    products(first: ${limit}) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }`;

	const response = await ShopifyData<ProductsResponse>(query);
	return response.data.products.edges;
}

export async function getProductByHandle(
	handle: string,
): Promise<ProductByHandle | null> {
	const query = `
  {
    product(handle: "${handle}") {
      id
      title
      handle
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            # --- ADD THIS SECTION ---
            image {
              url
              altText
            }
          }
        }
      }
    }
  }`;

	const response = await ShopifyData<ProductResponse>(query);
	return response.data.product;
}

export async function getCollections() {
	const query = `
  {
    collections(first: 4) {
      edges {
        node {
          id
          title
          handle
          image {
            url
            altText
          }
        }
      }
    }
  }`;

	const response = await ShopifyData<CollectionsResponse>(query);
	return response.data.collections.edges;
}

// src/lib/shopify.ts

// Update the function signature to accept sortKey and reverse
export async function getCollectionProducts(
	handle: string,
	sortKey = "COLLECTION_DEFAULT",
	reverse = false,
) {
	// 1. Handle the "All Products" special case with sorting
	if (handle === "all") {
		// "All Products" query needs a slightly different sort key map if using products query
		// But for simplicity, we can just map 'COLLECTION_DEFAULT' to 'TITLE' or 'CREATED' for 'all'
		const allSortKey = sortKey === "COLLECTION_DEFAULT" ? "TITLE" : sortKey;

		const query = `
    {
      products(first: 20, sortKey: ${allSortKey}, reverse: ${reverse}) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }`;

		const response = await ShopifyData<ProductsResponse>(query);
		return {
			title: "All Products",
			products: response.data.products,
		};
	}

	// 2. The Normal Collection Query
	const query = `
    query getCollectionProducts($handle: String!, $sortKey: ProductCollectionSortKeys!, $reverse: Boolean!) {
      collectionByHandle(handle: $handle) {
        title
        products(first: 20, sortKey: $sortKey, reverse: $reverse) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

	const variables = { handle, sortKey, reverse };
	const response = await ShopifyData<CollectionResponse>(query, variables);
	return response.data.collectionByHandle;
}

export async function searchProducts(
	query: string,
	sortKey = "RELEVANCE",
	reverse = false,
) {
	const gqlQuery = `
    query searchProducts($query: String!, $sortKey: SearchSortKeys!, $reverse: Boolean!) {
      search(query: $query, sortKey: $sortKey, reverse: $reverse, types: PRODUCT, first: 20) {
        edges {
          node {
            ... on Product {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

	const variables = { query, sortKey, reverse };

	const response = await ShopifyData<SearchResponse>(gqlQuery, variables);
	return response.data.search;
}

export async function getProductRecommendations(productId: string) {
	const query = `
    query productRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

	const variables = { productId };

	const response = await ShopifyData<ProductRecommendationsResponse>(
		query,
		variables,
	);
	return response.data.productRecommendations;
}

// --- MUTATIONS ---

export async function createCart(variantId: string): Promise<Cart> {
	const query = `
    mutation cartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    product {
                      title
                      handle
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

	const variables = {
		lines: [{ merchandiseId: variantId, quantity: 1 }],
	};

	const response = await ShopifyData<CartCreateResponse>(query, variables);
	return response.data.cartCreate.cart;
}

export async function addToCart(
	cartId: string,
	variantId: string,
): Promise<Cart> {
	const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
             edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    product {
                      title
                      handle
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

	const variables = {
		cartId,
		lines: [{ merchandiseId: variantId, quantity: 1 }],
	};

	const response = await ShopifyData<CartAddResponse>(query, variables);
	return response.data.cartLinesAdd.cart;
}

export async function getCart(cartId: string): Promise<Cart> {
	const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

	const variables = { cartId };

	const response = await ShopifyData<GetCartResponse>(query, variables);
	return response.data.cart;
}

export async function removeFromCart(
	cartId: string,
	lineId: string,
): Promise<Cart> {
	const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    product {
                      title
                      handle
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

	const variables = {
		cartId,
		lineIds: [lineId],
	};

	const response = await ShopifyData<CartRemoveResponse>(query, variables);
	return response.data.cartLinesRemove.cart;
}
