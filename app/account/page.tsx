"use client";

/**
 * マイアカウントページ
 *
 * Shopifyのホスト型カスタマーアカウント（新アカウント推奨）に誘導します。
 *
 * 【環境変数】
 * - NEXT_PUBLIC_SHOPIFY_DOMAIN: Shopifyストアのドメイン（例: your-store.myshopify.com）
 *
 * 【URL構成】
 * - 新アカウント（推奨）: https://{SHOPIFY_DOMAIN}/account
 *   └ ログインと新規登録の両方に対応
 * - ログイン: https://{SHOPIFY_DOMAIN}/account/login
 * - 新規登録: https://{SHOPIFY_DOMAIN}/account/register
 *
 * 【クラシックアカウントへの切替方法】
 * もしクラシックアカウントを使用する場合は、以下のURLに変更してください：
 * - const ACCOUNT_URL = `https://${SHOPIFY_DOMAIN}/account`;
 *   ↓
 * - const ACCOUNT_URL = `https://${SHOPIFY_DOMAIN}/account/login`;
 */

export default function AccountPage() {
  const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "your-store.myshopify.com";

  // 新アカウント（推奨）: /account でログイン・新規登録の両方に対応
  const ACCOUNT_URL = `https://${SHOPIFY_DOMAIN}/account`;

  // クラシックアカウント用のURL（必要に応じてコメント解除）
  // const ACCOUNT_URL = `https://${SHOPIFY_DOMAIN}/account/login`;

  return (
    <div style={{
      maxWidth: "640px",
      margin: "0 auto",
      padding: "96px 24px",
      minHeight: "calc(100vh - 200px)"
    }}>
      {/* メインコンテンツ */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          color: "#1D1D1F",
          lineHeight: 1.15
        }}>
          マイアカウント
        </h1>

        <p style={{
          fontSize: "19px",
          color: "#6E6E73",
          lineHeight: 1.6,
          marginBottom: "40px"
        }}>
          ご注文履歴の確認、配送先の管理、お気に入り商品の保存など、<br />
          便利な機能をご利用いただけます。
        </p>

        {/* デバッグ用：生成されたURLを表示 */}
        <p style={{
          fontSize: "13px",
          color: "#FF6B2C",
          marginBottom: "24px",
          fontFamily: "monospace"
        }}>
          デバッグ: {ACCOUNT_URL}
        </p>

        {/* メインCTAボタン */}
        <a
          href={ACCOUNT_URL}
          style={{
            display: "inline-block",
            padding: "18px 48px",
            fontSize: "17px",
            fontWeight: 600,
            color: "white",
            background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
            borderRadius: "12px",
            textDecoration: "none",
            transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: "0 4px 12px rgba(255, 107, 44, 0.25)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 44, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 44, 0.25)";
          }}
        >
          ログイン / 新規登録
        </a>

        {/* セキュリティ注意書き */}
        <p style={{
          fontSize: "14px",
          color: "#86868B",
          marginTop: "24px",
          lineHeight: 1.5
        }}>
          決済・個人情報の入力はShopifyの安全な画面で行われます。<br />
          SSL暗号化通信により、お客様の情報は保護されています。
        </p>
      </div>

      {/* FAQ風の小項目 */}
      <div style={{
        backgroundColor: "#F5F5F7",
        borderRadius: "16px",
        padding: "32px",
        marginTop: "48px"
      }}>
        <h2 style={{
          fontSize: "21px",
          fontWeight: 600,
          marginBottom: "24px",
          color: "#1D1D1F",
          letterSpacing: "-0.01em"
        }}>
          よくある質問
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* パスワード再設定 */}
          <div>
            <h3 style={{
              fontSize: "17px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#1D1D1F"
            }}>
              パスワードを忘れた場合
            </h3>
            <p style={{
              fontSize: "15px",
              color: "#6E6E73",
              lineHeight: 1.5,
              margin: 0
            }}>
              ログイン画面の「パスワードをお忘れですか？」リンクから、<br />
              登録されたメールアドレス宛にリセット用のリンクをお送りします。
            </p>
          </div>

          {/* ゲスト購入 */}
          <div>
            <h3 style={{
              fontSize: "17px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#1D1D1F"
            }}>
              アカウント登録せずに購入できますか？
            </h3>
            <p style={{
              fontSize: "15px",
              color: "#6E6E73",
              lineHeight: 1.5,
              margin: 0
            }}>
              はい、ゲストとして購入いただけます。<br />
              ただし、アカウントを作成すると注文履歴の確認や、<br />
              次回以降のスムーズなお買い物が可能になります。
            </p>
          </div>

          {/* アカウント作成のメリット */}
          <div>
            <h3 style={{
              fontSize: "17px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#1D1D1F"
            }}>
              アカウント作成のメリット
            </h3>
            <ul style={{
              fontSize: "15px",
              color: "#6E6E73",
              lineHeight: 1.7,
              margin: 0,
              paddingLeft: "20px"
            }}>
              <li>ご注文履歴の確認</li>
              <li>配送先情報の保存・管理</li>
              <li>お気に入り商品の保存</li>
              <li>次回以降のスムーズなチェックアウト</li>
              <li>限定セールやキャンペーン情報の受け取り</li>
            </ul>
          </div>
        </div>
      </div>

      {/* フッター補足 */}
      <p style={{
        fontSize: "13px",
        color: "#86868B",
        textAlign: "center",
        marginTop: "48px",
        lineHeight: 1.5
      }}>
        アカウントに関するお問い合わせは、
        <a
          href="/support/contact"
          style={{
            color: "#FF6B2C",
            textDecoration: "none",
            fontWeight: 500
          }}
        >
          サポートページ
        </a>
        よりご連絡ください。
      </p>
    </div>
  );
}
