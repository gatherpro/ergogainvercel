import Link from "next/link";

export default function ContactPage() {
  return (
    <div>
      <Link href="/support" style={{ color: "#0070f3", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>
        ← サポートに戻る
      </Link>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>お問い合わせ</h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
        お問い合わせフォームは準備中です。
      </p>

      <div style={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <h3 style={{ margin: 0, marginBottom: "10px" }}>メールでのお問い合わせ</h3>
        <p style={{ margin: 0, fontSize: "16px", color: "#666" }}>
          support@ergogain.example.com
        </p>
      </div>
    </div>
  );
}
