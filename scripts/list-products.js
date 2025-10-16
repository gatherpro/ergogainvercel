/**
 * Shopifyに登録されている商品の一覧を取得
 *
 * 使い方: node scripts/list-products.js
 */

// dotenvで.env.localを読み込み
require('dotenv').config({ path: '.env.local' });

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN;

if (!SHOPIFY_STORE_DOMAIN || !STOREFRONT_TOKEN) {
  console.error("環境変数が設定されていません");
  console.error("NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:", SHOPIFY_STORE_DOMAIN);
  console.error("NEXT_PUBLIC_STOREFRONT_TOKEN:", STOREFRONT_TOKEN ? "設定済み" : "未設定");
  process.exit(1);
}

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

const query = `
  query getProducts {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

async function listProducts() {
  console.log("Shopifyの商品一覧を取得中...\n");

  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const { data } = await response.json();

    if (!data || !data.products) {
      console.error("商品データの取得に失敗しました");
      return;
    }

    const products = data.products.edges;

    if (products.length === 0) {
      console.log("登録されている商品がありません。");
      console.log("\nShopify管理画面で商品を作成してください：");
      console.log(`https://${SHOPIFY_STORE_DOMAIN}/admin/products`);
      return;
    }

    console.log(`全 ${products.length} 件の商品が見つかりました：\n`);
    console.log("=".repeat(80));

    products.forEach(({ node: product }, index) => {
      console.log(`\n${index + 1}. ${product.title}`);
      console.log(`   Handle: ${product.handle}`);
      console.log(`   商品ID: ${product.id}`);
      console.log(`   価格: ¥${Number(product.priceRange.minVariantPrice.amount).toLocaleString()}`);
      console.log(`   説明: ${product.description ? product.description.substring(0, 50) + "..." : "なし"}`);

      console.log(`\n   バリアント (${product.variants.edges.length}件):`);
      product.variants.edges.forEach(({ node: variant }) => {
        console.log(`     - ${variant.title}`);
        console.log(`       ID: ${variant.id}`);
        console.log(`       価格: ¥${Number(variant.priceV2.amount).toLocaleString()}`);
        console.log(`       在庫: ${variant.availableForSale ? "あり" : "なし"}`);
      });

      console.log(`\n   アクセスURL: https://ergogain.co.jp/ergonomics/${product.handle}`);
      console.log("-".repeat(80));
    });

    console.log("\n\n📝 次のステップ:");
    console.log("1. 上記のhandleを使って、製品ページにアクセスできます");
    console.log("2. バリアントIDを使って、カートに商品を追加できます");
    console.log("3. 製品詳細ページを実際のShopifyデータで表示するように更新します");

  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

listProducts();
