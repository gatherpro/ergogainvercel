import Link from "next/link";

const products = [
  { handle: "alpha", name: "Alpha", description: "スタンダードモデル", emoji: "⭐" },
  { handle: "beta", name: "Beta", description: "プレミアムモデル", emoji: "💎" },
  { handle: "gamma", name: "Gamma", description: "エントリーモデル", emoji: "🌟" },
];

export default function ErgonomicsPage() {
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

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px"
      }}>
        {products.map((product) => (
          <Link
            key={product.handle}
            href={`/ergonomics/${product.handle}`}
            style={{
              padding: "40px",
              backgroundColor: "white",
              borderRadius: "16px",
              textDecoration: "none",
              border: "1px solid #E5E5E7",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "block",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 107, 44, 0.15)";
              e.currentTarget.style.borderColor = "#FF6B2C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.06)";
              e.currentTarget.style.borderColor = "#E5E5E7";
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>{product.emoji}</div>
            <h2 style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "12px",
              color: "#1D1D1F",
              letterSpacing: "-0.01em"
            }}>
              {product.name}
            </h2>
            <p style={{
              fontSize: "16px",
              color: "#6E6E73",
              lineHeight: 1.6,
              margin: 0
            }}>
              {product.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
