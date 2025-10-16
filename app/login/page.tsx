"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { customerLogin } from "../../lib/auth";
import { saveToken } from "../../lib/token";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await customerLogin(email, password);

      if (result) {
        // トークンを保存
        saveToken(result.accessToken, result.expiresAt);
        // アカウントページへリダイレクト
        router.push("/account");
      } else {
        setError("メールアドレスまたはパスワードが正しくありません。");
      }
    } catch (err) {
      setError("ログインに失敗しました。もう一度お試しください。");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "480px",
      margin: "0 auto",
      padding: "96px 24px",
      minHeight: "calc(100vh - 200px)"
    }}>
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 48px)",
        fontWeight: 700,
        marginBottom: "16px",
        letterSpacing: "-0.02em",
        color: "#1D1D1F",
        lineHeight: 1.15,
        textAlign: "center"
      }}>
        ログイン
      </h1>

      <p style={{
        fontSize: "17px",
        color: "#6E6E73",
        lineHeight: 1.5,
        marginBottom: "48px",
        textAlign: "center"
      }}>
        アカウントにログインして、<br />
        ご注文履歴やアカウント情報を確認できます。
      </p>

      {error && (
        <div style={{
          padding: "16px",
          marginBottom: "24px",
          backgroundColor: "#FFEBEE",
          border: "1px solid #FFCDD2",
          borderRadius: "12px",
          color: "#C62828",
          fontSize: "15px"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#1D1D1F"
            }}
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: "16px",
              border: "1px solid #D2D2D7",
              borderRadius: "12px",
              outline: "none",
              transition: "border-color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = "#FF6B2C"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#D2D2D7"}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            style={{
              display: "block",
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#1D1D1F"
            }}
          >
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: "16px",
              border: "1px solid #D2D2D7",
              borderRadius: "12px",
              outline: "none",
              transition: "border-color 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = "#FF6B2C"}
            onBlur={(e) => e.currentTarget.style.borderColor = "#D2D2D7"}
          />
          <p style={{ fontSize: "14px", marginTop: "8px", textAlign: "right" }}>
            <Link
              href="/forgot-password"
              style={{
                color: "#FF6B2C",
                textDecoration: "none",
                fontWeight: 500
              }}
            >
              パスワードをお忘れの方
            </Link>
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "17px",
            fontWeight: 600,
            color: "white",
            background: loading ? "#D2D2D7" : "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
            border: "none",
            borderRadius: "12px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: loading ? "none" : "0 4px 12px rgba(255, 107, 44, 0.25)",
            marginTop: "8px"
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 44, 0.35)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 44, 0.25)";
          }}
        >
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        margin: "24px 0"
      }}>
        <div style={{ flex: 1, height: "1px", background: "#D2D2D7" }} />
        <span style={{ color: "#86868B", fontSize: "14px" }}>または</span>
        <div style={{ flex: 1, height: "1px", background: "#D2D2D7" }} />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/account" })}
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "16px",
          fontWeight: 600,
          color: "#1D1D1F",
          background: "white",
          border: "2px solid #D2D2D7",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#86868B";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#D2D2D7";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Googleでログイン
      </button>

      <div style={{
        marginTop: "32px",
        paddingTop: "32px",
        borderTop: "1px solid #D2D2D7",
        textAlign: "center"
      }}>
        <p style={{
          fontSize: "15px",
          color: "#6E6E73"
        }}>
          アカウントをお持ちでない場合は{" "}
          <Link
            href="/register"
            style={{
              color: "#FF6B2C",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            新規登録
          </Link>
        </p>
      </div>

      <p style={{
        fontSize: "13px",
        color: "#86868B",
        textAlign: "center",
        marginTop: "32px",
        lineHeight: 1.5
      }}>
        ログイン情報はSSL暗号化通信により保護されています。
      </p>
    </div>
  );
}
