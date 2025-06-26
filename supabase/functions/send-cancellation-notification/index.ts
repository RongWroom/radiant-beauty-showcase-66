
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CancellationNotificationData {
  appointmentId: string;
  customerName: string;
  customerEmail: string;
  treatmentName: string;
  appointmentDate: string;
  appointmentTime: string;
  cancelledBy: 'customer' | 'admin';
  reason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: CancellationNotificationData = await req.json();
    console.log('Processing cancellation notification for:', data.customerEmail);

    // Clean treatment name
    const cleanTreatmentName = data.treatmentName?.replace(/\n/g, ' ').trim() || 'Treatment';

    // Format date and time
    const formattedDate = new Date(data.appointmentDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date(`2000-01-01T${data.appointmentTime}`).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Send notification to customer
    const customerEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: [data.customerEmail],
      subject: `Appointment Cancelled - ${cleanTreatmentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
            ❌ Appointment Cancelled
          </h2>
          
          <p>Dear ${data.customerName},</p>
          
          <p>We're writing to confirm that your appointment has been <strong style="color: #dc2626;">cancelled</strong>.</p>

          <div style="background-color: #fef2f2; border: 1px solid #ef4444; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Cancelled Appointment Details</h3>
            <p><strong>Treatment:</strong> ${cleanTreatmentName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Status:</strong> <span style="color: #dc2626; font-weight: bold;">CANCELLED</span></p>
          </div>

          ${data.reason ? `
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #8B5A97; margin-top: 0;">Cancellation Details:</h4>
            <p style="margin: 0;">${data.reason}</p>
          </div>
          ` : ''}

          <div style="background-color: #dbeafe; border: 1px solid #3b82f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>💡 Book Again:</strong>
              <br>We'd love to see you again! Please call us at <strong>01207 239983</strong> or visit our website to book a new appointment when you're ready.
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Thank you for your understanding. If you have any questions, please don't hesitate to contact us.</p>
            <p><strong>STW Aesthetic Clinic Team</strong></p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              We hope to see you again soon!
            </p>
          </div>
        </div>
      `,
    });

    // Send notification to clinic (only if cancelled by customer)
    let clinicEmailResponse = null;
    if (data.cancelledBy === 'customer') {
      clinicEmailResponse = await resend.emails.send({
        from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
        to: ["sharon@stwaestheticclinic.co.uk"],
        subject: `Customer Cancelled Appointment - ${cleanTreatmentName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
              ❌ Customer Cancelled Appointment
            </h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #8B5A97; margin-top: 0;">Cancellation Details</h3>
              <p><strong>Customer:</strong> ${data.customerName}</p>
              <p><strong>Email:</strong> ${data.customerEmail}</p>
              <p><strong>Treatment:</strong> ${cleanTreatmentName}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${formattedTime}</p>
              <p><strong>Cancelled by:</strong> Customer</p>
            </div>

            <div style="background-color: #dbeafe; border: 1px solid #3b82f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #1e40af;">
                <strong>📅 Time Slot Available:</strong>
                <br>This appointment slot is now available for booking by other customers.
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 14px;">
                The customer has been automatically notified of the cancellation.
              </p>
            </div>
          </div>
        `,
      });
    }

    console.log('Cancellation notification emails sent:', {
      customer: customerEmailResponse.data ? true : false,
      clinic: clinicEmailResponse?.data ? true : false
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmailSent: customerEmailResponse.data ? true : false,
        clinicEmailSent: clinicEmailResponse?.data ? true : false
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in send-cancellation-notification function:", error);
    return new Response(
      JSON.stringify({ error: `Failed to send cancellation notification: ${error.message}` }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
