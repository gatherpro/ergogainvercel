import Link from "next/link";

export default function ContactPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "96px 24px" }}>
      <Link
        href="/support"
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
        ← サポートに戻る
      </Link>

      <div style={{ textAlign: "center", marginBottom: "64px", marginTop: "32px" }}>
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 56px)",
          fontWeight: 700,
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          color: "#1D1D1F"
        }}>
          お問い合わせ
        </h1>
        <p style={{
          fontSize: "19px",
          color: "#6E6E73",
          lineHeight: 1.6
        }}>
          お問い合わせフォームは準備中です。
        </p>
      </div>

      <div style={{
        padding: "48px",
        backgroundColor: "white",
        borderRadius: "20px",
        border: "1px solid #E5E5E7",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "48px", marginBottom: "24px" }}>✉️</div>
        <h3 style={{
          margin: 0,
          marginBottom: "16px",
          fontSize: "24px",
          fontWeight: 600,
          color: "#1D1D1F"
        }}>
          メールでのお問い合わせ
        </h3>
        <a
          href="mailto:support@ergogain.example.com"
          style={{
            fontSize: "17px",
            color: "#FF6B2C",
            textDecoration: "none",
            fontWeight: 500
          }}
        >
          support@ergogain.example.com
        </a>
      </div>
    </div>
  );
}
