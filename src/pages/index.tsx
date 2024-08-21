import { useRouter } from 'next/router';

const LandingPage: React.FC = () => {
  const router = useRouter();

  // Function to handle navigation to the signup page
  const handleGetStartedClick = () => {
    router.push('/register');
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <span className="text-blue-500"></span> Module APP
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleGetStartedClick}
          >
            Get started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">create your web app with your own customization</h1>
        <p className="text-lg mb-8">
           shape the Business.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          onClick={handleGetStartedClick}
        >
          Get started
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
