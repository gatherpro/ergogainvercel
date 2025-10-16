/**
 * アクセストークン管理
 *
 * ブラウザのlocalStorageでトークンを管理
 */

const TOKEN_KEY = "shopify_customer_token";
const TOKEN_EXPIRES_KEY = "shopify_customer_token_expires";

/**
 * トークンを保存
 */
export function saveToken(accessToken: string, expiresAt: string): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(TOKEN_EXPIRES_KEY, expiresAt);
}

/**
 * トークンを取得
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem(TOKEN_KEY);
  const expiresAt = localStorage.getItem(TOKEN_EXPIRES_KEY);

  // トークンの有効期限をチェック
  if (token && expiresAt) {
    const expiryDate = new Date(expiresAt);
    const now = new Date();

    if (expiryDate > now) {
      return token;
    } else {
      // 期限切れの場合は削除
      clearToken();
      return null;
    }
  }

  return null;
}

/**
 * トークンを削除
 */
export function clearToken(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRES_KEY);
}

/**
 * トークンが存在するかチェック
 */
export function hasToken(): boolean {
  return getToken() !== null;
}
