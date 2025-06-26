
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

interface StatusNotificationData {
  appointmentId: string;
  customerName: string;
  customerEmail: string;
  treatmentName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'confirmed' | 'cancelled';
  adminNotes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: StatusNotificationData = await req.json();
    console.log('Processing status notification for:', data.customerEmail, 'Status:', data.status);

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

    let emailContent = '';
    let subject = '';

    if (data.status === 'confirmed') {
      subject = `Appointment Confirmed - ${cleanTreatmentName}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            ✅ Appointment Confirmed
          </h2>
          
          <p>Dear ${data.customerName},</p>
          
          <p>Great news! Your appointment has been <strong style="color: #10b981;">CONFIRMED</strong> by our team.</p>

          <div style="background-color: #f0fdf4; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981; margin-top: 0;">Confirmed Appointment Details</h3>
            <p><strong>Treatment:</strong> ${cleanTreatmentName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Location:</strong> The Treatment Rooms, 110 Front Street, Stanley</p>
            <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">CONFIRMED</span></p>
          </div>

          ${data.adminNotes ? `
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #8B5A97; margin-top: 0;">Special Instructions:</h4>
            <p style="margin: 0;">${data.adminNotes}</p>
          </div>
          ` : ''}

          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>📋 Important Reminders:</strong>
              <br>• Please arrive 15 minutes early
              <br>• Bring valid photo ID
              <br>• Complete your consent form if you haven't already
              <br>• Avoid sun exposure 48 hours before laser treatments
              <br>• Come with a clean face (no makeup for facial treatments)
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>If you need to make any changes to your appointment, please contact us at <strong>01207 239983</strong> as soon as possible.</p>
            <p><strong>STW Aesthetic Clinic Team</strong></p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              We look forward to seeing you soon!
            </p>
          </div>
        </div>
      `;
    } else if (data.status === 'cancelled') {
      subject = `Appointment Update - ${cleanTreatmentName}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
            ❌ Appointment Update
          </h2>
          
          <p>Dear ${data.customerName},</p>
          
          <p>We regret to inform you that your appointment request could not be accommodated at the requested time.</p>

          <div style="background-color: #fef2f2; border: 1px solid #ef4444; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Appointment Details</h3>
            <p><strong>Treatment:</strong> ${cleanTreatmentName}</p>
            <p><strong>Requested Date:</strong> ${formattedDate}</p>
            <p><strong>Requested Time:</strong> ${formattedTime}</p>
            <p><strong>Status:</strong> <span style="color: #dc2626; font-weight: bold;">UNAVAILABLE</span></p>
          </div>

          ${data.adminNotes ? `
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #8B5A97; margin-top: 0;">Message from our team:</h4>
            <p style="margin: 0;">${data.adminNotes}</p>
          </div>
          ` : ''}

          <div style="background-color: #dbeafe; border: 1px solid #3b82f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>💡 Next Steps:</strong>
              <br>We'd love to help you find an alternative time that works for you. Please call us at <strong>01207 239983</strong> or visit our website to book a new appointment.
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>We apologize for any inconvenience and appreciate your understanding.</p>
            <p><strong>STW Aesthetic Clinic Team</strong></p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Thank you for choosing STW Aesthetic Clinic.
            </p>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: [data.customerEmail],
      subject: subject,
      html: emailContent,
    });

    console.log('Status notification email response:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailSent: emailResponse.data ? true : false,
        status: data.status
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
    console.error("Error in send-appointment-status-notification function:", error);
    return new Response(
      JSON.stringify({ error: `Failed to send status notification: ${error.message}` }),
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
