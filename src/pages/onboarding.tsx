import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

const modulesList = ['Auth Module', 'Employee Module', 'Payroll Module', 'Analytics Module'];

export default function Onboarding() {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const router = useRouter();

  const toggleModule = (module: string) => {
    setSelectedModules((prevModules) =>
      prevModules.includes(module) ? prevModules.filter((m) => m !== module) : [...prevModules, module]
    );
  };

  const submitModules = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        modules: selectedModules,
      });
      router.push('/payment'); // Redirect to payment page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Your Modules</h1>
        <div className="space-y-4">
          {modulesList.map((module) => (
            <label key={module} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedModules.includes(module)}
                onChange={() => toggleModule(module)}
                className="form-checkbox"
              />
              <span>{module}</span>
            </label>
          ))}
        </div>
        <button onClick={submitModules} className="w-full py-3 mt-6 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
}
