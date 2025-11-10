"use client";

import { useActionState, useState } from "react";

// Define the state type
type FormState = {
  message: string;
  success: boolean;
};

// Server action for form submission
async function submitFeedback(prevState: FormState, formData: FormData) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const feedback = formData.get("feedback");

  // Simple validation
  if (!feedback || (feedback as string).length < 10) {
    return {
      message: "Feedback must be at least 10 characters long.",
      success: false,
    };
  }

  // Success case
  return {
    message: "Thank you for your feedback!",
    success: true,
  };
}

export default function React19ActionDemo() {
  const [state, formAction, isPending] = useActionState(submitFeedback, {
    message: "",
    success: false,
  });
  const [_, setIsDirty] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          useActionState Hook Demo
        </h2>
        <p className="text-gray-600">
          This form demonstrates the new useActionState hook in React 19.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows={4}
            required
            onChange={() => setIsDirty(true)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your thoughts with us..."
          />
        </div>

        {state?.message && (
          <div
            className={`p-4 rounded-md ${
              state.success
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {state.message}
          </div>
        )}

        {isPending && (
          <p className="text-center text-gray-600">Submitting...</p>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit Feedback
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          useActionState Features Demonstrated
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>
            <strong>Form State Management</strong> - Manages form state and
            submission lifecycle
          </li>
          <li>
            <strong>Server Action Integration</strong> - Works seamlessly with
            Server Actions
          </li>
          <li>
            <strong>Progressive Enhancement</strong> - Enhances form behavior
            without JavaScript
          </li>
          <li>
            <strong>Error Handling</strong> - Built-in error state management
          </li>
        </ul>
      </div>
    </div>
  );
}
