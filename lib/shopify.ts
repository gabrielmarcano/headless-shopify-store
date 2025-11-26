const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ProductImage = {
  node: {
    url: string;
    altText: string;
  }
};

type Product = {
  node: {
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
    images: {
      edges: ProductImage[];
    };
  }
};

type ShopifyResponse = {
  data: {
    products: {
      edges: Product[];
  };
}
};

async function ShopifyData(query: string) {
  const URL = `https://${domain}/api/2023-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data: ShopifyResponse = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data as ShopifyResponse;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

export async function getProductsInCollection() {
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

  const response = await ShopifyData(query);
  const allProducts = response.data.products.edges ? response.data.products.edges : [];
  return allProducts;
}