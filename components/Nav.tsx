"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/ergogain", label: "Ergogain" },
    { href: "/ergonomics", label: "既製品" },
    { href: "/about", label: "会社情報" },
    { href: "/support", label: "サポート" },
    { href: "/news", label: "お知らせ" },
  ];

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px"
      }}>
        <Link
          href="/"
          style={{
            fontSize: "20px",
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

        <div style={{
          display: "flex",
          gap: "32px",
          alignItems: "center"
        }}>
          {navItems.slice(1).map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "15px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#FF6B2C" : "#1D1D1F",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  padding: "8px 0"
                }}
              >
                {item.label}
                {isActive && (
                  <span style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
                    borderRadius: "2px"
                  }} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
