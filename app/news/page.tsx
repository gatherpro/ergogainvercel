const newsItems = [
  { date: "2025-01-15", title: "新製品「Gamma」発売のお知らせ", emoji: "🎉" },
  { date: "2025-01-10", title: "年末年始の営業について", emoji: "📅" },
  { date: "2024-12-20", title: "Webサイトをリニューアルしました", emoji: "✨" },
];

export default function NewsPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "96px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 56px)",
          fontWeight: 700,
          marginBottom: "24px",
          letterSpacing: "-0.02em",
          color: "#1D1D1F"
        }}>
          お知らせ
        </h1>
        <p style={{
          fontSize: "19px",
          color: "#6E6E73",
          lineHeight: 1.6
        }}>
          最新のお知らせをご確認いただけます
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {newsItems.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "32px",
              backgroundColor: "white",
              borderRadius: "16px",
              border: "1px solid #E5E5E7",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.06)";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div style={{ fontSize: "32px", flexShrink: 0 }}>{item.emoji}</div>
              <div>
                <time style={{
                  fontSize: "14px",
                  color: "#86868B",
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 500
                }}>
                  {item.date}
                </time>
                <h2 style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1D1D1F",
                  letterSpacing: "-0.01em"
                }}>
                  {item.title}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
