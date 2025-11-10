// This is a Server Component (no "use client" directive)

// Server Action (this runs on the server)
async function fetchUserData() {
  // Simulate fetching data from an API
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
    lastLogin: new Date().toLocaleDateString(),
  };
}

// Server Component - can directly fetch data
export default async function React19ServerDemo() {
  // Directly fetch data in the component (Server Components feature)
  const userData = await fetchUserData();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Server Components Demo
        </h2>
        <p className="text-gray-600">
          This component demonstrates React Server Components fetching data
          directly.
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          User Profile (Fetched Server-Side)
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Name:</span>
            <span className="font-medium text-gray-900">{userData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email:</span>
            <span className="font-medium text-gray-900">{userData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Role:</span>
            <span className="font-medium text-gray-900">{userData.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Last Login:</span>
            <span className="font-medium text-gray-900">
              {userData.lastLogin}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Server Components Features Demonstrated
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>
            <strong>Direct Data Fetching</strong> - Fetch data directly in
            component without useEffect
          </li>
          <li>
            <strong>Zero Client JavaScript</strong> - This component
            doesn&apos;t ship any JS to the browser
          </li>
          <li>
            <strong>Automatic Code Splitting</strong> - Server Components are
            automatically code-split
          </li>
          <li>
            <strong>Component Composition</strong> - Can import Client
            Components inside Server Components
          </li>
        </ul>
      </div>
    </div>
  );
}
