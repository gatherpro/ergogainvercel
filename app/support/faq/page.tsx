import Link from "next/link";

const faqs = [
  { q: "納期はどのくらいですか？", a: "ご注文から約2〜4週間でお届けします。" },
  { q: "返品は可能ですか？", a: "未使用品に限り、到着後7日以内であれば返品可能です。" },
  { q: "オーダーメイドの流れを教えてください", a: "採寸→デザイン確認→製作→納品の流れとなります。" },
];

export default function FAQPage() {
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
          よくある質問（FAQ）
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              padding: "32px",
              backgroundColor: "white",
              borderRadius: "16px",
              border: "1px solid #E5E5E7",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)"
            }}
          >
            <h3 style={{
              margin: 0,
              marginBottom: "16px",
              fontSize: "20px",
              fontWeight: 600,
              color: "#1D1D1F",
              letterSpacing: "-0.01em"
            }}>
              Q: {faq.q}
            </h3>
            <p style={{
              margin: 0,
              fontSize: "17px",
              color: "#6E6E73",
              lineHeight: 1.6
            }}>
              A: {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
