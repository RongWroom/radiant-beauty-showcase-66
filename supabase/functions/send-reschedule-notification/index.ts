
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

interface RescheduleNotificationData {
  appointmentId: string;
  customerName: string;
  customerEmail: string;
  treatmentName: string;
  oldAppointmentDate: string;
  oldAppointmentTime: string;
  newAppointmentDate: string;
  newAppointmentTime: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: RescheduleNotificationData = await req.json();
    console.log('Processing reschedule notification for:', data.customerEmail);

    // Clean treatment name
    const cleanTreatmentName = data.treatmentName?.replace(/\n/g, ' ').trim() || 'Treatment';

    // Format dates and times
    const oldFormattedDate = new Date(data.oldAppointmentDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const oldFormattedTime = new Date(`2000-01-01T${data.oldAppointmentTime}`).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const newFormattedDate = new Date(data.newAppointmentDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const newFormattedTime = new Date(`2000-01-01T${data.newAppointmentTime}`).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Send notification to customer
    const customerEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: [data.customerEmail],
      subject: `Appointment Rescheduled - ${cleanTreatmentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            📅 Appointment Rescheduled
          </h2>
          
          <p>Dear ${data.customerName},</p>
          
          <p>Your appointment has been successfully <strong style="color: #3b82f6;">rescheduled</strong>. Please note the new date and time below.</p>

          <div style="background-color: #fef2f2; border: 1px solid #ef4444; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #dc2626; margin-top: 0; text-decoration: line-through;">Previous Appointment (Cancelled)</h4>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${oldFormattedDate}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${oldFormattedTime}</p>
          </div>

          <div style="background-color: #f0fdf4; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981; margin-top: 0;">✅ New Appointment Details</h3>
            <p><strong>Treatment:</strong> ${cleanTreatmentName}</p>
            <p><strong>Date:</strong> ${newFormattedDate}</p>
            <p><strong>Time:</strong> ${newFormattedTime}</p>
            <p><strong>Location:</strong> The Treatment Rooms, 110 Front Street, Stanley</p>
            <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">CONFIRMED</span></p>
          </div>

          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>📋 Important Reminders:</strong>
              <br>• Please arrive 15 minutes early
              <br>• Bring valid photo ID
              <br>• Ensure you've completed your consent form
              <br>• Avoid sun exposure 48 hours before laser treatments
              <br>• Come with a clean face (no makeup for facial treatments)
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>If you need to make any further changes, please contact us at <strong>01207 239983</strong> as soon as possible.</p>
            <p><strong>STW Aesthetic Clinic Team</strong></p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              We look forward to seeing you at your new appointment time!
            </p>
          </div>
        </div>
      `,
    });

    // Send notification to clinic
    const clinicEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: ["sharon@stwaestheticclinic.co.uk"],
      subject: `Appointment Rescheduled - ${cleanTreatmentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            📅 Customer Rescheduled Appointment
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B5A97; margin-top: 0;">Customer Details</h3>
            <p><strong>Customer:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> ${data.customerEmail}</p>
            <p><strong>Treatment:</strong> ${cleanTreatmentName}</p>
          </div>

          <div style="background-color: #fef2f2; border: 1px solid #ef4444; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #dc2626; margin-top: 0;">Previous Time (Cancelled)</h4>
            <p><strong>Date:</strong> ${oldFormattedDate}</p>
            <p><strong>Time:</strong> ${oldFormattedTime}</p>
          </div>

          <div style="background-color: #f0fdf4; border: 1px solid #10b981; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #10b981; margin-top: 0;">New Appointment Time</h4>
            <p><strong>Date:</strong> ${newFormattedDate}</p>
            <p><strong>Time:</strong> ${newFormattedTime}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              The customer has been automatically notified of the schedule change.
            </p>
          </div>
        </div>
      `,
    });

    console.log('Reschedule notification emails sent:', {
      customer: customerEmailResponse.data ? true : false,
      clinic: clinicEmailResponse.data ? true : false
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmailSent: customerEmailResponse.data ? true : false,
        clinicEmailSent: clinicEmailResponse.data ? true : false
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
    console.error("Error in send-reschedule-notification function:", error);
    return new Response(
      JSON.stringify({ error: `Failed to send reschedule notification: ${error.message}` }),
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
