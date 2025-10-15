/**
 * Shopify Storefront API utilities
 */

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN;

if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
  throw new Error(
    "Missing required environment variables: NEXT_PUBLIC_SHOPIFY_DOMAIN or NEXT_PUBLIC_STOREFRONT_TOKEN"
  );
}

// Type assertion after validation
const VALIDATED_DOMAIN: string = SHOPIFY_DOMAIN;
const VALIDATED_TOKEN: string = STOREFRONT_TOKEN;

const GRAPHQL_ENDPOINT = `https://${VALIDATED_DOMAIN}/api/2024-10/graphql.json`;

/**
 * GraphQL request utility
 */
export async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": VALIDATED_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

/**
 * Create a new cart
 */
export async function createCart() {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string };
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(mutation, { input: {} });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${JSON.stringify(data.cartCreate.userErrors)}`);
  }

  return data.cartCreate.cart;
}

/**
 * Add a line item to cart
 */
export async function addLineToCart(cartId: string, variantId: string, quantity: number = 1) {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: {
        id: string;
        checkoutUrl: string;
        lines: {
          edges: Array<{
            node: {
              id: string;
              quantity: number;
              merchandise: { id: string; title: string };
            };
          }>;
        };
      };
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(mutation, {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(`Add to cart failed: ${JSON.stringify(data.cartLinesAdd.userErrors)}`);
  }

  return data.cartLinesAdd.cart;
}
