import Link from "next/link";

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  return (
    <div>
      <Link href="/ergonomics" style={{ color: "#0070f3", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>
        ← 既製品一覧に戻る
      </Link>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>{params.handle}</h1>
      <p style={{ fontSize: "16px", color: "#666" }}>
        この製品の詳細情報は準備中です。
      </p>
    </div>
  );
}
