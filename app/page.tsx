import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>Ergogain（仮）公式サイト</h1>
      <p style={{ fontSize: "18px", marginBottom: "40px", color: "#666" }}>
        人間工学に基づいた製品を提供しています。
      </p>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>製品カテゴリ</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Link
            href="/ergogain"
            style={{
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#333",
              flex: "1 1 300px",
              border: "1px solid #ddd"
            }}
          >
            <h3 style={{ margin: 0, marginBottom: "10px" }}>Ergogain（オーダーメイド）</h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
              フルオーダー・セミオーダーから選べます
            </p>
          </Link>

          <Link
            href="/ergonomics"
            style={{
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#333",
              flex: "1 1 300px",
              border: "1px solid #ddd"
            }}
          >
            <h3 style={{ margin: 0, marginBottom: "10px" }}>既製品</h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
              すぐにお使いいただける製品ラインナップ
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
