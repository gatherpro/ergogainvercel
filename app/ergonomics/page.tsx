"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts, Product } from "../../lib/shopify";

export default function ErgonomicsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
      setLoading(false);
    };

    loadProducts();
  }, []);

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

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h1 style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 700,
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          color: "#1D1D1F"
        }}>
          既製品一覧
        </h1>
        <p style={{
          fontSize: "19px",
          color: "#6E6E73",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: 1.6
        }}>
          すぐにお使いいただける、厳選された製品ラインナップ
        </p>
      </div>

      {products.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "64px 24px",
          backgroundColor: "#F5F5F7",
          borderRadius: "18px"
        }}>
          <p style={{
            fontSize: "17px",
            color: "#6E6E73",
            marginBottom: "24px"
          }}>
            商品が登録されていません。
          </p>
          <p style={{
            fontSize: "15px",
            color: "#86868B"
          }}>
            Shopify管理画面から商品を登録してください。
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px"
        }}>
          {products.map((product) => {
            const mainImage = product.images.edges[0]?.node;
            const price = product.priceRange.minVariantPrice;
            const hasStock = product.variants.edges.some(({ node }) => node.availableForSale);

            return (
              <Link
                key={product.id}
                href={`/ergonomics/${product.handle}`}
                style={{
                  padding: "24px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  textDecoration: "none",
                  border: "1px solid #E5E5E7",
                  transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                  display: "block",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
                  position: "relative",
                  opacity: hasStock ? 1 : 0.6
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 107, 44, 0.15)";
                  e.currentTarget.style.borderColor = "#FF6B2C";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.06)";
                  e.currentTarget.style.borderColor = "#E5E5E7";
                }}
              >
                {/* 在庫切れバッジ */}
                {!hasStock && (
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    padding: "6px 12px",
                    backgroundColor: "#6E6E73",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 600,
                    borderRadius: "6px"
                  }}>
                    在庫切れ
                  </div>
                )}

                {/* 商品画像 */}
                <div style={{
                  backgroundColor: "#F5F5F7",
                  borderRadius: "12px",
                  padding: "24px",
                  marginBottom: "16px",
                  minHeight: "200px",
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
                        maxHeight: "200px",
                        objectFit: "contain"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "48px" }}>📦</div>
                  )}
                </div>

                {/* 商品情報 */}
                <h2 style={{
                  fontSize: "21px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "#1D1D1F",
                  letterSpacing: "-0.01em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {product.title}
                </h2>

                {product.description && (
                  <p style={{
                    fontSize: "15px",
                    color: "#6E6E73",
                    lineHeight: 1.6,
                    marginBottom: "12px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {product.description}
                  </p>
                )}

                <p style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#FF6B2C",
                  margin: 0
                }}>
                  ¥{Number(price.amount).toLocaleString()}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
