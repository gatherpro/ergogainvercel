"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrderConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // カートをクリア（localStorageから削除）
    if (typeof window !== "undefined") {
      localStorage.removeItem("shopify_cart_id");
    }
  }, []);

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "96px 24px",
      minHeight: "calc(100vh - 200px)",
      textAlign: "center"
    }}>
      {/* 成功アイコン */}
      <div style={{
        width: "80px",
        height: "80px",
        margin: "0 auto 32px",
        backgroundColor: "#E8F5E9",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px"
      }}>
        ✓
      </div>

      <h1 style={{
        fontSize: "clamp(32px, 5vw, 48px)",
        fontWeight: 700,
        marginBottom: "16px",
        letterSpacing: "-0.02em",
        color: "#1D1D1F",
        lineHeight: 1.15
      }}>
        ご注文ありがとうございます！
      </h1>

      <p style={{
        fontSize: "19px",
        color: "#6E6E73",
        lineHeight: 1.6,
        marginBottom: "48px",
        maxWidth: "600px",
        margin: "0 auto 48px"
      }}>
        ご注文が正常に完了しました。<br />
        ご登録のメールアドレスに注文確認メールをお送りしております。
      </p>

      {/* アクションボタン */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "400px",
        margin: "0 auto"
      }}>
        <Link
          href="/ergonomics"
          style={{
            display: "block",
            padding: "18px",
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
          買い物を続ける
        </Link>

        <Link
          href="/account"
          style={{
            display: "block",
            padding: "18px",
            fontSize: "17px",
            fontWeight: 600,
            color: "#FF6B2C",
            backgroundColor: "white",
            border: "2px solid #FF6B2C",
            borderRadius: "12px",
            textDecoration: "none",
            transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#FFF5F0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          注文履歴を見る
        </Link>

        <Link
          href="/"
          style={{
            display: "block",
            padding: "14px",
            fontSize: "15px",
            fontWeight: 500,
            color: "#6E6E73",
            textDecoration: "none",
            transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#FF6B2C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6E6E73";
          }}
        >
          ホームに戻る
        </Link>
      </div>

      {/* 追加情報 */}
      <div style={{
        marginTop: "64px",
        padding: "32px",
        backgroundColor: "#F5F5F7",
        borderRadius: "18px",
        textAlign: "left"
      }}>
        <h2 style={{
          fontSize: "21px",
          fontWeight: 600,
          marginBottom: "16px",
          color: "#1D1D1F"
        }}>
          次のステップ
        </h2>
        <ul style={{
          fontSize: "17px",
          color: "#6E6E73",
          lineHeight: 1.8,
          paddingLeft: "24px",
          margin: 0
        }}>
          <li>注文確認メールをご確認ください</li>
          <li>商品の発送準備が整い次第、発送通知メールをお送りします</li>
          <li>配送状況は注文履歴ページから追跡できます</li>
          <li>ご不明な点がございましたら、お気軽にお問い合わせください</li>
        </ul>
      </div>

      <p style={{
        fontSize: "14px",
        color: "#86868B",
        marginTop: "48px",
        lineHeight: 1.6
      }}>
        お問い合わせ：
        <a href="mailto:support@ergogain.co.jp" style={{ color: "#FF6B2C", textDecoration: "none" }}>
          support@ergogain.co.jp
        </a>
      </p>
    </div>
  );
}
