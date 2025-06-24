
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, service, message }: ContactFormRequest = await req.json();

    console.log("Processing contact form submission for:", email);
    console.log("Form data:", { firstName, lastName, phone, service });

    // Send confirmation email to customer using your verified domain
    const customerEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: [email],
      subject: "Thank you for contacting STW Aesthetic Clinic",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4a5568; margin-bottom: 10px;">STW Aesthetic Clinic</h1>
            <div style="height: 2px; width: 60px; background: linear-gradient(to right, #667eea, #c3c3c3); margin: 0 auto;"></div>
          </div>
          
          <h2 style="color: #4a5568; margin-bottom: 20px;">Thank you for your inquiry, ${firstName}!</h2>
          
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 15px;">
            We have received your message and truly appreciate you taking the time to contact us about our skincare services.
          </p>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4a5568; margin-top: 0;">Your submission details:</h3>
            <p style="margin: 5px 0;"><strong>Service of Interest:</strong> ${service}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 15px;">
            Our expert team will review your inquiry and respond within 24 hours. We're excited to help you on your journey to beautiful, healthy skin.
          </p>
          
          <div style="background-color: #667eea; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; text-align: center;">
              <strong>Questions?</strong> Call us at 01207 239983 or visit us at The Treatment Rooms, 110 Front Street, Stanley
            </p>
          </div>
          
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
            Best regards,<br>
            <strong>The STW Aesthetic Clinic Team</strong>
          </p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #a0aec0; font-size: 12px;">
              STW Aesthetic Clinic | The Treatment Rooms, 110 Front Street, Stanley | 01207 239983
            </p>
          </div>
        </div>
      `,
    });

    console.log("Customer email response:", customerEmailResponse);

    // Send notification email to clinic using your verified domain
    const clinicEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: ["sharon@stwaestheticclinic.co.uk"],
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4a5568;">New Contact Form Submission</h2>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4a5568; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service of Interest:</strong> ${service}</p>
          </div>
          
          <div style="background-color: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
            <h3 style="color: #4a5568; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    console.log("Clinic email response:", clinicEmailResponse);

    // Check for errors in either email
    if (customerEmailResponse.error) {
      console.error("Customer email error:", customerEmailResponse.error);
    }
    
    if (clinicEmailResponse.error) {
      console.error("Clinic email error:", clinicEmailResponse.error);
    }

    // If both emails have errors, return error response
    if (customerEmailResponse.error && clinicEmailResponse.error) {
      return new Response(JSON.stringify({ 
        error: "Failed to send emails",
        customerError: customerEmailResponse.error,
        clinicError: clinicEmailResponse.error
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      customerEmailId: customerEmailResponse.data?.id,
      clinicEmailId: clinicEmailResponse.data?.id,
      customerEmailError: customerEmailResponse.error || null,
      clinicEmailError: clinicEmailResponse.error || null
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
