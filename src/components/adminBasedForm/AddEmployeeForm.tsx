// import React, { useState } from 'react';
// import { db, auth } from '../../../firebase.config'; // Ensure correct path
// import { collection, addDoc } from 'firebase/firestore';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const AddEmployeeForm: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const user = auth.currentUser;

//     if (user) {
//       try {
//         // Create a new user in Firebase Authentication
//         await createUserWithEmailAndPassword(auth, email, password);

//         // Store employee details in Firestore
//         const employeeData = { name, email, phone, address };
//         const docRef = await addDoc(collection(db, `admins/${user.uid}/employees`), employeeData);
//         console.log('Document written with ID: ', docRef.id);

//         // Clear form fields
//         setName('');
//         setEmail('');
//         setPhone('');
//         setAddress('');
//         setPassword('');
//         setError(null); // Clear any previous errors
//       } catch (e: any) {
//         console.error('Error adding document: ', e);
//         setError(e.message); // Set error message to display to the user
//       }
//     } else {
//       setError('No authenticated user found.');
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
//         >
//           Add Employee
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddEmployeeForm;

import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebase.config'; 
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface AddEmployeeFormProps {
  closeForm: () => void;  // Prop to close the form
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ closeForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessId = async () => {
      const user = auth.currentUser;
      if (user) {
        const adminDocRef = doc(db, `admins/${user.uid}`);
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          const adminData = adminDoc.data();
          setBusinessId(adminData?.businessId || null);
        } else {
          setError('Admin document does not exist.');
        }
      }
    };

    fetchBusinessId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user && businessId) {
      try {
        // Create a new user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUserId = userCredential.user.uid;
        
        // Store employee details in Firestore
        const employeesRef = collection(db, `businesses/${businessId}/employees`);
        const employeeData = {
          name,
          email,
          phone,
          address,
          role: 'employee', // Add role information
        };
        const docRef = await addDoc(employeesRef, employeeData);
        console.log('Employee added with ID: ', docRef.id);

        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setPassword('');
        setError(null);
        closeForm(); // Close the form after submission
      } catch (e: any) {
        console.error('Error adding employee: ', e);
        setError(e.message);
      }
    } else {
      setError('No authenticated user found or Business ID is missing.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
