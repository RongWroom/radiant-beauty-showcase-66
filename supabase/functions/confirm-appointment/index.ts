
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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const action = url.searchParams.get('action');

    if (!token || !action) {
      return new Response(
        `<html><body><h1>Invalid Request</h1><p>Missing required parameters.</p></body></html>`,
        { status: 400, headers: { 'Content-Type': 'text/html', ...corsHeaders } }
      );
    }

    // Find appointment by confirmation token
    const { data: appointment, error: fetchError } = await supabase
      .from('appointments')
      .select(`
        *,
        treatments (
          name,
          duration_minutes,
          price
        )
      `)
      .eq('confirmation_token', token)
      .single();

    if (fetchError || !appointment) {
      console.error('Appointment not found:', fetchError);
      return new Response(
        `<html><body><h1>Appointment Not Found</h1><p>The appointment link may be expired or invalid.</p></body></html>`,
        { status: 404, headers: { 'Content-Type': 'text/html', ...corsHeaders } }
      );
    }

    const newStatus = action === 'confirm' ? 'confirmed' : 'cancelled';
    const now = new Date().toISOString();

    // Update appointment status
    const { error: updateError } = await supabase
      .from('appointments')
      .update({
        status: newStatus,
        confirmed_by_admin_at: action === 'confirm' ? now : null,
        updated_at: now
      })
      .eq('id', appointment.id);

    if (updateError) {
      console.error('Error updating appointment:', updateError);
      return new Response(
        `<html><body><h1>Error</h1><p>Failed to update appointment status.</p></body></html>`,
        { status: 500, headers: { 'Content-Type': 'text/html', ...corsHeaders } }
      );
    }

    // Get customer profile for notification
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name, email')
      .eq('id', appointment.user_id)
      .single();

    const customerName = profile 
      ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() 
      : 'Valued Customer';

    const customerEmail = profile?.email;

    // Format date and time for display
    const formattedDate = new Date(appointment.appointment_date).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date(`2000-01-01T${appointment.appointment_time}`).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Send confirmation email to customer if confirmed
    if (action === 'confirm' && customerEmail) {
      try {
        await resend.emails.send({
          from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
          to: [customerEmail],
          subject: `Appointment Confirmed - ${appointment.treatments?.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                ✅ Appointment Confirmed!
              </h2>
              
              <p>Dear ${customerName},</p>
              
              <p>Great news! Your appointment has been confirmed by our clinic staff.</p>

              <div style="background-color: #f0fdf4; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #10b981; margin-top: 0;">Confirmed Appointment Details</h3>
                <p><strong>Treatment:</strong> ${appointment.treatments?.name}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${formattedTime}</p>
                <p><strong>Duration:</strong> ${appointment.treatments?.duration_minutes} minutes</p>
                <p><strong>Price:</strong> £${appointment.treatments?.price}</p>
              </div>

              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #856404;">
                  <strong>📋 Important Reminder:</strong> 
                  <br>Don't forget to complete your consent form before your appointment if you haven't already done so.
                </p>
              </div>

              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #8B5A97; margin-top: 0;">Preparation Checklist</h3>
                <p>• Arrive 15 minutes early</p>
                <p>• Bring valid ID</p>
                <p>• Come with a clean face (no makeup for facial treatments)</p>
                <p>• Complete consent form if not done already</p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p>We look forward to seeing you soon!</p>
                <p><strong>STW Aesthetic Clinic Team</strong></p>
                <p style="color: #666; font-size: 14px; margin-top: 20px;">
                  If you have any questions, please don't hesitate to contact us.
                </p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }
    }

    // Return success page
    const actionText = action === 'confirm' ? 'confirmed' : 'declined';
    const statusColor = action === 'confirm' ? '#10b981' : '#ef4444';
    const statusIcon = action === 'confirm' ? '✅' : '❌';

    return new Response(
      `<html>
        <head>
          <title>Appointment ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background-color: #f8f9fa; }
            .card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
            .status { color: ${statusColor}; font-size: 48px; margin-bottom: 20px; }
            h1 { color: #333; margin-bottom: 20px; }
            .details { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: left; }
            .button { display: inline-block; background-color: #8B5A97; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="status">${statusIcon}</div>
            <h1>Appointment ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}</h1>
            
            <div class="details">
              <h3>Appointment Details</h3>
              <p><strong>Customer:</strong> ${customerName}</p>
              <p><strong>Treatment:</strong> ${appointment.treatments?.name}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${formattedTime}</p>
              <p><strong>Status:</strong> ${newStatus.toUpperCase()}</p>
            </div>
            
            ${action === 'confirm' ? 
              '<p>The customer has been notified of the confirmation via email.</p>' : 
              '<p>The appointment has been declined and the customer will be notified.</p>'
            }
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              You can close this window now.
            </p>
          </div>
        </body>
      </html>`,
      { 
        status: 200,
        headers: { 
          'Content-Type': 'text/html',
          ...corsHeaders 
        } 
      }
    );

  } catch (error: any) {
    console.error("Error in confirm-appointment function:", error);
    return new Response(
      `<html><body><h1>Error</h1><p>An unexpected error occurred: ${error.message}</p></body></html>`,
      { 
        status: 500,
        headers: { 
          'Content-Type': 'text/html',
          ...corsHeaders 
        } 
      }
    );
  }
};

serve(handler);
