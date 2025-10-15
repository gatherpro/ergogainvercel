# Ergogain（仮）公式サイト

人間工学に基づいた製品を提供するErgogainの公式Webサイトです。

## 機能

- オーダーメイド製品（フルオーダー・セミオーダー）
- 既製品一覧とダイナミックルーティング
- 会社情報、サポートページ、お知らせ
- **マイアカウント（Shopify連携）** - ホスト型カスタマーアカウントへの誘導

## 環境変数の設定

マイアカウント機能を使用するには、以下の環境変数が必要です。

### Shopifyストアのドメイン設定

このプロジェクトでは、以下のドメイン構成を使用しています：

- **Next.jsサイト**: `ergogain.co.jp`
- **Shopifyストア**: `shop.ergogain.co.jp`

#### Shopifyでのドメイン設定手順

1. DNSレコードを追加（ドメイン管理画面）
   - タイプ: CNAME
   - ホスト名: `shop`
   - 値: `shops.myshopify.com`

2. Shopify管理画面で設定
   - Settings → Domains
   - 「Connect existing domain」をクリック
   - `shop.ergogain.co.jp` を入力して接続

### ローカル開発環境

プロジェクトのルートディレクトリに `.env.local` ファイルを作成してください。

```bash
# .env.local
NEXT_PUBLIC_SHOPIFY_DOMAIN=shop.ergogain.co.jp
```

`.env.example` ファイルを参考にしてください。

### Vercelでの設定

1. Vercelのプロジェクトダッシュボードを開く
2. 「Settings」→「Environment Variables」を選択
3. 以下の変数を追加：
   - **Key**: `NEXT_PUBLIC_SHOPIFY_DOMAIN`
   - **Value**: `shop.ergogain.co.jp`
   - **Environments**: Production, Preview, Development すべてチェック
4. 「Save」をクリック
5. 再デプロイして変更を反映

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
| `/account` | マイアカウント（Shopify連携） |
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
│   ├── news/
│   │   └── page.tsx                  # お知らせ
│   └── account/
│       └── page.tsx                  # マイアカウント（Shopify連携）
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

## Shopify連携について

### 実装済み機能

- **マイアカウント**: Shopifyのホスト型カスタマーアカウント（新アカウント推奨）への誘導
  - ログイン・新規登録
  - 注文履歴の確認
  - 配送先情報の管理
  - パスワード再設定案内

### 将来の拡張予定

以下の機能を追加予定：

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
- 環境変数は `.env.local` で管理（詳細は上記の「環境変数の設定」を参照）

## ライセンス

MIT

## サポート

ご質問やフィードバックは、GitHubのIssuesまでお願いします。
