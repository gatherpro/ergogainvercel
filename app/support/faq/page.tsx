import Link from "next/link";

const faqs = [
  { q: "納期はどのくらいですか？", a: "ご注文から約2〜4週間でお届けします。" },
  { q: "返品は可能ですか？", a: "未使用品に限り、到着後7日以内であれば返品可能です。" },
  { q: "オーダーメイドの流れを教えてください", a: "採寸→デザイン確認→製作→納品の流れとなります。" },
];

export default function FAQPage() {
  return (
    <div>
      <Link href="/support" style={{ color: "#0070f3", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>
        ← サポートに戻る
      </Link>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>よくある質問（FAQ）</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
            <h3 style={{ margin: 0, marginBottom: "10px", fontSize: "18px" }}>Q: {faq.q}</h3>
            <p style={{ margin: 0, fontSize: "16px", color: "#666" }}>A: {faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
