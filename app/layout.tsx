import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Ergogain（仮）公式サイト",
  description: "人間工学に基づいた製品を提供するErgogainの公式サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: "system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>
        <Nav />
        <main style={{
          flex: 1,
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "40px 20px"
        }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
