// pages/onboarding.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

const sidebarOptions = [
  { id: 'admin', name: 'Admin' },
  { id: 'employees', name: 'Employees' },
  { id: 'courses', name: 'Courses' },
  { id: 'customers', name: 'Customers' },
  { id: 'users', name: 'Users' },
];

export default function Onboarding() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [authOptions, setAuthOptions] = useState<string[]>([]);
  const router = useRouter();

  const handleOptionChange = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleAuthChange = (auth: string) => {
    setAuthOptions(prev =>
      prev.includes(auth)
        ? prev.filter(item => item !== auth)
        : [...prev, auth]
    );
  };

  const handleSubmit = async () => {
    try {
      // Update the onboarding details in the existing document
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), {
          onboardingDetails: {
            selectedOptions,
            authOptions,
          },
        });

        // Redirect to the payment page
        router.push('/payment');
      } else {
        alert("No user is logged in");
      }
    } catch (error) {
      console.error("Error updating onboarding details:", error);
    }
  };

  return (
    <div className="p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6">Onboarding</h1>

      {/* Sidebar Options */}
      <h2 className="text-2xl font-bold mb-4">Select Sidebar Options</h2>
      <div className="mb-6">
        {sidebarOptions.map(option => (
          <div key={option.id} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
                className="mr-2"
              />
              {option.name}
            </label>
          </div>
        ))}
      </div>

      {/* Authentication Options */}
      <h2 className="text-2xl font-bold mb-4">Authentication Options</h2>
      <div className="mb-6">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={authOptions.includes('admin')}
            onChange={() => handleAuthChange('admin')}
            className="mr-2"
          />
          Admin
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={authOptions.includes('users')}
            onChange={() => handleAuthChange('users')}
            className="mr-2"
          />
          Users
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
