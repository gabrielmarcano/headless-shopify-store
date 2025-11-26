"use server";

import type {
	Cart,
	CartAddResponse,
	CartCreateResponse,
	Product,
	ProductByHandle,
	ProductResponse,
	ProductsResponse,
} from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

/**
 * Fetches data from the Shopify API
 * @template T - The specific shape of the response you expect
 * @param query - The GraphQL query string
 * @param variables - Optional variables for the query
 */
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

export async function getProductsInCollection(): Promise<
	Array<{ node: Product }>
> {
	const query = `
  {
    products(first: 5) {
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
      variants(first: 1) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }`;

	const response = await ShopifyData<ProductResponse>(query);
	return response.data.product;
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
