"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken } from "../../../lib/token";
import { getCustomerAddresses, customerAddressCreate, customerAddressUpdate, customerAddressDelete, customerDefaultAddressUpdate } from "../../../lib/address";
import type { Address } from "../../../lib/shopify";
import type { AddressInput } from "../../../lib/address";

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<AddressInput>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
    country: "Japan",
    phone: "",
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const data = await getCustomerAddresses(token);
    setAddresses(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    setSaving(true);

    let result;
    if (editingId) {
      result = await customerAddressUpdate(token, editingId, formData);
    } else {
      result = await customerAddressCreate(token, formData);
    }

    if (result.success) {
      await loadAddresses();
      setShowForm(false);
      setEditingId(null);
      resetForm();
    } else {
      setErrors(result.errors);
    }

    setSaving(false);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      address1: address.address1 || "",
      address2: address.address2 || "",
      city: address.city || "",
      province: address.province || "",
      zip: address.zip || "",
      country: address.country || "Japan",
      phone: address.phone || "",
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = async (addressId: string) => {
    if (!confirm("この住所を削除しますか？")) return;

    const token = getToken();
    if (!token) return;

    const result = await customerAddressDelete(token, addressId);
    if (result.success) {
      await loadAddresses();
    } else {
      alert(result.errors.join("\n"));
    }
  };

  const handleSetDefault = async (addressId: string) => {
    const token = getToken();
    if (!token) return;

    const result = await customerDefaultAddressUpdate(token, addressId);
    if (result.success) {
      await loadAddresses();
    } else {
      alert(result.errors.join("\n"));
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      province: "",
      zip: "",
      country: "Japan",
      phone: "",
    });
    setEditingId(null);
    setErrors([]);
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
      maxWidth: "1000px",
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

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "32px",
        marginBottom: "48px"
      }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#1D1D1F",
          lineHeight: 1.15
        }}>
          配送先住所
        </h1>

        {!showForm && (
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: 600,
              color: "white",
              background: "linear-gradient(135deg, #FF6B2C 0%, #FF8C5A 100%)",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: "0 4px 12px rgba(255, 107, 44, 0.25)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 44, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 44, 0.25)";
            }}
          >
            新しい住所を追加
          </button>
        )}
      </div>

      {showForm && (
        <div style={{
          backgroundColor: "#F5F5F7",
          borderRadius: "18px",
          padding: "32px",
          marginBottom: "48px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "24px",
            color: "#1D1D1F"
          }}>
            {editingId ? "住所を編集" : "新しい住所"}
          </h2>

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
                <label style={{ display: "block", fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "#1D1D1F" }}>
                  姓
                </label>
                <input
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
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "#1D1D1F" }}>
                  名
                </label>
                <input
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
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "#1D1D1F" }}>
                郵便番号
              </label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                placeholder="123-4567"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "16px",
                  border: "1px solid #D2D2D7",
                  borderRadius: "12px",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "#1D1D1F" }}>
                都道府県
              </label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                placeholder="東京都"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "16px",
                  border: "1px solid #D2D2D7",
                  borderRadius: "12px",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "#1D1D1F" }}>
                市区町村
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="渋谷区"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "16px",
                  border: "1px solid #D2D2D7",
                  borderRadius: "12px",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "#1D1D1F" }}>
                番地・建物名
              </label>
              <input
                type="text"
                value={formData.address1}
                onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                placeholder="神南1-2-3"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "16px",
                  border: "1px solid #D2D2D7",
                  borderRadius: "12px",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "#1D1D1F" }}>
                建物名・部屋番号（任意）
              </label>
              <input
                type="text"
                value={formData.address2}
                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                placeholder="〇〇マンション 101号室"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "16px",
                  border: "1px solid #D2D2D7",
                  borderRadius: "12px",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "15px", fontWeight: 600, marginBottom: "8px", color: "#1D1D1F" }}>
                電話番号
              </label>
              <input
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
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
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
                  boxShadow: saving ? "none" : "0 4px 12px rgba(255, 107, 44, 0.25)"
                }}
              >
                {saving ? "保存中..." : "保存"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  resetForm();
                }}
                style={{
                  flex: 1,
                  padding: "16px",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#6E6E73",
                  backgroundColor: "white",
                  border: "2px solid #D2D2D7",
                  borderRadius: "12px",
                  cursor: "pointer"
                }}
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {addresses.length === 0 ? (
          <div style={{
            backgroundColor: "#F5F5F7",
            borderRadius: "18px",
            padding: "48px 32px",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "17px", color: "#6E6E73" }}>
              まだ住所が登録されていません
            </p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #D2D2D7",
                borderRadius: "18px",
                padding: "24px"
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px"
              }}>
                <div>
                  <p style={{ fontSize: "19px", fontWeight: 600, color: "#1D1D1F", marginBottom: "12px" }}>
                    {address.lastName} {address.firstName}
                  </p>
                  <p style={{ fontSize: "17px", color: "#6E6E73", lineHeight: 1.6 }}>
                    〒{address.zip}<br />
                    {address.province} {address.city} {address.address1}
                    {address.address2 && <><br />{address.address2}</>}
                    {address.phone && <><br />Tel: {address.phone}</>}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                  <button
                    onClick={() => handleEdit(address)}
                    style={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#FF6B2C",
                      backgroundColor: "white",
                      border: "2px solid #FF6B2C",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    編集
                  </button>

                  <button
                    onClick={() => handleSetDefault(address.id)}
                    style={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#6E6E73",
                      backgroundColor: "white",
                      border: "2px solid #D2D2D7",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    デフォルトに設定
                  </button>

                  <button
                    onClick={() => handleDelete(address.id)}
                    style={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#C62828",
                      backgroundColor: "white",
                      border: "2px solid #FFCDD2",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
