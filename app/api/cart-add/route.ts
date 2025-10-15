import { NextRequest, NextResponse } from "next/server";
import { addLineToCart } from "@/lib/shopify";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, variantId, quantity = 1 } = body;

    if (!cartId || !variantId) {
      return NextResponse.json(
        { success: false, error: "cartId and variantId are required" },
        { status: 400 }
      );
    }

    const cart = await addLineToCart(cartId, variantId, quantity);
    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
