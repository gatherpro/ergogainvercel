"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../../contexts/CartContext";

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  // テスト用のサンプル商品データ
  const product = {
    alpha: { name: "Alpha", description: "スタンダードモデル - 高機能で使いやすい人間工学製品", price: 29800, emoji: "⭐", variantId: "gid://shopify/ProductVariant/EXAMPLE_ID_1" },
    beta: { name: "Beta", description: "プレミアムモデル - 最上位の快適性を追求", price: 49800, emoji: "💎", variantId: "gid://shopify/ProductVariant/EXAMPLE_ID_2" },
    gamma: { name: "Gamma", description: "エントリーモデル - 手軽に始める人間工学", price: 19800, emoji: "🌟", variantId: "gid://shopify/ProductVariant/EXAMPLE_ID_3" }
  }[params.handle] || { name: params.handle, description: "製品情報準備中", price: 0, emoji: "📦", variantId: "" };

  const handleAddToCart = async () => {
    if (!product.variantId) {
      alert("この商品はまだ購入できません");
      return;
    }

    setAdding(true);
    try {
      await addItem(product.variantId, 1);
      // カートページへリダイレクト
      router.push("/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("カートへの追加に失敗しました");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px" }}>
      <Link
        href="/ergonomics"
        style={{
          color: "#FF6B2C",
          textDecoration: "none",
          marginBottom: "32px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "15px",
          fontWeight: 500,
          transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      >
        ← 既製品一覧に戻る
      </Link>

      <div style={{ marginTop: "48px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center"
        }}>
          {/* 商品画像エリア（仮） */}
          <div style={{
            backgroundColor: "#F5F5F7",
            borderRadius: "24px",
            padding: "96px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "128px", marginBottom: "24px" }}>{product.emoji}</div>
          </div>

          {/* 商品情報 */}
          <div>
            <h1 style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
              color: "#1D1D1F",
              lineHeight: 1.15
            }}>
              {product.name}
            </h1>

            {product.price > 0 && (
              <p style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#FF6B2C",
                marginBottom: "24px"
              }}>
                ¥{product.price.toLocaleString()}
              </p>
            )}

            <p style={{
              fontSize: "19px",
              color: "#6E6E73",
              lineHeight: 1.6,
              marginBottom: "40px"
            }}>
              {product.description}
            </p>

            {product.variantId ? (
              <button
                onClick={handleAddToCart}
                disabled={adding}
                style={{
                  width: "100%",
                  padding: "18px",
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "white",
                  background: adding ? "#D2D2D7" : "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
                  border: "none",
                  borderRadius: "12px",
                  cursor: adding ? "not-allowed" : "pointer",
                  transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                  boxShadow: adding ? "none" : "0 4px 12px rgba(255, 107, 44, 0.25)",
                  marginBottom: "16px"
                }}
                onMouseEnter={(e) => {
                  if (!adding) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 44, 0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 44, 0.25)";
                }}
              >
                {adding ? "カートに追加中..." : "カートに追加"}
              </button>
            ) : (
              <div style={{
                padding: "18px",
                backgroundColor: "#F5F5F7",
                borderRadius: "12px",
                textAlign: "center",
                marginBottom: "16px"
              }}>
                <p style={{ fontSize: "17px", color: "#6E6E73", margin: 0 }}>
                  この商品はまだ購入できません
                </p>
              </div>
            )}

            <p style={{
              fontSize: "14px",
              color: "#86868B",
              textAlign: "center",
              lineHeight: 1.5
            }}>
              送料無料 | 30日間返品可能 | 1年間保証
            </p>
          </div>
        </div>

        {/* 商品詳細セクション */}
        <div style={{
          marginTop: "96px",
          padding: "48px",
          backgroundColor: "#F5F5F7",
          borderRadius: "24px"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "24px",
            color: "#1D1D1F",
            letterSpacing: "-0.01em"
          }}>
            製品の特徴
          </h2>
          <ul style={{
            fontSize: "17px",
            color: "#6E6E73",
            lineHeight: 1.8,
            paddingLeft: "24px"
          }}>
            <li>人間工学に基づいた設計</li>
            <li>長時間使用でも快適な使用感</li>
            <li>日本国内で品質管理</li>
            <li>環境に配慮した素材を使用</li>
            <li>簡単な組み立て・設置</li>
          </ul>
        </div>

        {/* 注意事項 */}
        <div style={{
          marginTop: "48px",
          padding: "24px",
          backgroundColor: "#FFF5F0",
          borderRadius: "16px",
          border: "1px solid #FFE5D9"
        }}>
          <p style={{
            fontSize: "15px",
            color: "#6E6E73",
            lineHeight: 1.6,
            margin: 0
          }}>
            <strong>ご注意：</strong> これはデモサイトです。実際の商品情報や価格は、Shopify管理画面で設定された内容が表示されます。
            カート機能をテストするには、Shopify管理画面で実際の商品を作成し、そのVariant IDを使用してください。
          </p>
        </div>
      </div>
    </div>
  );
}
