/**
 * Shopify 住所管理ユーティリティ
 */

import { storefrontFetch, Address } from "./shopify";

export interface AddressInput {
  address1?: string;
  address2?: string;
  city?: string;
  company?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  province?: string;
  zip?: string;
}

/**
 * 顧客の住所一覧を取得
 */
export async function getCustomerAddresses(accessToken: string): Promise<Address[]> {
  const query = `
    query getCustomerAddresses($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        addresses(first: 10) {
          edges {
            node {
              id
              address1
              address2
              city
              company
              country
              firstName
              lastName
              phone
              province
              zip
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await storefrontFetch<{
      customer?: {
        addresses: {
          edges: Array<{ node: Address }>;
        };
      };
    }>({
      query,
      variables: { customerAccessToken: accessToken },
    });

    return data.customer?.addresses.edges.map((edge) => edge.node) || [];
  } catch (error) {
    console.error("Failed to get addresses:", error);
    return [];
  }
}

/**
 * 新しい住所を作成
 */
export async function customerAddressCreate(
  accessToken: string,
  address: AddressInput
): Promise<{ success: boolean; errors: string[]; address?: Address }> {
  const mutation = `
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          id
          address1
          address2
          city
          company
          country
          firstName
          lastName
          phone
          province
          zip
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
      customerAddressCreate: {
        customerAddress?: Address;
        customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: {
        customerAccessToken: accessToken,
        address,
      },
    });

    if (data.customerAddressCreate.customerUserErrors.length > 0) {
      const errors = data.customerAddressCreate.customerUserErrors.map((err) => err.message);
      return { success: false, errors };
    }

    return {
      success: true,
      errors: [],
      address: data.customerAddressCreate.customerAddress,
    };
  } catch (error) {
    console.error("Address creation failed:", error);
    return { success: false, errors: ["住所の作成に失敗しました。"] };
  }
}

/**
 * 住所を更新
 */
export async function customerAddressUpdate(
  accessToken: string,
  addressId: string,
  address: AddressInput
): Promise<{ success: boolean; errors: string[] }> {
  const mutation = `
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          id
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
      customerAddressUpdate: {
        customerAddress?: { id: string };
        customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: {
        customerAccessToken: accessToken,
        id: addressId,
        address,
      },
    });

    if (data.customerAddressUpdate.customerUserErrors.length > 0) {
      const errors = data.customerAddressUpdate.customerUserErrors.map((err) => err.message);
      return { success: false, errors };
    }

    return { success: true, errors: [] };
  } catch (error) {
    console.error("Address update failed:", error);
    return { success: false, errors: ["住所の更新に失敗しました。"] };
  }
}

/**
 * 住所を削除
 */
export async function customerAddressDelete(
  accessToken: string,
  addressId: string
): Promise<{ success: boolean; errors: string[] }> {
  const mutation = `
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
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
      customerAddressDelete: {
        deletedCustomerAddressId?: string;
        customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: {
        customerAccessToken: accessToken,
        id: addressId,
      },
    });

    if (data.customerAddressDelete.customerUserErrors.length > 0) {
      const errors = data.customerAddressDelete.customerUserErrors.map((err) => err.message);
      return { success: false, errors };
    }

    return { success: true, errors: [] };
  } catch (error) {
    console.error("Address deletion failed:", error);
    return { success: false, errors: ["住所の削除に失敗しました。"] };
  }
}

/**
 * デフォルト住所を設定
 */
export async function customerDefaultAddressUpdate(
  accessToken: string,
  addressId: string
): Promise<{ success: boolean; errors: string[] }> {
  const mutation = `
    mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
      customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
        customer {
          id
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
      customerDefaultAddressUpdate: {
        customer?: { id: string };
        customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
      };
    }>({
      query: mutation,
      variables: {
        customerAccessToken: accessToken,
        addressId,
      },
    });

    if (data.customerDefaultAddressUpdate.customerUserErrors.length > 0) {
      const errors = data.customerDefaultAddressUpdate.customerUserErrors.map((err) => err.message);
      return { success: false, errors };
    }

    return { success: true, errors: [] };
  } catch (error) {
    console.error("Default address update failed:", error);
    return { success: false, errors: ["デフォルト住所の設定に失敗しました。"] };
  }
}
