export default function AboutPage() {
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
          会社情報
        </h1>
        <p style={{
          fontSize: "19px",
          color: "#6E6E73",
          lineHeight: 1.6
        }}>
          人間工学に基づいた革新的な製品を提供します
        </p>
      </div>

      <section style={{
        padding: "48px",
        backgroundColor: "white",
        borderRadius: "20px",
        border: "1px solid #E5E5E7",
        marginBottom: "32px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)"
      }}>
        <h2 style={{
          fontSize: "28px",
          fontWeight: 600,
          marginBottom: "20px",
          color: "#1D1D1F",
          letterSpacing: "-0.01em"
        }}>
          会社概要
        </h2>
        <p style={{
          fontSize: "17px",
          color: "#6E6E73",
          lineHeight: 1.8,
          margin: 0
        }}>
          Ergogain（仮）は、人間工学に基づいた製品を提供する企業です。
          お客様一人ひとりの体に合わせた製品を通じて、快適な生活をサポートします。
        </p>
      </section>

      <section style={{
        padding: "48px",
        background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
        borderRadius: "20px",
        color: "white"
      }}>
        <h2 style={{
          fontSize: "28px",
          fontWeight: 600,
          marginBottom: "20px",
          letterSpacing: "-0.01em"
        }}>
          ミッション
        </h2>
        <p style={{
          fontSize: "17px",
          lineHeight: 1.8,
          margin: 0,
          opacity: 0.95
        }}>
          人間工学の知見を活かし、より快適で健康的な製品を提供することで、
          すべての人の生活の質を向上させることを目指しています。
        </p>
      </section>
    </div>
  );
}
