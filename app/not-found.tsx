"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "96px 24px",
      textAlign: "center"
    }}>
      <h1 style={{
        fontSize: "clamp(80px, 15vw, 120px)",
        fontWeight: 700,
        margin: 0,
        marginBottom: "24px",
        background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "-0.04em"
      }}>
        404
      </h1>

      <h2 style={{
        fontSize: "clamp(28px, 4vw, 36px)",
        fontWeight: 600,
        marginBottom: "16px",
        color: "#1D1D1F",
        letterSpacing: "-0.02em"
      }}>
        ページが見つかりません
      </h2>

      <p style={{
        fontSize: "17px",
        color: "#6E6E73",
        marginBottom: "48px",
        lineHeight: 1.6
      }}>
        お探しのページは存在しないか、移動された可能性があります。
      </p>

      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "16px 32px",
          fontSize: "17px",
          fontWeight: 600,
          background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
          color: "white",
          textDecoration: "none",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(255, 107, 44, 0.3)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 107, 44, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 44, 0.3)";
        }}
      >
        ホームに戻る
      </Link>
    </div>
  );
}
