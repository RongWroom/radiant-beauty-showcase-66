
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

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
    const { productId, quantity = 1 } = await req.json();
    
    if (!productId) {
      throw new Error("Product ID is required");
    }

    console.log(`Creating payment for product ${productId} with quantity ${quantity}`);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client to fetch product details
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    let user = null;
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData } = await supabase.auth.getUser(token);
        user = userData.user;
      } catch (error) {
        console.log("No authenticated user, proceeding as guest");
      }
    }

    // Fetch product details from database
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error || !product) {
      throw new Error(`Product not found: ${error?.message}`);
    }

    console.log(`Found product: ${product.name}, price: ${product.price} ${product.currency}`);

    // Convert price to cents for Stripe (assuming price is in major currency units)
    const unitAmount = Math.round((product.price || 0) * 100);
    const totalAmount = unitAmount * quantity;
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: (product.currency || 'GBP').toLowerCase(),
            product_data: {
              name: product.name,
              description: product.description || undefined,
              images: product.image_url ? [product.image_url] : undefined,
            },
            unit_amount: unitAmount,
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/products/${productId}`,
      customer_email: user?.email || undefined,
    });

    console.log(`Created checkout session: ${session.id}`);

    // Save order to database using service role key
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    const orderData = {
      order_number: orderNumber,
      user_id: user?.id || null,
      total_amount: totalAmount / 100, // Convert back to major currency units
      currency: product.currency || 'GBP',
      status: 'pending',
      items: [{
        product_id: productId,
        product_name: product.name,
        quantity: quantity,
        unit_price: product.price,
        total_price: (product.price || 0) * quantity
      }],
      stripe_session_id: session.id,
    };

    const { error: orderError } = await supabaseService
      .from('orders')
      .insert(orderData);

    if (orderError) {
      console.error('Error saving order:', orderError);
      // Continue with payment creation even if order save fails
    } else {
      console.log(`Order saved: ${orderNumber}`);
    }

    // Send confirmation email if user has email
    if (user?.email) {
      try {
        const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
        
        await resend.emails.send({
          from: "STW Aesthetic Clinic <no-reply@stwaestheticclinic.co.uk>",
          to: [user.email],
          subject: "Order Confirmation - STW Aesthetic Clinic",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #2563eb; text-align: center;">Order Confirmation</h1>
              
              <p>Dear ${user.user_metadata?.first_name || 'Customer'},</p>
              
              <p>Thank you for your order! We've received your payment and are processing your order.</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="margin-top: 0;">Order Details</h2>
                <p><strong>Order Number:</strong> ${orderNumber}</p>
                <p><strong>Product:</strong> ${product.name}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <p><strong>Total:</strong> ${product.currency === 'GBP' ? '£' : product.currency === 'USD' ? '$' : '€'}${((product.price || 0) * quantity).toFixed(2)}</p>
              </div>
              
              <p>We'll be in touch soon with updates about your order.</p>
              
              <p>If you have any questions, please don't hesitate to contact us:</p>
              <p>
                <strong>STW Aesthetic Clinic</strong><br>
                The Treatment Rooms, 110 Front Street<br>
                Stanley, County Durham, DH9 0TY<br>
                Tel: +44 (0)1207 239 983<br>
                Email: sharon@stwaestheticclinic.co.uk
              </p>
              
              <p>Best regards,<br>The STW Aesthetic Clinic Team</p>
            </div>
          `,
        });
        
        console.log(`Confirmation email sent to: ${user.email}`);
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Continue with payment creation even if email fails
      }
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
