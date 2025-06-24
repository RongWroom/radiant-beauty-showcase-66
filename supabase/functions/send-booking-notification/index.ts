
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

interface BookingData {
  customerName: string;
  customerEmail: string;
  treatmentName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentId: string;
  confirmationToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingData = await req.json();
    console.log('Processing booking notification for:', bookingData.customerEmail);
    console.log('Booking data:', {
      customerName: bookingData.customerName,
      treatmentName: bookingData.treatmentName,
      appointmentDate: bookingData.appointmentDate,
      appointmentTime: bookingData.appointmentTime
    });

    // Format date and time for display
    const formattedDate = new Date(bookingData.appointmentDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date(`2000-01-01T${bookingData.appointmentTime}`).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Use the live domain
    const appUrl = 'https://www.stwaestheticclinic.co.uk';
    const confirmUrl = `${appUrl}/confirm-appointment?token=${bookingData.confirmationToken}&action=confirm`;
    const cancelUrl = `${appUrl}/confirm-appointment?token=${bookingData.confirmationToken}&action=cancel`;

    // Send notification email to clinic
    const clinicEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: ["sharon@stwaestheticclinic.co.uk"],
      subject: `New Appointment Booking - ${bookingData.treatmentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8B5A97; padding-bottom: 10px;">
            📅 New Appointment Booking
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B5A97; margin-top: 0;">Booking Details</h3>
            <p><strong>Customer:</strong> ${bookingData.customerName}</p>
            <p><strong>Email:</strong> ${bookingData.customerEmail}</p>
            <p><strong>Treatment:</strong> ${bookingData.treatmentName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
          </div>

          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>⏰ Action Required:</strong> 
              <br>Please confirm or decline this appointment request within 24 hours.
            </p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmUrl}" 
               style="background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 0 10px; display: inline-block;">
              ✅ Confirm Appointment
            </a>
            <a href="${cancelUrl}" 
               style="background-color: #ef4444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 0 10px; display: inline-block;">
              ❌ Decline Appointment
            </a>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This appointment is currently <strong>pending</strong> and awaits your confirmation.
              The customer will be automatically notified of your decision.
            </p>
          </div>
        </div>
      `,
    });

    console.log('Clinic email response:', clinicEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: [bookingData.customerEmail],
      subject: `Appointment Request Received - ${bookingData.treatmentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8B5A97; padding-bottom: 10px;">
            📋 Appointment Request Received
          </h2>
          
          <p>Dear ${bookingData.customerName},</p>
          
          <p>Thank you for booking with STW Aesthetic Clinic! We have received your appointment request and it is currently being reviewed by our team.</p>

          <div style="background-color: #f0fdf4; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981; margin-top: 0;">Your Appointment Request</h3>
            <p><strong>Treatment:</strong> ${bookingData.treatmentName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Status:</strong> <span style="color: #f59e0b; font-weight: bold;">PENDING CONFIRMATION</span></p>
          </div>

          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>⏳ What happens next?</strong> 
              <br>Our team will review your request and confirm your appointment within 24 hours. You will receive another email with the confirmation details.
            </p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B5A97; margin-top: 0;">Preparation Checklist</h3>
            <p>While you wait for confirmation, here's what you can do to prepare:</p>
            <p>• Ensure you can arrive 15 minutes early</p>
            <p>• Bring valid ID</p>
            <p>• Come with a clean face (no makeup for facial treatments)</p>
            <p>• Complete any required consent forms</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>If you have any questions or need to make changes to your appointment, please don't hesitate to contact us.</p>
            <p><strong>STW Aesthetic Clinic Team</strong></p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              We look forward to providing you with exceptional care and service.
            </p>
          </div>
        </div>
      `,
    });

    console.log('Customer email response:', customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        clinicEmailSent: clinicEmailResponse.data ? true : false,
        customerEmailSent: customerEmailResponse.data ? true : false
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
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: `Failed to send booking notification: ${error.message}` }),
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
