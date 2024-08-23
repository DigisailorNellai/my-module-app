// pages/registration.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db, storage } from '../../firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const router = useRouter();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      console.log("User created with UID:", userId);
  
      // Upload business logo if selected
      let logoDownloadUrl = '';
      if (logo) {
        const logoRef = ref(storage, `logos/${userId}_${logo.name}`);
        await uploadBytes(logoRef, logo);
        logoDownloadUrl = await getDownloadURL(logoRef);
        console.log("Logo uploaded, URL:", logoDownloadUrl);
      }
  
      // Create business document and get the ID
      const businessDocRef = await addDoc(collection(db, 'businesses'), {
        businessName,
        businessType,
        location,
        logoUrl: logoDownloadUrl, // Save the logo URL
      });
      const businessId = businessDocRef.id;
      console.log("Business document created with ID:", businessId);
  
      // Save registration details and onboarding details in the user document
      await setDoc(doc(db, 'admins', userId), {
        registrationDetails: {
          email,
          phoneNumber,
        },
        onboardingDetails: {
          selectedOptions: [],
          authOptions: [],
        },
        businessId, 
        role: 'admin',// Reference to the business document
      });
      console.log("Admin document created");
  
      // Redirect to the onboarding page
      router.push('/onboarding');
    } catch (error) {
      console.error("Error creating user or documents:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Logo and Title */}
      <div className="w-1/2 bg-blue-400 text-white flex items-center justify-center p-8">
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4" style={{ width: '80px' }} />
          <h1 className="text-3xl font-bold text-slate-800">Modal App</h1>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Register</h2>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Business Type</label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Business Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-1/2 mx-auto block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-700 font-medium">
                login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}