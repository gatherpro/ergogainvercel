/**
 * Google認証とShopify連携のユーティリティ
 */

import { customerCreate, customerLogin } from "./auth";
import { saveToken } from "./token";

/**
 * Googleログイン後にShopify顧客アカウントを作成または取得
 *
 * @param email - Googleアカウントのメールアドレス
 * @param name - Googleアカウントの表示名
 * @returns 成功時はtrue、失敗時はfalse
 */
export async function handleGoogleAuth(
  email: string,
  name: string | null
): Promise<boolean> {
  try {
    // ランダムなパスワードを生成（Shopify顧客作成用）
    const randomPassword = `google-${Math.random().toString(36).slice(2)}-${Date.now()}`;

    // 名前を分割（First Name / Last Name）
    const nameParts = name?.split(" ") || ["", ""];
    const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0] || "";
    const lastName = nameParts[nameParts.length - 1] || "";

    // 既存顧客かチェック（ダミーパスワードでログイン試行）
    // 注: この方法では既存のGoogle連携顧客は検出できません
    // より良い方法として、Shopify Multipassの使用を検討してください

    // 新規顧客としてShopifyアカウントを作成
    const createResult = await customerCreate(
      email,
      randomPassword,
      firstName,
      lastName
    );

    if (createResult.success) {
      // 作成成功：自動ログイン
      const loginResult = await customerLogin(email, randomPassword);

      if (loginResult) {
        saveToken(loginResult.accessToken, loginResult.expiresAt);
        return true;
      }
    } else {
      // 作成失敗（既に存在する可能性）
      // この場合、ユーザーに通常のログインを促す必要があります
      console.log("Customer may already exist:", createResult.errors);

      // エラーメッセージに"already exists"が含まれる場合、既存顧客
      const alreadyExists = createResult.errors.some(
        err => err.toLowerCase().includes("taken") ||
               err.toLowerCase().includes("exists") ||
               err.toLowerCase().includes("already")
      );

      if (alreadyExists) {
        // 既存顧客の場合は、パスワード設定ページへ誘導する必要があります
        // ここでは一旦falseを返します
        return false;
      }
    }

    return false;
  } catch (error) {
    console.error("Google auth integration error:", error);
    return false;
  }
}

/**
 * 既存のShopify顧客とGoogle認証を紐付け
 * （ユーザーが明示的にパスワードを入力した場合）
 *
 * @param email - メールアドレス
 * @param password - Shopifyパスワード
 * @returns 成功時はtrue
 */
export async function linkGoogleToShopify(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const loginResult = await customerLogin(email, password);

    if (loginResult) {
      saveToken(loginResult.accessToken, loginResult.expiresAt);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Google-Shopify link error:", error);
    return false;
  }
}
