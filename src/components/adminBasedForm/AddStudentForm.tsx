// import React, { useState } from 'react';
// import { db } from '../../../firebase.config'; // Adjust the import path as needed
// import { collection, addDoc } from 'firebase/firestore';
// import { auth } from '../../../firebase.config'; // Assuming you're using auth for the current user

// const AddStudentForm: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [course, setCourse] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const user = auth.currentUser;

//     if (user) {
//       try {
//         const studentData = { name, email, course };
//         // Use the 'db' instance here instead of 'firestore'
//         const docRef = await addDoc(collection(db, admins/${user.uid}/students), studentData);
//         console.log('Document written with ID: ', docRef.id);
//         // Clear form
//         setName('');
//         setEmail('');
//         setCourse('');
//       } catch (e) {
//         console.error('Error adding document: ', e);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="input-field"
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="input-field"
//       />
//       <input
//         type="text"
//         placeholder="Course"
//         value={course}
//         onChange={(e) => setCourse(e.target.value)}
//         className="input-field"
//       />
//       <button type="submit" className="btn-primary">Add Student</button>
//     </form>
//   );
// };

// export default AddStudentForm;





// src/components/AddStudentForm.tsx

// src/components/AddStudentForm.tsx

// src/components/AddStudentForm.tsx

import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebase.config'; 
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface AddStudentFormProps {
  closeForm: () => void;  // New prop to close the form
}

const AddEmployeeForm: React.FC<AddStudentFormProps> = ({ }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState('');
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
        await createUserWithEmailAndPassword(auth, email, password);
        const StudentRef = collection(db, `businesses/${businessId}/Student`);
        const StudentData = { name, email, phone, address };
        const docRef = await addDoc(StudentRef, StudentData);
        console.log('Employee added with ID: ', docRef.id);

        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setPassword('');
        setCourse('')
        setError(null);
        // closeForm(); // Close the form after submission
      } catch (e: any) {
        console.error('Error adding Student: ', e);
        setError(e.message);
      }
    } else {
      setError('No authenticated user found or Business ID is missing.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Students</h2>
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
