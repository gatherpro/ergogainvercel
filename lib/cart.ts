/**
 * Shopify カート機能
 *
 * Storefront API を使用したカート操作
 */

import { storefrontFetch, Cart } from "./shopify";

/**
 * 新しいカートを作成
 */
export async function createCart(): Promise<Cart | null> {
  const mutation = `
    mutation cartCreate {
      cartCreate {
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
                    product {
                      title
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      cartCreate: {
        cart: Cart;
      };
    }>({
      query: mutation,
    });

    return data.cartCreate.cart;
  } catch (error) {
    console.error("Failed to create cart:", error);
    return null;
  }
}

/**
 * カートに商品を追加
 */
export async function addToCart(cartId: string, merchandiseId: string, quantity: number = 1): Promise<Cart | null> {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      cartLinesAdd: {
        cart: Cart;
      };
    }>({
      query: mutation,
      variables: {
        cartId,
        lines: [
          {
            merchandiseId,
            quantity,
          },
        ],
      },
    });

    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return null;
  }
}

/**
 * カートの商品数量を更新
 */
export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart | null> {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      cartLinesUpdate: {
        cart: Cart;
      };
    }>({
      query: mutation,
      variables: {
        cartId,
        lines: [
          {
            id: lineId,
            quantity,
          },
        ],
      },
    });

    return data.cartLinesUpdate.cart;
  } catch (error) {
    console.error("Failed to update cart line:", error);
    return null;
  }
}

/**
 * カートから商品を削除
 */
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart | null> {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      cartLinesRemove: {
        cart: Cart;
      };
    }>({
      query: mutation,
      variables: {
        cartId,
        lineIds,
      },
    });

    return data.cartLinesRemove.cart;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    return null;
  }
}

/**
 * カートを取得
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    query cart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      cart: Cart | null;
    }>({
      query,
      variables: { cartId },
    });

    return data.cart;
  } catch (error) {
    console.error("Failed to get cart:", error);
    return null;
  }
}
