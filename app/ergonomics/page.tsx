import Link from "next/link";

const products = [
  { handle: "alpha", name: "Alpha", description: "スタンダードモデル" },
  { handle: "beta", name: "Beta", description: "プレミアムモデル" },
  { handle: "gamma", name: "Gamma", description: "エントリーモデル" },
];

export default function ErgonomicsPage() {
  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>既製品一覧</h1>
      <p style={{ fontSize: "16px", marginBottom: "40px", color: "#666" }}>
        すぐにお使いいただける製品ラインナップ
      </p>

      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {products.map((product) => (
          <Link
            key={product.handle}
            href={`/ergonomics/${product.handle}`}
            style={{
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#333",
              border: "1px solid #ddd",
              transition: "all 0.2s"
            }}
          >
            <h2 style={{ margin: 0, marginBottom: "10px", fontSize: "22px" }}>{product.name}</h2>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
