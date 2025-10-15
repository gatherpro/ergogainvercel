# Ergogain（仮）公式サイト

人間工学に基づいた製品を提供するErgogainの公式Webサイトです。

## 機能

- オーダーメイド製品（フルオーダー・セミオーダー）
- 既製品一覧とダイナミックルーティング
- 会社情報、サポートページ、お知らせ

## ローカル開発

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセスしてください。

### 3. ビルド

```bash
npm run build
npm start
```

## Vercelでのデプロイ手順

### 1. GitHubにプッシュ

```bash
git add .
git commit -m "Update site structure"
git push origin main
```

### 2. Vercelでデプロイ

1. [Vercel](https://vercel.com) にログイン
2. 「Add New...」→「Project」をクリック
3. GitHubリポジトリを選択
4. プロジェクト設定：
   - **Framework Preset**: Next.js（自動検出）
   - **Root Directory**: `/`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. 「Deploy」をクリック

デプロイが完了すると、URLが発行されます。

## ルート一覧

| パス | 説明 |
|------|------|
| `/` | ホーム |
| `/ergogain` | オーダーメイド製品の入口 |
| `/ergogain/full` | フルオーダー |
| `/ergogain/semi` | セミオーダー |
| `/ergonomics` | 既製品一覧 |
| `/ergonomics/[handle]` | 既製品の詳細（ダイナミックルート） |
| `/about` | 会社情報 |
| `/support` | サポート |
| `/support/faq` | よくある質問 |
| `/support/contact` | お問い合わせ |
| `/support/warranty` | 保証について |
| `/news` | お知らせ |
| `/not-found` | 404エラーページ |

## ディレクトリ構成

```
ergogainvercel/
├── app/
│   ├── layout.tsx                    # 共通レイアウト
│   ├── page.tsx                      # ホーム
│   ├── not-found.tsx                 # 404ページ
│   ├── ergogain/
│   │   ├── page.tsx                  # Ergogain入口
│   │   ├── full/page.tsx             # フルオーダー
│   │   └── semi/page.tsx             # セミオーダー
│   ├── ergonomics/
│   │   ├── page.tsx                  # 既製品一覧
│   │   └── [handle]/page.tsx        # 既製品詳細
│   ├── about/
│   │   └── page.tsx                  # 会社情報
│   ├── support/
│   │   ├── page.tsx                  # サポート
│   │   ├── faq/page.tsx              # FAQ
│   │   ├── contact/page.tsx          # お問い合わせ
│   │   └── warranty/page.tsx         # 保証
│   └── news/
│       └── page.tsx                  # お知らせ
├── components/
│   ├── Nav.tsx                       # ヘッダーナビゲーション
│   └── Footer.tsx                    # フッター
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **React 18**

## 将来の拡張予定

### Shopify Storefront API 連携

現在はスタティックなページのみですが、将来的に以下の機能を追加予定：

- Shopify Storefront APIとの連携
- 製品データの動的取得
- カート機能
- チェックアウト機能

### API Routes / BFF

`/app/api` ディレクトリ配下に、以下のようなAPI Routesを追加可能：

- `/app/api/products/route.ts` - 製品一覧取得
- `/app/api/cart/route.ts` - カート操作
- `/app/api/orders/route.ts` - 注文処理

### データベース連携

- お問い合わせフォームのデータ保存
- ユーザー認証機能
- 注文履歴管理

## 開発メモ

- 現在はインラインスタイルを使用していますが、将来的にTailwind CSSやCSS Modulesへの移行を検討
- 既製品のダミーデータは `app/ergonomics/page.tsx` で定義
- 環境変数が必要になった場合は `.env.local` を作成

## ライセンス

MIT

## サポート

ご質問やフィードバックは、GitHubのIssuesまでお願いします。
