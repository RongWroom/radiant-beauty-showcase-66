
import { supabase } from "@/integrations/supabase/client";

type NotificationType = 'appointment-status' | 'reschedule' | 'cancellation';

interface BaseNotificationData {
  appointmentId: string;
  userId: string;
  treatmentName: string;
  appointmentDate: string;
  appointmentTime: string;
}

interface StatusNotificationData extends BaseNotificationData {
  status: 'confirmed' | 'cancelled';
  adminNotes?: string;
}

interface RescheduleNotificationData extends BaseNotificationData {
  oldAppointmentDate: string;
  oldAppointmentTime: string;
  newAppointmentDate: string;
  newAppointmentTime: string;
}

interface CancellationNotificationData extends BaseNotificationData {
  cancelledBy: 'customer' | 'admin';
  reason?: string;
}

type NotificationData = StatusNotificationData | RescheduleNotificationData | CancellationNotificationData;

export async function sendNotification(
  type: NotificationType,
  data: NotificationData
): Promise<void> {
  try {
    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, last_name, email")
      .eq("id", data.userId)
      .single();

    const customerName = profile 
      ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
      : 'Customer';

    const notificationData = {
      ...data,
      customerName,
      customerEmail: profile?.email || '',
    };

    let functionName: string;
    
    switch (type) {
      case 'appointment-status':
        functionName = 'send-appointment-status-notification';
        break;
      case 'reschedule':
        functionName = 'send-reschedule-notification';
        break;
      case 'cancellation':
        functionName = 'send-cancellation-notification';
        break;
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }

    await supabase.functions.invoke(functionName, {
      body: notificationData,
    });
  } catch (error) {
    console.error(`Failed to send ${type} notification:`, error);
    // Don't throw - notification failures shouldn't block the main operation
  }
}
