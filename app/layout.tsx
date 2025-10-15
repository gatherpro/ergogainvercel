import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Storefront MVP",
  description: "Minimal Shopify Storefront API implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
