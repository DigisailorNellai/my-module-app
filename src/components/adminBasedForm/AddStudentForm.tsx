import React, { useState } from 'react';
import { db } from '../../../firebase.config'; // Adjust the import path as needed
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../../../firebase.config'; // Assuming you're using auth for the current user

const AddStudentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        const studentData = { name, email, course };
        // Use the 'db' instance here instead of 'firestore'
        const docRef = await addDoc(collection(db, `admins/${user.uid}/students`), studentData);
        console.log('Document written with ID: ', docRef.id);
        // Clear form
        setName('');
        setEmail('');
        setCourse('');
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
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="btn-primary">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
