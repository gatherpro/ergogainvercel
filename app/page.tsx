"use client";

import { useState } from "react";

export default function Home() {
  const [cartId, setCartId] = useState<string>("");
  const [variantId, setVariantId] = useState<string>("gid://shopify/ProductVariant/9026783772894");
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 1) カート作成
  const handleCreateCart = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/cart-create", {
        method: "POST",
      });
      const data = await response.json();

      if (data.success) {
        setCartId(data.cart.id);
        alert(`カート作成成功！\nCart ID: ${data.cart.id}`);
      } else {
        setError(data.error || "カート作成に失敗しました");
        alert(`エラー: ${data.error}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      alert(`エラー: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  // 2) 商品追加
  const handleAddToCart = async () => {
    if (!cartId) {
      alert("先にカートを作成してください");
      return;
    }
    if (!variantId) {
      alert("Variant ID を入力してください");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/cart-add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
          variantId,
          quantity: 1,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setCheckoutUrl(data.cart.checkoutUrl);
        alert(`商品追加成功！\nCheckout URL: ${data.cart.checkoutUrl}`);
      } else {
        setError(data.error || "商品追加に失敗しました");
        alert(`エラー: ${data.error}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      alert(`エラー: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Shopify Storefront MVP
      </h1>
      <p style={{ marginBottom: "30px", color: "#666" }}>
        Shopify Storefront API を使った超最小MVPです。
      </p>

      {/* Step 1: カート作成 */}
      <section style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>1) カート作成</h2>
        <button
          onClick={handleCreateCart}
          disabled={loading}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "処理中..." : "カート作成"}
        </button>
        {cartId && (
          <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "6px" }}>
            <strong>Cart ID:</strong>
            <div style={{ wordBreak: "break-all", fontSize: "14px", marginTop: "5px" }}>
              {cartId}
            </div>
          </div>
        )}
      </section>

      {/* Step 2: 商品追加 */}
      <section style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>2) 商品追加</h2>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Variant ID (GID):
          </label>
          <input
            type="text"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            placeholder="gid://shopify/ProductVariant/..."
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button
          onClick={handleAddToCart}
          disabled={loading || !cartId}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: !cartId ? "#ccc" : "#10b981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading || !cartId ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "処理中..." : "商品追加"}
        </button>
      </section>

      {/* Step 3: チェックアウトへ */}
      <section style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>3) チェックアウトへ</h2>
        {checkoutUrl ? (
          <div>
            <p style={{ marginBottom: "15px" }}>
              チェックアウトURLが取得できました！
            </p>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#f59e0b",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
              }}
            >
              チェックアウトへ進む
            </a>
            <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "6px" }}>
              <strong>Checkout URL:</strong>
              <div style={{ wordBreak: "break-all", fontSize: "14px", marginTop: "5px" }}>
                {checkoutUrl}
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: "#999" }}>
            商品を追加すると、チェックアウトURLが表示されます。
          </p>
        )}
      </section>

      {/* エラー表示 */}
      {error && (
        <div style={{ padding: "15px", backgroundColor: "#fee", border: "1px solid #fcc", borderRadius: "6px", color: "#c00" }}>
          <strong>エラー:</strong> {error}
        </div>
      )}
    </div>
  );
}
