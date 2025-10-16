/**
 * Shopify Storefront API クライアント
 *
 * Classic Customer Accounts を使用したHeadless Commerce実装
 */

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN;

if (!SHOPIFY_STORE_DOMAIN || !STOREFRONT_TOKEN) {
  throw new Error(
    "Missing Shopify Storefront API credentials. " +
    "Please check NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_STOREFRONT_TOKEN"
  );
}

// 検証後の型アサーション
const VALIDATED_STORE_DOMAIN: string = SHOPIFY_STORE_DOMAIN;
const VALIDATED_TOKEN: string = STOREFRONT_TOKEN;

const STOREFRONT_API_VERSION = "2024-01";
const STOREFRONT_API_URL = `https://${VALIDATED_STORE_DOMAIN}/api/${STOREFRONT_API_VERSION}/graphql.json`;

/**
 * Shopify Storefront API にGraphQLクエリを送信
 */
export async function storefrontFetch<T>({
  query,
  variables = {},
  headers = {},
}: {
  query: string;
  variables?: Record<string, any>;
  headers?: HeadersInit;
}): Promise<{ data: T; errors?: any[] }> {
  const res = await fetch(STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": VALIDATED_TOKEN,
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
  }

  return json;
}

/**
 * 型定義
 */

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  phone?: string;
  defaultAddress?: Address;
}

export interface Address {
  id: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: Money;
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        variant?: {
          image?: {
            url: string;
          };
        };
      };
    }>;
  };
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: {
            title: string;
          };
          priceV2?: Money;
        };
      };
    }>;
  };
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
  };
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  priceV2: Money;
  selectedOptions?: Array<{
    name: string;
    value: string;
  }>;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

/**
 * ハンドルから商品を取得
 */
export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              priceV2 {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      product?: Product;
    }>({
      query,
      variables: { handle },
    });

    return data.product || null;
  } catch (error) {
    console.error("Failed to get product:", error);
    return null;
  }
}

/**
 * 全商品を取得
 */
export async function getProducts(first: number = 20): Promise<Product[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
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
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
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

  try {
    const { data } = await storefrontFetch<{
      products: {
        edges: Array<{ node: Product }>;
      };
    }>({
      query,
      variables: { first },
    });

    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Failed to get products:", error);
    return [];
  }
}
