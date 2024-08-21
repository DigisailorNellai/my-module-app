import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Web App</h1>
        <div className="space-y-4">
          <Link href="/register">
            <span className="inline-block w-48 py-3 bg-blue-600 text-white text-lg rounded-lg shadow cursor-pointer hover:bg-blue-700">
              Register
            </span>
          </Link>
          <Link href="/login">
            <span className="inline-block w-48 py-3 bg-gray-600 text-white text-lg rounded-lg shadow cursor-pointer hover:bg-gray-700">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
