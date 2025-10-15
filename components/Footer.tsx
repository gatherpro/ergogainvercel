import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    {
      title: "製品",
      links: [
        { label: "Ergogain", href: "/ergogain" },
        { label: "既製品", href: "/ergonomics" },
      ]
    },
    {
      title: "会社情報",
      links: [
        { label: "会社概要", href: "/about" },
        { label: "お知らせ", href: "/news" },
      ]
    },
    {
      title: "サポート",
      links: [
        { label: "FAQ", href: "/support/faq" },
        { label: "お問い合わせ", href: "/support/contact" },
        { label: "保証", href: "/support/warranty" },
      ]
    }
  ];

  return (
    <footer style={{
      backgroundColor: "#F5F5F7",
      borderTop: "1px solid #E5E5E7",
      marginTop: "auto"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "64px 24px 32px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px",
          marginBottom: "48px"
        }}>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1D1D1F",
                marginBottom: "16px",
                letterSpacing: "-0.01em"
              }}>
                {section.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {section.links.map((link) => (
                  <li key={link.href} style={{ marginBottom: "12px" }}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "14px",
                        color: "#6E6E73",
                        textDecoration: "none",
                        transition: "color 0.3s ease"
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: "24px",
          borderTop: "1px solid #E5E5E7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <p style={{
            fontSize: "13px",
            color: "#86868B",
            margin: 0
          }}>
            © 2025 Ergogain（仮） All rights reserved.
          </p>

          <Link
            href="/"
            style={{
              fontSize: "16px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textDecoration: "none",
              letterSpacing: "-0.02em"
            }}
          >
            Ergogain
          </Link>
        </div>
      </div>
    </footer>
  );
}
