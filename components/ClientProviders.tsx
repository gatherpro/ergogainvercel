"use client";

import { CartProvider } from "../contexts/CartContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
