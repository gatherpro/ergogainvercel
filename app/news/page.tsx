const newsItems = [
  { date: "2025-01-15", title: "新製品「Gamma」発売のお知らせ" },
  { date: "2025-01-10", title: "年末年始の営業について" },
  { date: "2024-12-20", title: "Webサイトをリニューアルしました" },
];

export default function NewsPage() {
  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>お知らせ</h1>
      <p style={{ fontSize: "16px", marginBottom: "40px", color: "#666" }}>
        最新のお知らせをご確認いただけます。
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {newsItems.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}
          >
            <time style={{ fontSize: "14px", color: "#999", display: "block", marginBottom: "5px" }}>
              {item.date}
            </time>
            <h2 style={{ margin: 0, fontSize: "20px" }}>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
