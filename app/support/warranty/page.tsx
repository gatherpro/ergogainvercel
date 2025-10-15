import Link from "next/link";

export default function WarrantyPage() {
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
          保証について
        </h1>
      </div>

      <section style={{
        padding: "48px",
        backgroundColor: "white",
        borderRadius: "20px",
        border: "1px solid #E5E5E7",
        marginBottom: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)"
      }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "16px",
          color: "#1D1D1F",
          letterSpacing: "-0.01em"
        }}>
          製品保証
        </h2>
        <p style={{
          fontSize: "17px",
          color: "#6E6E73",
          lineHeight: 1.8,
          margin: 0
        }}>
          すべての製品には、お買い上げ日から1年間の保証が付いています。
        </p>
      </section>

      <section style={{
        padding: "48px",
        background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
        borderRadius: "20px",
        color: "white"
      }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "16px",
          letterSpacing: "-0.01em"
        }}>
          保証内容
        </h2>
        <p style={{
          fontSize: "17px",
          lineHeight: 1.8,
          margin: 0,
          opacity: 0.95
        }}>
          通常使用における製造上の欠陥が対象となります。詳細については、製品に同梱の保証書をご確認ください。
        </p>
      </section>
    </div>
  );
}
