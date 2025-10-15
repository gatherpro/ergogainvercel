import { NextResponse } from "next/server";
import { createCart } from "@/lib/shopify";

export async function POST() {
  try {
    const cart = await createCart();
    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error("Cart creation error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
