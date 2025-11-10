import React19Demo from "@/components/react19-demo";
import React19ServerDemo from "@/components/react19-server-demo";
import React19ActionDemo from "@/components/react19-action-demo";

export default function React19DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          React 19 & Server Components Demo
        </h1>

        <div className="space-y-8">
          <React19Demo />
          <React19ServerDemo />
          <React19ActionDemo />
        </div>
      </div>
    </div>
  );
}
