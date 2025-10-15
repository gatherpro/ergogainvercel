import Link from "next/link";

const supportItems = [
  {
    href: "/support/faq",
    title: "よくある質問（FAQ）",
    description: "製品やサービスに関するよくある質問",
    emoji: "❓"
  },
  {
    href: "/support/contact",
    title: "お問い合わせ",
    description: "ご質問やご相談はこちらから",
    emoji: "✉️"
  },
  {
    href: "/support/warranty",
    title: "保証について",
    description: "製品保証に関する情報",
    emoji: "🛡️"
  }
];

export default function SupportPage() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "96px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 56px)",
          fontWeight: 700,
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          color: "#1D1D1F"
        }}>
          サポート
        </h1>
        <p style={{
          fontSize: "19px",
          color: "#6E6E73",
          lineHeight: 1.6
        }}>
          お客様のサポート情報をご案内します
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {supportItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "32px",
              backgroundColor: "white",
              borderRadius: "16px",
              textDecoration: "none",
              border: "1px solid #E5E5E7",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "block",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 107, 44, 0.12)";
              e.currentTarget.style.borderColor = "#FF6B2C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.06)";
              e.currentTarget.style.borderColor = "#E5E5E7";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ fontSize: "40px", flexShrink: 0 }}>{item.emoji}</div>
              <div>
                <h2 style={{
                  margin: 0,
                  marginBottom: "8px",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#1D1D1F",
                  letterSpacing: "-0.01em"
                }}>
                  {item.title}
                </h2>
                <p style={{
                  margin: 0,
                  fontSize: "16px",
                  color: "#6E6E73"
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
