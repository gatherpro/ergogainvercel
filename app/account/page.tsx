"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCustomer, getCustomerOrders, customerLogout } from "../../lib/auth";
import { getToken, clearToken } from "../../lib/token";
import type { Customer, Order } from "../../lib/shopify";

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomerData = async () => {
      const token = getToken();

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const customerData = await getCustomer(token);
        if (customerData) {
          setCustomer(customerData);
          const ordersData = await getCustomerOrders(token, 10);
          setOrders(ordersData);
        } else {
          // トークンが無効
          clearToken();
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to load customer data:", error);
        clearToken();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadCustomerData();
  }, [router]);

  const handleLogout = async () => {
    const token = getToken();
    if (token) {
      await customerLogout(token);
    }
    clearToken();
    router.push("/");
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

  if (!customer) {
    return null;
  }

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "96px 24px",
      minHeight: "calc(100vh - 200px)"
    }}>
      {/* ヘッダー */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "48px",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            marginBottom: "8px",
            letterSpacing: "-0.02em",
            color: "#1D1D1F",
            lineHeight: 1.15
          }}>
            こんにちは、{customer.firstName || customer.displayName}さん
          </h1>
          <p style={{
            fontSize: "17px",
            color: "#6E6E73"
          }}>
            {customer.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: 600,
            color: "#6E6E73",
            backgroundColor: "white",
            border: "2px solid #D2D2D7",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FF6B2C";
            e.currentTarget.style.color = "#FF6B2C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#D2D2D7";
            e.currentTarget.style.color = "#6E6E73";
          }}
        >
          ログアウト
        </button>
      </div>

      {/* アカウント情報 */}
      <div style={{
        backgroundColor: "#F5F5F7",
        borderRadius: "18px",
        padding: "32px",
        marginBottom: "48px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1D1D1F",
            letterSpacing: "-0.01em"
          }}>
            アカウント情報
          </h2>
          <Link
            href="/account/edit"
            style={{
              padding: "8px 20px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#FF6B2C",
              backgroundColor: "white",
              border: "2px solid #FF6B2C",
              borderRadius: "8px",
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
            編集
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          <div>
            <p style={{ fontSize: "14px", color: "#86868B", marginBottom: "8px" }}>お名前</p>
            <p style={{ fontSize: "17px", color: "#1D1D1F", fontWeight: 500 }}>
              {customer.firstName && customer.lastName
                ? `${customer.lastName} ${customer.firstName}`
                : customer.displayName}
            </p>
          </div>

          <div>
            <p style={{ fontSize: "14px", color: "#86868B", marginBottom: "8px" }}>メールアドレス</p>
            <p style={{ fontSize: "17px", color: "#1D1D1F", fontWeight: 500 }}>{customer.email}</p>
          </div>

          {customer.phone && (
            <div>
              <p style={{ fontSize: "14px", color: "#86868B", marginBottom: "8px" }}>電話番号</p>
              <p style={{ fontSize: "17px", color: "#1D1D1F", fontWeight: 500 }}>{customer.phone}</p>
            </div>
          )}
        </div>

        {customer.defaultAddress && (
          <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #D2D2D7" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "8px"
            }}>
              <p style={{ fontSize: "14px", color: "#86868B" }}>デフォルト配送先</p>
              <Link
                href="/account/addresses"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FF6B2C",
                  textDecoration: "none"
                }}
              >
                住所を管理
              </Link>
            </div>
            <p style={{ fontSize: "17px", color: "#1D1D1F", lineHeight: 1.6 }}>
              〒{customer.defaultAddress.zip}<br />
              {customer.defaultAddress.province} {customer.defaultAddress.city} {customer.defaultAddress.address1}
              {customer.defaultAddress.address2 && <><br />{customer.defaultAddress.address2}</>}
            </p>
          </div>
        )}

        {!customer.defaultAddress && (
          <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #D2D2D7" }}>
            <p style={{ fontSize: "15px", color: "#6E6E73", marginBottom: "12px" }}>
              配送先住所が登録されていません
            </p>
            <Link
              href="/account/addresses"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#FF6B2C",
                textDecoration: "none"
              }}
            >
              住所を追加する →
            </Link>
          </div>
        )}
      </div>

      {/* 注文履歴 */}
      <div>
        <h2 style={{
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "24px",
          color: "#1D1D1F",
          letterSpacing: "-0.01em"
        }}>
          ご注文履歴
        </h2>

        {orders.length === 0 ? (
          <div style={{
            backgroundColor: "#F5F5F7",
            borderRadius: "18px",
            padding: "48px 32px",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "17px", color: "#6E6E73" }}>
              まだご注文はありません。
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #D2D2D7",
                  borderRadius: "18px",
                  padding: "24px",
                  transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FF6B2C";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#D2D2D7";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "12px"
                }}>
                  <div>
                    <p style={{ fontSize: "19px", fontWeight: 600, color: "#1D1D1F", marginBottom: "4px" }}>
                      注文番号: #{order.orderNumber}
                    </p>
                    <p style={{ fontSize: "15px", color: "#6E6E73" }}>
                      {new Date(order.processedAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "24px", fontWeight: 700, color: "#FF6B2C" }}>
                      ¥{Number(order.totalPrice.amount).toLocaleString()}
                    </p>
                    <p style={{ fontSize: "14px", color: "#6E6E73" }}>
                      {order.financialStatus === "PAID" ? "支払い済み" : order.financialStatus}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {order.lineItems.edges.slice(0, 3).map((lineItem, index) => (
                    <div key={index} style={{ fontSize: "15px", color: "#6E6E73" }}>
                      • {lineItem.node.title} × {lineItem.node.quantity}
                    </div>
                  ))}
                  {order.lineItems.edges.length > 3 && (
                    <div style={{ fontSize: "14px", color: "#86868B" }}>
                      他 {order.lineItems.edges.length - 3} 点
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
