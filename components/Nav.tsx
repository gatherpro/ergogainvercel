"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { hasToken } from "../lib/token";
import { useCart } from "../contexts/CartContext";

export default function Nav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // ログイン状態をチェック
    setIsLoggedIn(hasToken());
  }, [pathname]);

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
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      boxShadow: isScrolled ? "0 1px 8px rgba(0, 0, 0, 0.06)" : "none",
      transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: isScrolled ? "60px" : "64px",
        transition: "height 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
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
                  color: isActive ? "#FF6B2C" : "#111",
                  textDecoration: "none",
                  transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
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
                    height: "1px",
                    background: "currentColor",
                    opacity: 0.4
                  }} />
                )}
              </Link>
            );
          })}

          {/* カートアイコン */}
          <Link
            href="/cart"
            style={{
              position: "relative",
              fontSize: "15px",
              fontWeight: pathname === "/cart" ? 600 : 400,
              color: pathname === "/cart" ? "#FF6B2C" : "#111",
              textDecoration: "none",
              transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              padding: "8px 0"
            }}
          >
            カート
            {itemCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-4px",
                right: "-16px",
                backgroundColor: "#FF6B2C",
                color: "white",
                fontSize: "11px",
                fontWeight: 700,
                borderRadius: "10px",
                padding: "2px 6px",
                minWidth: "18px",
                textAlign: "center"
              }}>
                {itemCount}
              </span>
            )}
          </Link>

          {/* マイアカウント */}
          <Link
            href={isLoggedIn ? "/account" : "/login"}
            style={{
              fontSize: "15px",
              fontWeight: pathname === "/account" || pathname === "/login" ? 600 : 400,
              color: pathname === "/account" || pathname === "/login" ? "#FF6B2C" : "#111",
              textDecoration: "none",
              transition: "color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              padding: "8px 0"
            }}
          >
            マイアカウント
          </Link>
        </div>
      </div>
    </nav>
  );
}
