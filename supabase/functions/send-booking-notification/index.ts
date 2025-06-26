
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
  notes?: string;
  treatmentPrice?: number;
  treatmentDuration?: number;
  treatmentCategory?: string;
}

// Consent form mapping
const CONSENT_FORM_MAPPING: Record<string, string> = {
  'facial': 'https://docs.google.com/forms/d/1-wvSmxXx2PSOX7_LuYWfoVkOKMwy6KOJhO69_HsGilU/edit',
  'skin': 'https://docs.google.com/forms/d/1-wvSmxXx2PSOX7_LuYWfoVkOKMwy6KOJhO69_HsGilU/edit',
  'chemical peel': 'https://docs.google.com/forms/d/1-wvSmxXx2PSOX7_LuYWfoVkOKMwy6KOJhO69_HsGilU/edit',
  'microneedling': 'https://docs.google.com/forms/d/1-wvSmxXx2PSOX7_LuYWfoVkOKMwy6KOJhO69_HsGilU/edit',
  'laser hair removal': 'https://docs.google.com/forms/d/156975FgE83Ej2Q6NSAohg5kiKC5Ze64HC1fBeyOgYVY/edit',
  'laser': 'https://docs.google.com/forms/d/156975FgE83Ej2Q6NSAohg5kiKC5Ze64HC1fBeyOgYVY/edit',
  'cryolipolysis': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  'fat freezing': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  'fat freeze': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  'cryo': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  'hifu': 'https://docs.google.com/forms/d/1_eQ0FE_9hf2fssq46O0QCJvvuieeHMCT02aHfeGygME/edit',
  'ultrasound': 'https://docs.google.com/forms/d/1_eQ0FE_9hf2fssq46O0QCJvvuieeHMCT02aHfeGygME/edit',
  'ultra 4d hifu': 'https://docs.google.com/forms/d/1_eQ0FE_9hf2fssq46O0QCJvvuieeHMCT02aHfeGygME/edit',
};

function getConsentFormUrl(treatmentName: string, treatmentCategory?: string): string | null {
  const searchTerms = [
    treatmentName.toLowerCase(),
    treatmentCategory?.toLowerCase() || ''
  ];

  // Check for exact matches first
  for (const term of searchTerms) {
    if (CONSENT_FORM_MAPPING[term]) {
      return CONSENT_FORM_MAPPING[term];
    }
  }

  // Check for partial matches
  for (const [key, url] of Object.entries(CONSENT_FORM_MAPPING)) {
    for (const term of searchTerms) {
      if (term.includes(key) || key.includes(term)) {
        return url;
      }
    }
  }

  // Default to skin treatment form
  return CONSENT_FORM_MAPPING['skin'];
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

    // Clean treatment name to remove newlines that cause email errors
    const cleanTreatmentName = bookingData.treatmentName?.replace(/\n/g, ' ').trim() || 'Treatment';

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

    // Get consent form URL
    const consentFormUrl = getConsentFormUrl(cleanTreatmentName, bookingData.treatmentCategory);

    // Use the live domain
    const appUrl = 'https://www.stwaestheticclinic.co.uk';
    const confirmUrl = `${appUrl}/confirm-appointment?token=${bookingData.confirmationToken}&action=confirm`;
    const cancelUrl = `${appUrl}/confirm-appointment?token=${bookingData.confirmationToken}&action=cancel`;

    // Send notification email to clinic
    const clinicEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: ["sharon@stwaestheticclinic.co.uk"],
      subject: `New Appointment Booking - ${cleanTreatmentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8B5A97; padding-bottom: 10px;">
            📅 New Appointment Booking
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B5A97; margin-top: 0;">Booking Details</h3>
            <p><strong>Customer:</strong> ${bookingData.customerName}</p>
            <p><strong>Email:</strong> ${bookingData.customerEmail}</p>
            <p><strong>Treatment:</strong> ${cleanTreatmentName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            ${bookingData.treatmentPrice ? `<p><strong>Price:</strong> £${bookingData.treatmentPrice}</p>` : ''}
            ${bookingData.treatmentDuration ? `<p><strong>Duration:</strong> ${bookingData.treatmentDuration} minutes</p>` : ''}
            ${bookingData.notes ? `<p><strong>Notes:</strong> ${bookingData.notes}</p>` : ''}
          </div>

          ${consentFormUrl ? `
          <div style="background-color: #e8f4fd; border: 1px solid #3b82f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>📋 Consent Form Required:</strong> 
              <br><a href="${consentFormUrl}" style="color: #3b82f6; text-decoration: underline;">View Treatment Consent Form</a>
            </p>
          </div>
          ` : ''}

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
      subject: `Appointment Request Received - ${cleanTreatmentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8B5A97; padding-bottom: 10px;">
            📋 Appointment Request Received
          </h2>
          
          <p>Dear ${bookingData.customerName},</p>
          
          <p>Thank you for booking with STW Aesthetic Clinic! We have received your appointment request and it is currently being reviewed by our team.</p>

          <div style="background-color: #f0fdf4; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #10b981; margin-top: 0;">Your Appointment Request</h3>
            <p><strong>Treatment:</strong> ${cleanTreatmentName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            ${bookingData.treatmentPrice ? `<p><strong>Price:</strong> £${bookingData.treatmentPrice}</p>` : ''}
            ${bookingData.treatmentDuration ? `<p><strong>Duration:</strong> ${bookingData.treatmentDuration} minutes</p>` : ''}
            <p><strong>Status:</strong> <span style="color: #f59e0b; font-weight: bold;">PENDING CONFIRMATION</span></p>
          </div>

          ${consentFormUrl ? `
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>📋 Important - Consent Form Required:</strong> 
              <br>Please complete your treatment consent form before your appointment:
              <br><a href="${consentFormUrl}" style="color: #d97706; text-decoration: underline; font-weight: bold;">Complete Consent Form</a>
            </p>
          </div>
          ` : ''}

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
            <p>• Complete your consent form (link above)</p>
            <p>• Avoid sun exposure 48 hours before laser treatments</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>If you have any questions or need to make changes to your appointment, please don't hesitate to contact us at <strong>01207 239983</strong>.</p>
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
        customerEmailSent: customerEmailResponse.data ? true : false,
        consentFormUrl: consentFormUrl
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
