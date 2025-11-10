"use client";

import { useState, useOptimistic, useRef } from "react";
import { useFormStatus } from "react-dom";

// Server Action (simulating backend functionality)
async function submitForm(formData: FormData) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would be an actual server action
  const name = formData.get("name");
  const email = formData.get("email");

  return {
    success: true,
    message: `Thank you, ${name}! We've received your information.`,
    data: { name, email },
  };
}

// Submit button component using useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-3 px-4 rounded-md text-white font-medium ${
        pending
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      } transition-colors`}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

// Client component showcasing React 19 features
export default function React19Demo() {
  const [message, setMessage] = useState<string | null>(null);
  const [optimisticMessage, setOptimisticMessage] = useOptimistic(
    message,
    (state, newMessage: string) => newMessage
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Action using new React 19 features
  const action = async (formData: FormData) => {
    setOptimisticMessage("Submitting your information...");
    const result = await submitForm(formData);

    if (result.success) {
      setMessage(result.message);
      formRef.current?.reset();
    } else {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          New React 19 Features Demo
        </h2>
        <p className="text-gray-600">
          This form demonstrates React 19 features including useFormStatus,
          useOptimistic, and Server Actions.
        </p>
      </div>

      {optimisticMessage && (
        <div
          className={`mb-6 p-4 rounded-md ${
            optimisticMessage.includes("Thank you")
              ? "bg-green-50 text-green-800"
              : "bg-blue-50 text-blue-800"
          }`}
        >
          {optimisticMessage}
        </div>
      )}

      <form action={action} ref={formRef} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <SubmitButton />
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          React 19 Features Demonstrated
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>
            <strong>useFormStatus</strong> - For tracking form submission state
          </li>
          <li>
            <strong>useOptimistic</strong> - For optimistic UI updates during
            submissions
          </li>
          <li>
            <strong>Server Actions</strong> - Direct form submission to server
            functions
          </li>
          <li>
            <strong>Actions</strong> - New way to handle form submissions and
            data mutations
          </li>
        </ul>
      </div>
    </div>
  );
}
