import Link from "next/link";

export default function SupportPage() {
  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>サポート</h1>
      <p style={{ fontSize: "16px", marginBottom: "40px", color: "#666" }}>
        お客様のサポート情報をご案内します。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link
          href="/support/faq"
          style={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#333",
            border: "1px solid #ddd"
          }}
        >
          <h2 style={{ margin: 0, marginBottom: "5px", fontSize: "20px" }}>よくある質問（FAQ）</h2>
          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>製品やサービスに関するよくある質問</p>
        </Link>

        <Link
          href="/support/contact"
          style={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#333",
            border: "1px solid #ddd"
          }}
        >
          <h2 style={{ margin: 0, marginBottom: "5px", fontSize: "20px" }}>お問い合わせ</h2>
          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>ご質問やご相談はこちらから</p>
        </Link>

        <Link
          href="/support/warranty"
          style={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#333",
            border: "1px solid #ddd"
          }}
        >
          <h2 style={{ margin: 0, marginBottom: "5px", fontSize: "20px" }}>保証について</h2>
          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>製品保証に関する情報</p>
        </Link>
      </div>
    </div>
  );
}
