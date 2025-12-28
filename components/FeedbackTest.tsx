'use client'
import { useEffect } from 'react';

export default function FeedbackTest() {
  useEffect(() => {
    // Test if Sentry feedback is available
    const checkFeedback = () => {
      try {
        console.log('=== Feedback Test Check ===');
        console.log('Window object available:', typeof window !== 'undefined');

        if (typeof window !== 'undefined') {
          console.log('showSentryFeedback function exists:', !!window.showSentryFeedback);

          if (window.showSentryFeedback) {
            console.log('showSentryFeedback is a function:', typeof window.showSentryFeedback === 'function');
          }
        }

        // Check if feedback button exists
        const feedbackButton = document.querySelector('[data-sentry-feedback]');
        if (feedbackButton) {
          console.log('Sentry auto-injected feedback button found:', feedbackButton);
        } else {
          console.log('No Sentry auto-injected feedback button found');
        }

        // Check for custom feedback button
        const customButton = document.querySelector('button[title="Give Feedback"]');
        if (customButton) {
          console.log('Custom feedback button found:', customButton);
        } else {
          console.log('Custom feedback button not found');
        }

        // Test Sentry.getFeedback()
        try {
          const Sentry = (window as any).Sentry;
          if (Sentry && Sentry.getFeedback) {
            const feedback = Sentry.getFeedback();
            console.log('Sentry.getFeedback() result:', feedback);
          } else {
            console.log('Sentry.getFeedback not available');
          }
        } catch (error) {
          console.log('Error checking Sentry.getFeedback():', error);
        }

      } catch (error) {
        console.error('Error in feedback check:', error);
      }
    };

    // Check immediately and after delays
    checkFeedback();
    setTimeout(checkFeedback, 1000);
    setTimeout(checkFeedback, 3000);
  }, []);

  return null;
}