import Link from "next/link";

export default function ErgogainPage() {
  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>Ergogain（オーダーメイド）</h1>
      <p style={{ fontSize: "16px", marginBottom: "40px", color: "#666" }}>
        あなたの体に合わせたオーダーメイド製品を提供します。
      </p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link
          href="/ergogain/full"
          style={{
            padding: "30px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#333",
            flex: "1 1 300px",
            border: "1px solid #ddd"
          }}
        >
          <h2 style={{ margin: 0, marginBottom: "10px", fontSize: "24px" }}>フルオーダー</h2>
          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
            完全にカスタマイズされた製品を作成
          </p>
        </Link>

        <Link
          href="/ergogain/semi"
          style={{
            padding: "30px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#333",
            flex: "1 1 300px",
            border: "1px solid #ddd"
          }}
        >
          <h2 style={{ margin: 0, marginBottom: "10px", fontSize: "24px" }}>セミオーダー</h2>
          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
            ベースモデルから選択してカスタマイズ
          </p>
        </Link>
      </div>
    </div>
  );
}
