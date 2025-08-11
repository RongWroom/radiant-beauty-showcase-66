
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, couponCode } = await req.json();
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Cart items are required");
    }

    console.log(`Creating checkout for ${items.length} items`, couponCode ? `with coupon: ${couponCode}` : '');

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Convert cart items to Stripe line items
    const lineItems = items.map((item: any) => {
      const unitAmount = Math.round((item.price || 0) * 100); // Convert to cents
      
      return {
        price_data: {
          currency: (item.currency || 'GBP').toLowerCase(),
          product_data: {
            name: item.name,
            images: item.image_url ? [item.image_url] : undefined,
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    console.log(`Creating checkout session with ${lineItems.length} line items`);

    // Create checkout session configuration
    const sessionConfig: any = {
      line_items: lineItems,
      mode: "payment",
      allow_promotion_codes: true, // Enable promotion code input
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/products`,
    };

    // Add coupon if provided
    if (couponCode) {
      console.log(`Applying coupon code: ${couponCode}`);
      sessionConfig.discounts = [{
        coupon: couponCode
      }];
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log(`Created checkout session: ${session.id}`);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
