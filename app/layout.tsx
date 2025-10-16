import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ClientProviders from "../components/ClientProviders";
import "./globals.css";

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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>
        <ClientProviders>
          <Nav />
          <main style={{
            flex: 1,
            width: "100%"
          }}>
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
