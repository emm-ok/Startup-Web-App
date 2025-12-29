// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a user loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2990f88f033fd16f9b5ac61aabfee7e5@o4510600954511360.ingest.de.sentry.io/4510600958640208",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  integrations: [
    Sentry.feedbackIntegration({
      colorScheme: "system",
      showBranding: false,
      // Disable auto-inject since we have a custom button
      autoInject: false,
      // Configure the trigger button
      trigger: {
        position: "bottom-right",
        size: "medium",
      },
      // Make sure the form is properly configured
      form: {
        title: "Report an issue",
        subtitle: "Help us improve by sharing your feedback",
        labelName: "Name",
        labelEmail: "Email",
        labelMessage: "Message",
        labelSubmit: "Send Feedback",
        successMessage: "Thank you for your feedback!",
      },
      // Enable the feedback widget
      enable: true,
    })
  ],

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});

// Make feedback widget available globally for manual triggering
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  const initFeedback = () => {
    try {
      console.log('Initializing Sentry feedback...');

      // Get the feedback integration from Sentry
      const feedback = Sentry.getFeedback();
      if (feedback) {
        console.log('Sentry feedback integration found');
        window.showSentryFeedback = () => {
          try {
            console.log('Opening feedback dialog...');
            feedback.attachTo(document.body);
          } catch (error) {
            console.error('Error opening feedback dialog:', error);
          }
        };
      } else {
        console.log('Sentry feedback not found, trying alternative approach...');
        // Try to create a simple feedback dialog manually
        window.showSentryFeedback = () => {
          console.log('Manual feedback dialog triggered');
          // Create a simple modal dialog
          const modal = document.createElement('div');
          modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;">
              <div style="background: white; padding: 20px; border-radius: 8px; max-width: 400px; width: 90%;">
                <h3>Report an issue</h3>
                <p>Help us improve by sharing your feedback</p>
                <form>
                  <div style="margin-bottom: 10px;">
                    <label>Name:</label><br>
                    <input type="text" style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                  </div>
                  <div style="margin-bottom: 10px;">
                    <label>Email:</label><br>
                    <input type="email" style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 4px;">
                  </div>
                  <div style="margin-bottom: 10px;">
                    <label>Message:</label><br>
                    <textarea style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 4px; min-height: 80px;"></textarea>
                  </div>
                  <button type="submit" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Send Feedback</button>
                  <button type="button" onclick="this.closest('div').parentElement.remove()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-left: 10px;">Cancel</button>
                </form>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
        };
      }

      console.log('Sentry feedback initialization complete');
    } catch (error) {
      console.error('Error initializing feedback:', error);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeedback);
  } else {
    initFeedback();
  }
}