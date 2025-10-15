"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section" style={{
        background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
        padding: "96px 24px",
        marginBottom: "96px",
        borderRadius: "24px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 700,
            color: "white",
            marginBottom: "24px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1
          }}>
            人間工学が生み出す<br />最高の体験
          </h1>
          <p style={{
            fontSize: "clamp(18px, 2.5vw, 21px)",
            color: "rgba(255, 255, 255, 0.95)",
            marginBottom: "40px",
            lineHeight: 1.5
          }}>
            あなたの体に完璧にフィットする、<br />オーダーメイドと既製品の革新的なソリューション
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/ergogain"
              className="btn btn-secondary"
              style={{
                backgroundColor: "white",
                color: "#FF6B2C",
                padding: "16px 32px",
                fontSize: "17px",
                fontWeight: 600,
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
              }}
            >
              オーダーメイドを見る
            </Link>
            <Link
              href="/ergonomics"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                padding: "16px 32px",
                fontSize: "17px",
                fontWeight: 600,
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)"
              }}
            >
              既製品を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            marginBottom: "16px",
            letterSpacing: "-0.02em",
            color: "#1D1D1F"
          }}>
            製品カテゴリ
          </h2>
          <p style={{
            fontSize: "19px",
            color: "#6E6E73",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            あなたのニーズに合わせた最適なソリューションを提供します
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px"
        }}>
          <Link
            href="/ergogain"
            style={{
              padding: "40px",
              backgroundColor: "white",
              borderRadius: "16px",
              textDecoration: "none",
              border: "1px solid #E5E5E7",
              transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              display: "block",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 107, 44, 0.15)";
              e.currentTarget.style.borderColor = "#FF6B2C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.06)";
              e.currentTarget.style.borderColor = "#E5E5E7";
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              fontSize: "24px"
            }}>
              ✨
            </div>
            <h3 style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "12px",
              color: "#1D1D1F",
              letterSpacing: "-0.01em"
            }}>
              Ergogain（オーダーメイド）
            </h3>
            <p style={{
              fontSize: "16px",
              color: "#6E6E73",
              lineHeight: 1.6,
              margin: 0
            }}>
              あなたの体に完璧にフィットする、フルオーダー・セミオーダーから選べるカスタマイズソリューション
            </p>
          </Link>

          <Link
            href="/ergonomics"
            style={{
              padding: "40px",
              backgroundColor: "white",
              borderRadius: "16px",
              textDecoration: "none",
              border: "1px solid #E5E5E7",
              transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              display: "block",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 107, 44, 0.15)";
              e.currentTarget.style.borderColor = "#FF6B2C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.06)";
              e.currentTarget.style.borderColor = "#E5E5E7";
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #FF8C5A 0%, #FFB088 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
              fontSize: "24px"
            }}>
              🎯
            </div>
            <h3 style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "12px",
              color: "#1D1D1F",
              letterSpacing: "-0.01em"
            }}>
              既製品
            </h3>
            <p style={{
              fontSize: "16px",
              color: "#6E6E73",
              lineHeight: 1.6,
              margin: 0
            }}>
              すぐにお使いいただける、厳選された製品ラインナップ。高品質な人間工学設計
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
