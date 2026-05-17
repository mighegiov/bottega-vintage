import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2025-04-30.basil" });
const prezzi: Record<string, string> = { pro: process.env.STRIPE_PRICE_PRO || "", base: process.env.STRIPE_PRICE_ARTIGIANO_BASE || "", standard: process.env.STRIPE_PRICE_ARTIGIANO_STANDARD || "", premium: process.env.STRIPE_PRICE_ARTIGIANO_PREMIUM || "" };
export async function POST(req: NextRequest) {
  try {
    const { tipo } = await req.json();
    const priceId = prezzi[tipo];
    if (!priceId) return NextResponse.json({ error: "Piano non valido" }, { status: 400 });
    const session = await stripe.checkout.sessions.create({ mode: "subscription", line_items: [{ price: priceId, quantity: 1 }], success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/successo`, cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/prezzi` });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Errore Stripe:", error);
    return NextResponse.json({ error: "Errore checkout" }, { status: 500 });
  }
}
