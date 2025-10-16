"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cart } from "../lib/shopify";
import { createCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCartLine as apiUpdateCartLine, getCart } from "../lib/cart";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = "shopify_cart_id";

/**
 * localStorageにカートIDを保存
 */
function saveCartId(cartId: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_ID_KEY, cartId);
  }
}

/**
 * localStorageからカートIDを取得
 */
function getCartId(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(CART_ID_KEY);
  }
  return null;
}

/**
 * CartProvider
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  // カートの初期化
  useEffect(() => {
    const initializeCart = async () => {
      const cartId = getCartId();

      if (cartId) {
        // 既存のカートを読み込み
        const existingCart = await getCart(cartId);
        if (existingCart) {
          setCart(existingCart);
        } else {
          // カートが見つからない場合は新規作成
          const newCart = await createCart();
          if (newCart) {
            setCart(newCart);
            saveCartId(newCart.id);
          }
        }
      } else {
        // 新しいカートを作成
        const newCart = await createCart();
        if (newCart) {
          setCart(newCart);
          saveCartId(newCart.id);
        }
      }

      setLoading(false);
    };

    initializeCart();
  }, []);

  /**
   * カートに商品を追加
   */
  const addItem = async (merchandiseId: string, quantity: number = 1) => {
    let currentCart = cart;

    // カートが存在しない場合は作成
    if (!currentCart) {
      const newCart = await createCart();
      if (newCart) {
        currentCart = newCart;
        setCart(newCart);
        saveCartId(newCart.id);
      } else {
        console.error("Failed to create cart");
        return;
      }
    }

    // 商品を追加
    const updatedCart = await apiAddToCart(currentCart.id, merchandiseId, quantity);
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  /**
   * カートから商品を削除
   */
  const removeItem = async (lineId: string) => {
    if (!cart) return;

    const updatedCart = await apiRemoveFromCart(cart.id, [lineId]);
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  /**
   * 商品の数量を更新
   */
  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;

    if (quantity === 0) {
      // 数量が0の場合は削除
      await removeItem(lineId);
    } else {
      const updatedCart = await apiUpdateCartLine(cart.id, lineId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
      }
    }
  };

  /**
   * カート内の商品数を計算
   */
  const itemCount = cart?.lines.edges.reduce((total, edge) => total + edge.node.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, addItem, removeItem, updateQuantity, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * useCart Hook
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
