import React, { useState } from 'react';
import { db } from '../../../firebase.config'; // Ensure correct path
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../../../firebase.config'; // Assuming you're using auth for current user

const AddEmployeeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        const employeeData = { name, email, phone, address };
        // Use the 'db' instance here
        const docRef = await addDoc(collection(db, `admins/${user.uid}/employees`), employeeData);
        console.log('Document written with ID: ', docRef.id);
        // Clear form
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="btn-primary">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
