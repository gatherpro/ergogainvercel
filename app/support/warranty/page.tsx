import Link from "next/link";

export default function WarrantyPage() {
  return (
    <div>
      <Link href="/support" style={{ color: "#0070f3", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>
        ← サポートに戻る
      </Link>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>保証について</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>製品保証</h2>
        <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>
          すべての製品には、お買い上げ日から1年間の保証が付いています。
        </p>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>保証内容</h2>
        <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>
          通常使用における製造上の欠陥が対象となります。
        </p>
      </section>
    </div>
  );
}
