# Shopify Storefront MVP

Shopify Storefront API を使った超最小MVPです。Next.js (App Router, TypeScript) で以下3つのアクションを実装しています：

1. `cartCreate` でカート作成
2. `cartLinesAdd` で商品バリアント追加
3. 返ってきた `checkoutUrl` に遷移

## 機能

- Shopifyストアのカートを作成
- 指定した商品バリアント（Variant ID）をカートに追加
- Shopifyのチェックアウトページに遷移

## 必要なもの

1. **Shopifyストア**（Shopify Partners アカウントで開発ストアを作成可能）
2. **Storefront API Public アクセストークン**
   - Shopify 管理画面 → Settings → Apps and sales channels → Develop apps
   - Headless チャネルで作成したアプリの Storefront API トークン
   - 必要な権限：`unauthenticated_read_product_listings`, `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`
3. **商品バリアントのGID**
   - 例: `gid://shopify/ProductVariant/9026783772894`
   - Shopify 管理画面から商品バリアントのIDを確認し、GID形式に変換

## ローカル開発

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example` を `.env.local` にコピーして、Shopifyの情報を入力：

```bash
cp .env.local.example .env.local
```

`.env.local` の内容：

```env
NEXT_PUBLIC_SHOPIFY_DOMAIN=j0d0xu-n2.myshopify.com
NEXT_PUBLIC_STOREFRONT_TOKEN=a85ff6bbd70e1e4a97dcb3ea8c0c6c58
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 にアクセスしてアプリを確認できます。

### 4. ビルド確認

```bash
npm run build
npm start
```

## Vercelでのデプロイ手順

### 1. GitHubリポジトリにプッシュ

```bash
git add .
git commit -m "Initial commit: Shopify Storefront MVP"
git push origin main
```

### 2. Vercelにデプロイ

1. [Vercel](https://vercel.com) にログイン
2. 「New Project」をクリック
3. GitHubリポジトリを選択（`gatherpro/ergogainvercel`）
4. プロジェクト設定：
   - **Framework Preset**: Next.js（自動検出されます）
   - **Root Directory**: `/`（デフォルト）
   - **Build Command**: `npm run build`（デフォルト）
   - **Output Directory**: `.next`（デフォルト）

### 3. 環境変数の設定

Vercelのプロジェクト設定で以下の環境変数を追加：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SHOPIFY_DOMAIN` | `j0d0xu-n2.myshopify.com` |
| `NEXT_PUBLIC_STOREFRONT_TOKEN` | `a85ff6bbd70e1e4a97dcb3ea8c0c6c58` |

**重要**: 本番環境では、実際のトークンをVercelの環境変数に設定してください。リポジトリにトークンをコミットしないでください。

### 4. デプロイ実行

「Deploy」ボタンをクリックしてデプロイを開始します。

## 使い方

1. **カート作成**: 「1) カート作成」ボタンをクリックして、新しいカートを作成します。Cart IDが表示されます。
2. **Variant ID 入力**: 商品バリアントのGIDを入力します（デフォルト値が設定されています）。
3. **商品追加**: 「2) 商品追加」ボタンをクリックして、カートに商品を追加します。
4. **チェックアウトへ**: 「3) チェックアウトへ進む」リンクをクリックして、Shopifyのチェックアウトページに移動します。

## ディレクトリ構成

```
ergogainvercel/
├── app/
│   ├── api/
│   │   ├── cart-create/
│   │   │   └── route.ts          # カート作成API
│   │   └── cart-add/
│   │       └── route.ts          # 商品追加API
│   ├── layout.tsx                # ルートレイアウト
│   └── page.tsx                  # メインUI
├── lib/
│   └── shopify.ts                # Shopify API ユーティリティ
├── .env.local.example            # 環境変数のサンプル
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## トラブルシューティング

### "No Next.js detected" エラー

**原因**: Vercelがプロジェクトを正しく検出できていません。

**解決策**:
- `package.json` が存在し、`next` が依存関係に含まれているか確認
- Vercelの「Root Directory」設定が `/` になっているか確認
- リポジトリのルートディレクトリに `next.config.js` が存在するか確認

### 401 Unauthorized / 403 Forbidden エラー

**原因**: Storefront API トークンが無効、または権限が不足しています。

**解決策**:
- Shopify 管理画面でトークンが正しいか確認
- Storefront API の権限を確認：
  - `unauthenticated_read_product_listings`
  - `unauthenticated_write_checkouts`
  - `unauthenticated_read_checkouts`
- 環境変数が正しく設定されているか確認（Vercel側とローカル両方）

### 商品が見えない / 追加できない

**原因**: 商品がHeadless販売チャネルに公開されていません。

**解決策**:
- Shopify 管理画面 → Products → 該当商品を選択
- 「Sales channels and apps」セクションで「Headless」チャネルを有効化
- 商品がアクティブ（Active）であることを確認

### Variant ID のフォーマットエラー

**原因**: Variant IDがGID形式ではありません。

**解決策**:
- Variant IDは `gid://shopify/ProductVariant/XXXXXXXX` の形式である必要があります
- 数値のIDだけでなく、必ずGID形式の文字列を使用してください
- 例: `9026783772894` ではなく `gid://shopify/ProductVariant/9026783772894`

### GraphQL エラー

**原因**: GraphQLクエリが失敗しています。

**解決策**:
- ブラウザの開発者ツール（Console）でエラーメッセージを確認
- `lib/shopify.ts` の `GRAPHQL_ENDPOINT` が正しいか確認
- Shopify の API バージョン（`2024-10`）が有効か確認

## セキュリティに関する注意

- **トークンをリポジトリにコミットしないでください**
- `.env.local` は `.gitignore` に含まれているため、Gitにコミットされません
- Vercelの環境変数機能を使用して、本番環境のトークンを安全に管理してください
- Storefront API トークンは公開されても問題ありませんが、Admin API トークンは絶対に公開しないでください

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Shopify Storefront API** (2024-10)
- **React 18**

## ライセンス

MIT

## 参考リンク

- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Vercel Deployment](https://vercel.com/docs)
