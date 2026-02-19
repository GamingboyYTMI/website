
import { BookingDetails } from "../types";

/**
 * Sends booking data to Zapier.
 * Zapier Trigger: Catch Webhook
 * Zapier Action 1: Create Spreadsheet Row in Google Sheets
 * Zapier Action 2: Create Live Item in Webflow CMS
 */
export const syncBookingToCloud = async (booking: Partial<BookingDetails>) => {
  // In a production environment, this URL would come from process.env.ZAPIER_WEBHOOK_URL
  // For this implementation, we use a placeholder that the user can replace.
  const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/REPLACE_WITH_YOUR_ID/";

  try {
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors", // Webhooks often require no-cors if not configured for specific origins
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...booking,
        timestamp: new Date().toISOString(),
        source: "SparkleStream Web App",
        status: "Pending Dispatch"
      }),
    });

    // Note: With 'no-cors', we won't see the response body, 
    // but the request is successfully dispatched.
    return true;
  } catch (error) {
    console.error("Cloud Sync Error:", error);
    // Even if sync fails, we might want to let the user proceed 
    // and handle retry logic locally/offline.
    return false;
  }
};
