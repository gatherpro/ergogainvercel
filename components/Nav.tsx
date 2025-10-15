import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderBottom: "1px solid #ddd"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>
          Home
        </Link>
        <Link href="/ergogain" style={{ textDecoration: "none", color: "#333" }}>
          Ergogain
        </Link>
        <Link href="/ergonomics" style={{ textDecoration: "none", color: "#333" }}>
          既製品
        </Link>
        <Link href="/about" style={{ textDecoration: "none", color: "#333" }}>
          会社情報
        </Link>
        <Link href="/support" style={{ textDecoration: "none", color: "#333" }}>
          サポート
        </Link>
        <Link href="/news" style={{ textDecoration: "none", color: "#333" }}>
          お知らせ
        </Link>
      </div>
    </nav>
  );
}
