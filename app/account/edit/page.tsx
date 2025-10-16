"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCustomer, customerUpdate } from "../../../lib/auth";
import { getToken } from "../../../lib/token";
import type { Customer } from "../../../lib/shopify";

export default function EditProfilePage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const loadCustomer = async () => {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const data = await getCustomer(token);
      if (data) {
        setCustomer(data);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      }
      setLoading(false);
    };

    loadCustomer();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    setSaving(true);

    const result = await customerUpdate(token, {
      firstName: formData.firstName || undefined,
      lastName: formData.lastName || undefined,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/account");
      }, 1500);
    } else {
      setErrors(result.errors);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)",
        fontSize: "17px",
        color: "#6E6E73"
      }}>
        読み込み中...
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "96px 24px",
      minHeight: "calc(100vh - 200px)"
    }}>
      <Link
        href="/account"
        style={{
          color: "#FF6B2C",
          textDecoration: "none",
          marginBottom: "32px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "15px",
          fontWeight: 500
        }}
      >
        ← アカウントに戻る
      </Link>

      <h1 style={{
        fontSize: "clamp(32px, 5vw, 48px)",
        fontWeight: 700,
        marginTop: "32px",
        marginBottom: "16px",
        letterSpacing: "-0.02em",
        color: "#1D1D1F",
        lineHeight: 1.15
      }}>
        プロフィール編集
      </h1>

      <p style={{
        fontSize: "17px",
        color: "#6E6E73",
        marginBottom: "48px"
      }}>
        アカウント情報を更新します
      </p>

      {success && (
        <div style={{
          padding: "16px",
          marginBottom: "24px",
          backgroundColor: "#E8F5E9",
          border: "1px solid #C8E6C9",
          borderRadius: "12px",
          color: "#2E7D32",
          fontSize: "15px"
        }}>
          プロフィールを更新しました。アカウントページに戻ります...
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

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
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
            htmlFor="phone"
            style={{
              display: "block",
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#1D1D1F"
            }}
          >
            電話番号
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="03-1234-5678"
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

        <div style={{
          display: "flex",
          gap: "16px",
          marginTop: "16px"
        }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              flex: 1,
              padding: "16px",
              fontSize: "17px",
              fontWeight: 600,
              color: "white",
              background: saving ? "#D2D2D7" : "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
              border: "none",
              borderRadius: "12px",
              cursor: saving ? "not-allowed" : "pointer",
              transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: saving ? "none" : "0 4px 12px rgba(255, 107, 44, 0.25)"
            }}
            onMouseEnter={(e) => {
              if (!saving) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 44, 0.35)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 44, 0.25)";
            }}
          >
            {saving ? "保存中..." : "変更を保存"}
          </button>

          <Link
            href="/account"
            style={{
              flex: 1,
              padding: "16px",
              fontSize: "17px",
              fontWeight: 600,
              color: "#6E6E73",
              backgroundColor: "white",
              border: "2px solid #D2D2D7",
              borderRadius: "12px",
              textAlign: "center",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6E6E73";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#D2D2D7";
            }}
          >
            キャンセル
          </Link>
        </div>
      </form>
    </div>
  );
}
