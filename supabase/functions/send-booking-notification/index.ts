
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  customerName: string;
  customerEmail: string;
  treatmentName: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  treatmentPrice: number;
  treatmentDuration: number;
  treatmentCategory?: string;
}

// Consent form mapping
const CONSENT_FORM_MAPPING = {
  'facial': 'https://forms.gle/VCjJYxR8bfPRqMcP8',
  'skin': 'https://forms.gle/VCjJYxR8bfPRqMcP8',
  'chemical peel': 'https://forms.gle/VCjJYxR8bfPRqMcP8',
  'microneedling': 'https://forms.gle/VCjJYxR8bfPRqMcP8',
  'laser hair removal': 'https://docs.google.com/forms/d/156975FgE83Ej2Q6NSAohg5kiKC5Ze64HC1fBeyOgYVY/edit',
  'laser': 'https://docs.google.com/forms/d/156975FgE83Ej2Q6NSAohg5kiKC5Ze64HC1fBeyOgYVY/edit',
  'cryolipolysis': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  'fat freezing': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  'coolsculpting': 'https://docs.google.com/forms/d/13xEhxFcSjHG8y_HLdsLCHltOnPIuqAw8shAy4-r8ON4/edit',
  'hifu': 'https://docs.google.com/forms/d/1_eQ0FE_9hf2fssq46O0QCJvvuieeHMCT02aHfeGygME/edit',
  'ultrasound': 'https://docs.google.com/forms/d/1_eQ0FE_9hf2fssq46O0QCJvvuieeHMCT02aHfeGygME/edit',
};

function getConsentFormUrl(treatmentName: string, treatmentCategory?: string): string {
  const searchTerms = [
    treatmentName.toLowerCase(),
    treatmentCategory?.toLowerCase() || ''
  ];

  // Check for exact matches first
  for (const term of searchTerms) {
    if (CONSENT_FORM_MAPPING[term as keyof typeof CONSENT_FORM_MAPPING]) {
      return CONSENT_FORM_MAPPING[term as keyof typeof CONSENT_FORM_MAPPING];
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

  // Default to skin treatment form if no match found
  return CONSENT_FORM_MAPPING['skin'];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerName,
      customerEmail,
      treatmentName,
      appointmentDate,
      appointmentTime,
      notes,
      treatmentPrice,
      treatmentDuration,
      treatmentCategory,
    }: BookingNotificationRequest = await req.json();

    console.log("Processing booking notification for:", customerEmail);
    console.log("Booking data:", { customerName, treatmentName, appointmentDate, appointmentTime });

    // Format the date and time for display
    const formattedDate = new Date(appointmentDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date(`2000-01-01T${appointmentTime}`).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Get the appropriate consent form URL
    const consentFormUrl = getConsentFormUrl(treatmentName, treatmentCategory);

    // Send notification email to clinic using verified domain
    const clinicEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: ["sharon@stwaestheticclinic.co.uk"],
      subject: `New Appointment Booking - ${treatmentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8B5A97; padding-bottom: 10px;">
            New Appointment Booking
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B5A97; margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B5A97; margin-top: 0;">Appointment Details</h3>
            <p><strong>Treatment:</strong> ${treatmentName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Duration:</strong> ${treatmentDuration} minutes</p>
            <p><strong>Price:</strong> £${treatmentPrice}</p>
            ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
          </div>

          <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2563eb;">
              <strong>Consent form automatically sent to customer:</strong> 
              <a href="${consentFormUrl}" style="color: #2563eb;">View Form</a>
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This is an automated notification from your STW Clinic booking system.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Clinic email response:", clinicEmailResponse);

    // Send consent form email to customer using verified domain
    const customerEmailResponse = await resend.emails.send({
      from: "STW Aesthetic Clinic <noreply@stwaestheticclinic.co.uk>",
      to: [customerEmail],
      subject: `Appointment Confirmed - Consent Form Required`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8B5A97; padding-bottom: 10px;">
            Appointment Confirmed!
          </h2>
          
          <p>Dear ${customerName},</p>
          
          <p>Thank you for booking your appointment with STW Aesthetic Clinic. Your booking has been confirmed for:</p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B5A97; margin-top: 0;">Your Appointment</h3>
            <p><strong>Treatment:</strong> ${treatmentName}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Duration:</strong> ${treatmentDuration} minutes</p>
            <p><strong>Price:</strong> £${treatmentPrice}</p>
          </div>

          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">🔴 Important: Consent Form Required</h3>
            <p style="margin-bottom: 15px;">Before your appointment, you must complete and submit the consent form for your treatment. This is a legal requirement and your appointment cannot proceed without it.</p>
            
            <a href="${consentFormUrl}" 
               style="display: inline-block; background-color: #8B5A97; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0;">
              Complete Consent Form Now →
            </a>
            
            <p style="font-size: 14px; color: #666; margin-top: 15px;">
              Please complete this form at least 24 hours before your appointment. You'll need to provide some medical history and sign the consent digitally.
            </p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B5A97; margin-top: 0;">What to Expect</h3>
            <p>• Please arrive 15 minutes early for your appointment</p>
            <p>• Bring a valid form of ID</p>
            <p>• Come with a clean face (no makeup for facial treatments)</p>
            <p>• If you have any questions, please don't hesitate to contact us</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>We look forward to seeing you soon!</p>
            <p><strong>STW Aesthetic Clinic Team</strong></p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              If you need to reschedule or cancel, please contact us as soon as possible.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Customer email response:", customerEmailResponse);

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
        error: "Failed to send booking emails",
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
      clinicEmailId: clinicEmailResponse.data?.id,
      customerEmailId: customerEmailResponse.data?.id,
      clinicEmailError: clinicEmailResponse.error || null,
      customerEmailError: customerEmailResponse.error || null,
      consentFormUrl 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
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
