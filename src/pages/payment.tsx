import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Payment() {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const router = useRouter();

  const handleModuleChange = (module: string) => {
    setSelectedModules((prev) =>
      prev.includes(module) ? prev.filter((item) => item !== module) : [...prev, module]
    );
  };

  const handleSubmit = () => {
    // Simulate payment process
    console.log('Payment for modules:', selectedModules);
    // Redirect to the dashboard after payment
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Modules</h1>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedModules.includes('Auth Module')}
              onChange={() => handleModuleChange('Auth Module')}
              className="mr-2"
            />
            Auth Module
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedModules.includes('Employee Module')}
              onChange={() => handleModuleChange('Employee Module')}
              className="mr-2"
            />
            Employee Module
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedModules.includes('Payroll Module')}
              onChange={() => handleModuleChange('Payroll Module')}
              className="mr-2"
            />
            Payroll Module
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedModules.includes('Analytics Module')}
              onChange={() => handleModuleChange('Analytics Module')}
              className="mr-2"
            />
            Analytics Module
          </label>
          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
}
