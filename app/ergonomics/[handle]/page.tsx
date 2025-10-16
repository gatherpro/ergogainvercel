"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../../contexts/CartContext";
import { getProductByHandle, Product, ProductVariant } from "../../../lib/shopify";

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await getProductByHandle(params.handle);
      setProduct(productData);

      // 最初のバリアントを選択
      if (productData && productData.variants.edges.length > 0) {
        setSelectedVariant(productData.variants.edges[0].node);
      }

      setLoading(false);
    };

    loadProduct();
  }, [params.handle]);

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) {
      alert("この商品は現在在庫切れです");
      return;
    }

    setAdding(true);
    try {
      await addItem(selectedVariant.id, 1);
      // カートページへリダイレクト
      router.push("/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("カートへの追加に失敗しました");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)",
        fontSize: "17px",
        color: "#6E6E73"
      }}>
        読み込み中...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          marginBottom: "24px",
          color: "#1D1D1F"
        }}>
          商品が見つかりません
        </h1>
        <p style={{ fontSize: "17px", color: "#6E6E73", marginBottom: "32px" }}>
          お探しの商品は存在しないか、削除された可能性があります。
        </p>
        <Link
          href="/ergonomics"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            fontSize: "17px",
            fontWeight: 600,
            color: "white",
            background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
            borderRadius: "12px",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(255, 107, 44, 0.25)"
          }}
        >
          商品一覧に戻る
        </Link>
      </div>
    );
  }

  const mainImage = product.images.edges[0]?.node;
  const hasMultipleVariants = product.variants.edges.length > 1;

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
          alignItems: "start"
        }}>
          {/* 商品画像エリア */}
          <div style={{
            backgroundColor: "#F5F5F7",
            borderRadius: "24px",
            padding: "48px",
            textAlign: "center",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "500px",
                  objectFit: "contain",
                  borderRadius: "12px"
                }}
              />
            ) : (
              <div style={{ fontSize: "96px" }}>📦</div>
            )}
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
              {product.title}
            </h1>

            <p style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#FF6B2C",
              marginBottom: "24px"
            }}>
              ¥{Number(selectedVariant?.priceV2.amount || product.priceRange.minVariantPrice.amount).toLocaleString()}
            </p>

            {product.description && (
              <p style={{
                fontSize: "17px",
                color: "#6E6E73",
                lineHeight: 1.6,
                marginBottom: "32px"
              }}>
                {product.description}
              </p>
            )}

            {/* バリアント選択 */}
            {hasMultipleVariants && (
              <div style={{ marginBottom: "32px" }}>
                <label style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "12px",
                  color: "#1D1D1F"
                }}>
                  オプション
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {product.variants.edges.map(({ node: variant }) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.availableForSale}
                      style={{
                        padding: "12px 20px",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: selectedVariant?.id === variant.id ? "white" : "#1D1D1F",
                        backgroundColor: selectedVariant?.id === variant.id ? "#FF6B2C" : "white",
                        border: `2px solid ${selectedVariant?.id === variant.id ? "#FF6B2C" : "#D2D2D7"}`,
                        borderRadius: "12px",
                        cursor: variant.availableForSale ? "pointer" : "not-allowed",
                        opacity: variant.availableForSale ? 1 : 0.5,
                        transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
                      }}
                      onMouseEnter={(e) => {
                        if (variant.availableForSale && selectedVariant?.id !== variant.id) {
                          e.currentTarget.style.borderColor = "#FF6B2C";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedVariant?.id !== variant.id) {
                          e.currentTarget.style.borderColor = "#D2D2D7";
                        }
                      }}
                    >
                      {variant.title}
                      {!variant.availableForSale && " (在庫切れ)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* カートに追加ボタン */}
            {selectedVariant?.availableForSale ? (
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
                  在庫切れ
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
        {product.descriptionHtml && (
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
              製品の詳細
            </h2>
            <div
              style={{
                fontSize: "17px",
                color: "#6E6E73",
                lineHeight: 1.8
              }}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
