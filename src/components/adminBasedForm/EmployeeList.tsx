import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../firebase.config';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';

interface Employee {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void = () => {};
    
    const fetchEmployees = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Fetch the admin's businessId
          const adminDocRef = doc(db, 'admins', user.uid);
          const adminDoc = await getDoc(adminDocRef);
          const adminData = adminDoc.data();
          const businessId = adminData?.businessId;

          if (businessId) {
            // Set up a real-time listener for the employees subcollection
            const employeesQuery = query(collection(db, `businesses/${businessId}/employees`));
            unsubscribe = onSnapshot(employeesQuery, (querySnapshot) => {
              const employeesData = querySnapshot.docs.map((doc) => doc.data() as Employee);
              setEmployees(employeesData);
              setLoading(false);
            });
          } else {
            setError('Business ID not found.');
            setLoading(false);
          }
        } else {
          setError('No authenticated user found.');
          setLoading(false);
        }
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchEmployees();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 ">Employees</h3>
      <ul>
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <li key={index} className="border-b py-2 flex space-x-10">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
              <p><strong>Address:</strong> {employee.address}</p>
            </li>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;
