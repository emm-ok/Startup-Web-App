'use client';

import { MessageSquare } from 'lucide-react';

export default function FeedbackButton() {
  const handleFeedback = () => {
    console.log('Feedback button clicked!');
    try {
      if (typeof window !== 'undefined' && window.showSentryFeedback) {
        console.log('Calling showSentryFeedback...');
        window.showSentryFeedback();
      } else {
        console.log('showSentryFeedback not available, trying fallback...');
        // Fallback: create a simple alert
        alert('Feedback feature is not available right now. Please try again later.');
      }
    } catch (error) {
      console.error('Error in handleFeedback:', error);
      alert('An error occurred while opening feedback. Please check the console for details.');
    }
  };

  return (
    <button
      onClick={handleFeedback}
      className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      title="Give Feedback"
    >
      <MessageSquare size={20} />
    </button>
  );
}