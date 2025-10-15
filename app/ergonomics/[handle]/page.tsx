import Link from "next/link";

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
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
          transition: "all 0.3s ease"
        }}
      >
        ← 既製品一覧に戻る
      </Link>

      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 64px)",
          fontWeight: 700,
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          color: "#1D1D1F",
          textTransform: "capitalize"
        }}>
          {params.handle}
        </h1>
        <p style={{
          fontSize: "19px",
          color: "#6E6E73",
          maxWidth: "600px",
          margin: "0 auto 64px",
          lineHeight: 1.6
        }}>
          この製品の詳細情報は準備中です。
        </p>

        <div style={{
          padding: "48px",
          background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
          borderRadius: "24px",
          color: "white"
        }}>
          <h2 style={{ fontSize: "28px", marginBottom: "16px", fontWeight: 600 }}>
            Coming Soon
          </h2>
          <p style={{ fontSize: "17px", margin: 0, opacity: 0.95 }}>
            より詳しい情報は近日公開予定です
          </p>
        </div>
      </div>
    </div>
  );
}
