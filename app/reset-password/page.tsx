"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { customerResetByUrl } from "../../lib/auth";
import { saveToken } from "../../lib/token";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  useEffect(() => {
    // URLパラメータからリセットURLを取得
    const url = searchParams.get("url");
    console.log("Reset URL from params:", url);

    if (url) {
      console.log("Setting reset URL:", url);
      setResetUrl(url);
    } else {
      // URLパラメータがない場合は、現在のURLをリセットURLとして使用
      // Shopifyメールのリンクから直接アクセスされた場合
      const fullUrl = window.location.href;
      console.log("Full URL:", fullUrl);

      if (fullUrl.includes("/account/reset/")) {
        setResetUrl(fullUrl);
      } else {
        setErrors(["無効なリセットリンクです。もう一度パスワードリセットをリクエストしてください。"]);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    console.log("handleSubmit called with resetUrl:", resetUrl);

    if (!resetUrl) {
      setErrors(["無効なリセットリンクです。"]);
      return;
    }

    if (password.length < 8) {
      setErrors(["パスワードは8文字以上で入力してください。"]);
      return;
    }

    if (password !== confirmPassword) {
      setErrors(["パスワードが一致しません。"]);
      return;
    }

    setLoading(true);

    console.log("Calling customerResetByUrl with URL:", resetUrl);
    const result = await customerResetByUrl(resetUrl, password);
    console.log("customerResetByUrl result:", result);

    if (result.success && result.accessToken) {
      // パスワードリセット成功 - トークンを保存して自動ログイン
      console.log("Password reset successful, saving token and redirecting");
      saveToken(result.accessToken.accessToken, result.accessToken.expiresAt);
      // アカウントページへリダイレクト
      router.push("/account");
    } else {
      console.log("Password reset failed:", result.errors);
      setErrors(result.errors.length > 0 ? result.errors : ["パスワードのリセットに失敗しました。リンクの有効期限が切れている可能性があります。"]);
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
        パスワードの再設定
      </h1>

      <p style={{
        fontSize: "17px",
        color: "#6E6E73",
        lineHeight: 1.5,
        marginBottom: "48px",
        textAlign: "center"
      }}>
        新しいパスワードを入力してください。
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
            新しいパスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
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
            パスワード（確認）
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          disabled={loading || !resetUrl}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "17px",
            fontWeight: 600,
            color: "white",
            background: (loading || !resetUrl) ? "#D2D2D7" : "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
            border: "none",
            borderRadius: "12px",
            cursor: (loading || !resetUrl) ? "not-allowed" : "pointer",
            transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
            boxShadow: (loading || !resetUrl) ? "none" : "0 4px 12px rgba(255, 107, 44, 0.25)",
            marginTop: "8px"
          }}
          onMouseEnter={(e) => {
            if (!loading && resetUrl) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 44, 0.35)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 44, 0.25)";
          }}
        >
          {loading ? "処理中..." : "パスワードを変更"}
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
        リンクが無効な場合は、再度パスワードリセットをリクエストしてください。
      </p>
    </div>
  );
}
