// import React, { useEffect, useState } from 'react';
// import SidebarLayout from '../../components/SidebarLayout';
// import Header from '@/components/header';
// import { db, auth } from '../../../firebase.config'; // Correct import
// import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
// import AddEmployeeForm from '@/components/adminBasedForm/AddEmployeeForm';
// import AddStudentForm from '@/components/adminBasedForm/AddStudentForm';
// import EmployeeList from '@/components/adminBasedForm/EmployeeList';

// type businessType = 'company' | 'course';

// interface AdminData {
//   businessId: string;
// }

// interface BusinessData {
//   businessType: businessType;
// }

// const Adminpage: React.FC = () => {
//   const [businessType, setBusinessType] = useState<businessType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null); // State for error handling
//   const [isEmployeeFormVisible, setEmployeeFormVisible] = useState(false); // State for form visibility

//   useEffect(() => {
//     const fetchBusinessType = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const adminDocRef = doc(db, 'admins', user.uid); 
//           const adminDoc = await getDoc(adminDocRef);
//           const adminData = adminDoc.data() as AdminData;

//           if (adminData && adminData.businessId) {
//             const businessDocRef = doc(db, 'businesses', adminData.businessId);
//             const businessDoc = await getDoc(businessDocRef);
//             const businessData = businessDoc.data() as BusinessData;

//             if (businessData) {
//               setBusinessType(businessData.businessType);
//             } else {
//               setError('Business data not found.');
//             }
//           } else {
//             setError('Admin data not found.');
//           }
//         } else {
//           setError('User not authenticated.');
//         }
//       } catch (err) {
//         console.error('Error fetching business type:', err);
//         setError('Failed to load business data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Check if the user is authenticated first, then fetch business type
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         fetchBusinessType();
//       } else {
//         setLoading(false);
//         setError('User not authenticated.');
//       }
//     });
//   }, []);

//   const toggleEmployeeForm = () => {
//     setEmployeeFormVisible(!isEmployeeFormVisible);
//   };

//   const closeEmployeeForm = () => {
//     setEmployeeFormVisible(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!businessType) {
//     return <div>Error: Business data not found.</div>;
//   }

//   return (
//     <SidebarLayout>
//       <Header title={'Admin Panel'} />
//       {businessType === 'company' && (
//         <div className='ml-10'>
//           <h2 className="text-xl font-semibold">Employee Management</h2>
//           <button 
//             className="py-2 px-4 bg-blue-500 text-white rounded-md mb-4" 
//             onClick={toggleEmployeeForm}
//           >
//             {isEmployeeFormVisible ? 'Cancel' : 'Add Employee'}
//           </button>
//           {isEmployeeFormVisible && <AddEmployeeForm closeForm={closeEmployeeForm} />}
//           <EmployeeList />
//         </div>
//       )}
//       {businessType === 'course' && (
//         <div>
//           <h2 className="text-xl font-semibold">Course Management</h2>
//           <AddStudentForm />
//         </div>
//       )}
//     </SidebarLayout>
//   );
// };

// export default Adminpage;


import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../components/SidebarLayout';
import Header from '@/components/header';

import { db, auth } from '../../../firebase.config';
import { collection, doc, getDoc } from 'firebase/firestore';
import AddEmployeeForm from '@/components/adminBasedForm/AddEmployeeForm';
import AddStudentForm from '@/components/adminBasedForm/AddStudentForm';
import EmployeeList from '@/components/adminBasedForm/EmployeeList';
import AddCourseForm from '@/components/adminBasedForm/Addcourse';
import { useAdminStore } from '../../components/adminStore';
type businessType = 'company' | 'course';

interface AdminData {
  businessId: string;
}

interface BusinessData {
  businessType: businessType;
}

const Adminpage: React.FC = () => {
  const [businessType, setBusinessType] = useState<businessType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmployeeFormVisible, setEmployeeFormVisible] = useState(false);
  const [isStudentFormVisible, setStudentFormVisible] = useState(false);
  const [isCourseFormVisible, setCourseFormVisible] = useState(false);

  useEffect(() => {
    const fetchBusinessType = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const adminDocRef = doc(db, 'admins', user.uid);
          const adminDoc = await getDoc(adminDocRef);
          const adminData = adminDoc.data() as AdminData;

          if (adminData && adminData.businessId) {
            const businessDocRef = doc(db, 'businesses', adminData.businessId);
            const businessDoc = await getDoc(businessDocRef);
            const businessData = businessDoc.data() as BusinessData;

            if (businessData) {
              setBusinessType(businessData.businessType);
            } else {
              setError('Business data not found.');
            }
          } else {
            setError('Admin data not found.');
          }
        } else {
          setError('User not authenticated.');
        }
      } catch (err) {
        console.error('Error fetching business type:', err);
        setError('Failed to load business data.');
      } finally {
        setLoading(false);
      }
    };

    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchBusinessType();
      } else {
        setLoading(false);
        setError('User not authenticated.');
      }
    });
  }, []);


  useEffect(() => {
    // Fetch business type on component mount
    fetchBusinessType();
  }, [fetchBusinessType]);


  const toggleEmployeeForm = () => {
    setEmployeeFormVisible(!isEmployeeFormVisible);
  };

  const closeEmployeeForm = () => {
    setEmployeeFormVisible(false);
  };

  const toggleStudentForm = () => {
    setStudentFormVisible(!isStudentFormVisible);
  };

  const toggleCourseForm = () => {
    setCourseFormVisible(!isCourseFormVisible);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!businessType) {
    return <div>Error: Business data not found.</div>;
  }

  return (
    <SidebarLayout>
      <Header title={'Admin Panel'} />
      {businessType === 'company' && (
        <div className='ml-10'>
          <h2 className="text-xl font-semibold">Employee Management</h2>
          <button 
            className="py-2 px-4 bg-blue-500 text-white rounded-md mb-4" 
            onClick={toggleEmployeeForm}
          >
            {isEmployeeFormVisible ? 'Cancel' : 'Add Employee'}
          </button>
          {isEmployeeFormVisible && <AddEmployeeForm closeForm={closeEmployeeForm} />}
          <EmployeeList />
        </div>
      )}
      {businessType === 'course' && (
        <div className='ml-10'>
          <h2 className="text-xl font-semibold">Course Management</h2>
          <div className='mt-10'>
            <button 
              className="py-2 px-4 bg-blue-500 text-white rounded-md mb-4 mr-10" 
              onClick={toggleStudentForm}
            >
              {isStudentFormVisible ? 'Cancel' : 'Add Student'}
            </button>
            <button 
              className="py-2 px-4 bg-green-500 text-white rounded-md mb-4" 
              onClick={toggleCourseForm}
            >
              {isCourseFormVisible ? 'Cancel' : 'Add Course'}
            </button>
          </div>
          {isStudentFormVisible && <AddStudentForm closeForm={function (): void {
            throw new Error('Function not implemented.');
          } } />}
          {isCourseFormVisible && <AddCourseForm closeForm={function (): void {
            throw new Error('Function not implemented.');
          } } />}
        </div>
      )}
    </SidebarLayout>
  );
};

export default AdminPage;
