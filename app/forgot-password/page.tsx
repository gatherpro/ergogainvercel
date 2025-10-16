"use client";

import { useState } from "react";
import Link from "next/link";
import { customerRecover } from "../../lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);
    setLoading(true);

    const result = await customerRecover(email);

    if (result.success) {
      setSuccess(true);
      setEmail("");
    } else {
      setErrors(result.errors);
    }

    setLoading(false);
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
        パスワードをお忘れの方
      </h1>

      <p style={{
        fontSize: "17px",
        color: "#6E6E73",
        lineHeight: 1.5,
        marginBottom: "48px",
        textAlign: "center"
      }}>
        ご登録のメールアドレスを入力してください。<br />
        パスワードリセット用のリンクをお送りします。
      </p>

      {success && (
        <div style={{
          padding: "16px",
          marginBottom: "24px",
          backgroundColor: "#E8F5E9",
          border: "1px solid #C8E6C9",
          borderRadius: "12px",
          color: "#2E7D32",
          fontSize: "15px",
          lineHeight: 1.6
        }}>
          パスワードリセット用のメールを送信しました。<br />
          メールに記載されているリンクから、パスワードを再設定してください。
        </div>
      )}

      {errors.length > 0 && (
        <div style={{
          padding: "16px",
          marginBottom: "24px",
          backgroundColor: "#FFEBEE",
          border: "1px solid #FFCDD2",
          borderRadius: "12px",
          color: "#C62828"
        }}>
          {errors.map((error, index) => (
            <p key={index} style={{ fontSize: "15px", marginBottom: index < errors.length - 1 ? "8px" : 0 }}>
              • {error}
            </p>
          ))}
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
          {loading ? "送信中..." : "リセットメールを送信"}
        </button>
      </form>

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
          <Link
            href="/login"
            style={{
              color: "#FF6B2C",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            ログインページに戻る
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
        メールが届かない場合は、迷惑メールフォルダをご確認ください。
      </p>
    </div>
  );
}
