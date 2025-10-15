export default function AboutPage() {
  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>会社情報</h1>
      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>会社概要</h2>
        <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>
          Ergogain（仮）は、人間工学に基づいた製品を提供する企業です。
          お客様一人ひとりの体に合わせた製品を通じて、快適な生活をサポートします。
        </p>
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>ミッション</h2>
        <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6" }}>
          人間工学の知見を活かし、より快適で健康的な製品を提供することで、
          すべての人の生活の質を向上させることを目指しています。
        </p>
      </section>
    </div>
  );
}
