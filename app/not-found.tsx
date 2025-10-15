import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "72px", margin: 0, marginBottom: "20px", color: "#999" }}>404</h1>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>ページが見つかりません</h2>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "40px" }}>
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 30px",
          backgroundColor: "#0070f3",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px"
        }}
      >
        ホームに戻る
      </Link>
    </div>
  );
}
