"use client";

import Link from "next/link";

export default function ErgogainPage() {
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
          Ergogain（オーダーメイド）
        </h1>
        <p style={{
          fontSize: "19px",
          color: "#6E6E73",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: 1.6
        }}>
          あなたの体に合わせた、完全カスタマイズの製品を提供します。<br />
          フルオーダーとセミオーダーからお選びいただけます。
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "32px"
      }}>
        <Link
          href="/ergogain/full"
          style={{
            padding: "48px",
            backgroundColor: "white",
            borderRadius: "20px",
            textDecoration: "none",
            border: "1px solid #E5E5E7",
            transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
            display: "block",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 107, 44, 0.2)";
            e.currentTarget.style.borderColor = "#FF6B2C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
            e.currentTarget.style.borderColor = "#E5E5E7";
          }}
        >
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            fontSize: "32px"
          }}>
            ✨
          </div>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "16px",
            color: "#1D1D1F",
            letterSpacing: "-0.01em"
          }}>
            フルオーダー
          </h2>
          <p style={{
            fontSize: "17px",
            color: "#6E6E73",
            lineHeight: 1.6,
            margin: 0
          }}>
            完全にカスタマイズされた製品を作成。サイズ、素材、機能まですべてをあなた仕様に。
          </p>
        </Link>

        <Link
          href="/ergogain/semi"
          style={{
            padding: "48px",
            backgroundColor: "white",
            borderRadius: "20px",
            textDecoration: "none",
            border: "1px solid #E5E5E7",
            transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
            display: "block",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(255, 107, 44, 0.2)";
            e.currentTarget.style.borderColor = "#FF6B2C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
            e.currentTarget.style.borderColor = "#E5E5E7";
          }}
        >
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #FF8C5A 0%, #FFB088 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            fontSize: "32px"
          }}>
            🎨
          </div>
          <h2 style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "16px",
            color: "#1D1D1F",
            letterSpacing: "-0.01em"
          }}>
            セミオーダー
          </h2>
          <p style={{
            fontSize: "17px",
            color: "#6E6E73",
            lineHeight: 1.6,
            margin: 0
          }}>
            ベースモデルから選択してカスタマイズ。手軽に自分好みにアレンジできます。
          </p>
        </Link>
      </div>
    </div>
  );
}
