"use client";

import { useCart } from "../../contexts/CartContext";

export default function CartPage() {
  const { cart, loading, removeItem, updateQuantity, itemCount } = useCart();

  // チェックアウトURLにreturn_toパラメータを追加
  const getCheckoutUrl = () => {
    if (!cart) return "";

    const returnUrl = encodeURIComponent("https://ergogain.co.jp/order-confirmation");
    const separator = cart.checkoutUrl.includes("?") ? "&" : "?";
    return `${cart.checkoutUrl}${separator}return_to=${returnUrl}`;
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

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "96px 24px",
        minHeight: "calc(100vh - 200px)",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          color: "#1D1D1F",
          lineHeight: 1.15
        }}>
          カート
        </h1>

        <div style={{
          backgroundColor: "#F5F5F7",
          borderRadius: "18px",
          padding: "48px 32px",
          marginTop: "48px"
        }}>
          <p style={{ fontSize: "19px", color: "#6E6E73", marginBottom: "24px" }}>
            カートは空です
          </p>
          <a
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
            商品を見る
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "96px 24px",
      minHeight: "calc(100vh - 200px)"
    }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 48px)",
        fontWeight: 700,
        marginBottom: "16px",
        letterSpacing: "-0.02em",
        color: "#1D1D1F",
        lineHeight: 1.15
      }}>
        カート
      </h1>

      <p style={{
        fontSize: "17px",
        color: "#6E6E73",
        marginBottom: "48px"
      }}>
        {itemCount}点の商品
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "24px",
        marginBottom: "48px"
      }}>
        {/* カート商品リスト */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {cart.lines.edges.map(({ node }) => (
            <div
              key={node.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #D2D2D7",
                borderRadius: "18px",
                padding: "24px",
                display: "flex",
                gap: "24px",
                alignItems: "center"
              }}
            >
              {/* 商品情報 */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "#1D1D1F",
                  marginBottom: "8px"
                }}>
                  {node.merchandise.product.title}
                </h3>
                {node.merchandise.title !== "Default Title" && (
                  <p style={{
                    fontSize: "15px",
                    color: "#6E6E73",
                    marginBottom: "12px"
                  }}>
                    {node.merchandise.title}
                  </p>
                )}
                {node.merchandise.priceV2 && (
                  <p style={{
                    fontSize: "21px",
                    fontWeight: 700,
                    color: "#FF6B2C"
                  }}>
                    ¥{Number(node.merchandise.priceV2.amount).toLocaleString()}
                  </p>
                )}
              </div>

              {/* 数量コントロール */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "#F5F5F7",
                borderRadius: "12px",
                padding: "8px 12px"
              }}>
                <button
                  onClick={() => updateQuantity(node.id, node.quantity - 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "white",
                    color: "#1D1D1F",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF6B2C";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#1D1D1F";
                  }}
                >
                  −
                </button>

                <span style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#1D1D1F",
                  minWidth: "32px",
                  textAlign: "center"
                }}>
                  {node.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(node.id, node.quantity + 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "white",
                    color: "#1D1D1F",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF6B2C";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#1D1D1F";
                  }}
                >
                  ＋
                </button>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeItem(node.id)}
                style={{
                  padding: "10px 20px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#C62828",
                  backgroundColor: "white",
                  border: "2px solid #FFCDD2",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFEBEE";
                  e.currentTarget.style.borderColor = "#C62828";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.borderColor = "#FFCDD2";
                }}
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 合計とチェックアウト */}
      <div style={{
        backgroundColor: "#F5F5F7",
        borderRadius: "18px",
        padding: "32px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}>
          <span style={{ fontSize: "21px", fontWeight: 600, color: "#1D1D1F" }}>
            小計
          </span>
          <span style={{ fontSize: "32px", fontWeight: 700, color: "#FF6B2C" }}>
            ¥{Number(cart.cost.subtotalAmount.amount).toLocaleString()}
          </span>
        </div>

        <p style={{
          fontSize: "14px",
          color: "#86868B",
          marginBottom: "24px",
          textAlign: "center"
        }}>
          送料と税金はチェックアウト時に計算されます
        </p>

        <a
          href={getCheckoutUrl()}
          style={{
            display: "block",
            width: "100%",
            padding: "18px",
            fontSize: "19px",
            fontWeight: 600,
            color: "white",
            background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
            border: "none",
            borderRadius: "12px",
            textAlign: "center",
            textDecoration: "none",
            cursor: "pointer",
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
          チェックアウトに進む
        </a>

        <p style={{
          fontSize: "13px",
          color: "#86868B",
          textAlign: "center",
          marginTop: "16px",
          lineHeight: 1.5
        }}>
          決済はShopifyの安全な画面で行われます
        </p>
      </div>
    </div>
  );
}
