"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { customerCreate, customerLogin } from "../../lib/auth";
import { saveToken } from "../../lib/token";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // バリデーション
    const validationErrors: string[] = [];

    if (!formData.email || !formData.email.includes("@")) {
      validationErrors.push("有効なメールアドレスを入力してください。");
    }

    if (formData.password.length < 8) {
      validationErrors.push("パスワードは8文字以上で入力してください。");
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.push("パスワードが一致しません。");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // 新規登録
      const result = await customerCreate(
        formData.email,
        formData.password,
        formData.firstName || undefined,
        formData.lastName || undefined
      );

      if (result.success) {
        // 登録成功後、自動ログイン
        const loginResult = await customerLogin(formData.email, formData.password);

        if (loginResult) {
          saveToken(loginResult.accessToken, loginResult.expiresAt);
          router.push("/account");
        } else {
          // ログインに失敗した場合は、ログインページへ
          router.push("/login?registered=true");
        }
      } else {
        setErrors(result.errors);
      }
    } catch (err) {
      setErrors(["登録に失敗しました。もう一度お試しください。"]);
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
        新規登録
      </h1>

      <p style={{
        fontSize: "17px",
        color: "#6E6E73",
        lineHeight: 1.5,
        marginBottom: "48px",
        textAlign: "center"
      }}>
        アカウントを作成して、<br />
        便利な機能をご利用ください。
      </p>

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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label
              htmlFor="lastName"
              style={{
                display: "block",
                fontSize: "15px",
                fontWeight: 600,
                marginBottom: "8px",
                color: "#1D1D1F"
              }}
            >
              姓
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              autoComplete="family-name"
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
              htmlFor="firstName"
              style={{
                display: "block",
                fontSize: "15px",
                fontWeight: 600,
                marginBottom: "8px",
                color: "#1D1D1F"
              }}
            >
              名
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              autoComplete="given-name"
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
        </div>

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
            メールアドレス <span style={{ color: "#FF6B2C" }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            パスワード <span style={{ color: "#FF6B2C" }}>*</span>
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            autoComplete="new-password"
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
          <p style={{ fontSize: "13px", color: "#86868B", marginTop: "6px" }}>
            8文字以上で入力してください
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            style={{
              display: "block",
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#1D1D1F"
            }}
          >
            パスワード（確認） <span style={{ color: "#FF6B2C" }}>*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            autoComplete="new-password"
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
          {loading ? "登録中..." : "アカウントを作成"}
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
          すでにアカウントをお持ちの場合は{" "}
          <Link
            href="/login"
            style={{
              color: "#FF6B2C",
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            ログイン
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
        登録することで、利用規約とプライバシーポリシーに同意したものとみなされます。
      </p>
    </div>
  );
}
