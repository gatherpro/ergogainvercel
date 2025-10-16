/**
 * Shopify 認証ユーティリティ
 *
 * Classic Customer Accounts の認証機能
 */

import { storefrontFetch, Customer, CustomerAccessToken, Order } from "./shopify";

/**
 * 顧客登録
 */
export async function customerCreate(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
): Promise<{ success: boolean; errors: string[] }> {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      customerCreate: {
        customer?: { id: string; email: string };
        customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: {
        input: {
          email,
          password,
          firstName,
          lastName,
          acceptsMarketing: false,
        },
      },
    });

    if (data.customerCreate.customerUserErrors.length > 0) {
      const errors = data.customerCreate.customerUserErrors.map((err) => err.message);
      return { success: false, errors };
    }

    return { success: true, errors: [] };
  } catch (error) {
    console.error("Registration failed:", error);
    return { success: false, errors: ["登録に失敗しました。もう一度お試しください。"] };
  }
}

/**
 * 顧客ログイン
 */
export async function customerLogin(email: string, password: string): Promise<CustomerAccessToken | null> {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      customerAccessTokenCreate: {
        customerAccessToken?: CustomerAccessToken;
        customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: {
        input: { email, password },
      },
    });

    if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
      console.error("Login errors:", data.customerAccessTokenCreate.customerUserErrors);
      return null;
    }

    return data.customerAccessTokenCreate.customerAccessToken || null;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
}

/**
 * 顧客情報取得
 */
export async function getCustomer(accessToken: string): Promise<Customer | null> {
  const query = `
    query getCustomer($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
        id
        email
        firstName
        lastName
        displayName
        phone
        defaultAddress {
          id
          address1
          address2
          city
          province
          zip
          country
          firstName
          lastName
          phone
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{ customer?: Customer }>({
      query,
      variables: { accessToken },
    });

    return data.customer || null;
  } catch (error) {
    console.error("Failed to get customer:", error);
    return null;
  }
}

/**
 * 注文履歴取得
 */
export async function getCustomerOrders(accessToken: string, first: number = 10): Promise<Order[]> {
  const query = `
    query getCustomerOrders($accessToken: String!, $first: Int!) {
      customer(customerAccessToken: $accessToken) {
        orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      image {
                        url
                      }
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

  try {
    const { data } = await storefrontFetch<{
      customer?: {
        orders: {
          edges: Array<{ node: Order }>;
        };
      };
    }>({
      query,
      variables: { accessToken, first },
    });

    return data.customer?.orders.edges.map((edge) => edge.node) || [];
  } catch (error) {
    console.error("Failed to get orders:", error);
    return [];
  }
}

/**
 * アクセストークンの更新
 */
export async function renewCustomerAccessToken(accessToken: string): Promise<CustomerAccessToken | null> {
  const mutation = `
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      customerAccessTokenRenew: {
        customerAccessToken?: CustomerAccessToken;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: { customerAccessToken: accessToken },
    });

    if (data.customerAccessTokenRenew.userErrors.length > 0) {
      console.error("Token renewal errors:", data.customerAccessTokenRenew.userErrors);
      return null;
    }

    return data.customerAccessTokenRenew.customerAccessToken || null;
  } catch (error) {
    console.error("Token renewal failed:", error);
    return null;
  }
}

/**
 * ログアウト（トークン削除）
 */
export async function customerLogout(accessToken: string): Promise<boolean> {
  const mutation = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      customerAccessTokenDelete: {
        deletedAccessToken?: string;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: { customerAccessToken: accessToken },
    });

    return !!data.customerAccessTokenDelete.deletedAccessToken;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
}

/**
 * プロフィール情報の更新
 */
export async function customerUpdate(
  accessToken: string,
  customer: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }
): Promise<{ success: boolean; errors: string[] }> {
  const mutation = `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          email
          firstName
          lastName
          phone
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      customerUpdate: {
        customer?: Customer;
        customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: {
        customerAccessToken: accessToken,
        customer,
      },
    });

    if (data.customerUpdate.customerUserErrors.length > 0) {
      const errors = data.customerUpdate.customerUserErrors.map((err) => err.message);
      return { success: false, errors };
    }

    return { success: true, errors: [] };
  } catch (error) {
    console.error("Customer update failed:", error);
    return { success: false, errors: ["更新に失敗しました。もう一度お試しください。"] };
  }
}

/**
 * パスワードリセットメールを送信
 */
export async function customerRecover(email: string): Promise<{ success: boolean; errors: string[] }> {
  const mutation = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      customerRecover: {
        customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: { email },
    });

    if (data.customerRecover.customerUserErrors.length > 0) {
      const errors = data.customerRecover.customerUserErrors.map((err) => err.message);
      return { success: false, errors };
    }

    return { success: true, errors: [] };
  } catch (error) {
    console.error("Password recovery failed:", error);
    return { success: false, errors: ["パスワードリセットの送信に失敗しました。"] };
  }
}
