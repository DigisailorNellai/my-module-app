import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../components/SidebarLayout';
import Header from '@/components/header';
import { db, auth } from '../../../firebase.config'; // Correct import
import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import AddEmployeeForm from '@/components/adminBasedForm/AddEmployeeForm';
import AddStudentForm from '@/components/adminBasedForm/AddStudentForm';
import EmployeeList from '@/components/adminBasedForm/EmployeeList';

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
  const [isEmployeeFormVisible, setEmployeeFormVisible] = useState(false); // State for form visibility

  useEffect(() => {
    const fetchBusinessType = async () => {
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
          }
        }
      }
      setLoading(false);
    };

    fetchBusinessType();
  }, []);

  const toggleEmployeeForm = () => {
    setEmployeeFormVisible(!isEmployeeFormVisible);
  };

  const closeEmployeeForm = () => {
    setEmployeeFormVisible(false);
  };

  if (loading) {
    return <div>Loading...</div>;
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
        <div>
          <h2 className="text-xl font-semibold">Course Management</h2>
          <AddStudentForm />
        </div>
      )}
    </SidebarLayout>
  );
};

export default Adminpage;



// import React from 'react';
// import SidebarLayout from '../../components/SidebarLayout';
// import Header from '@/components/header';

// const Adminpage: React.FC = () => {
//   return (
//     <SidebarLayout>
//       <Header title={'Admin'}/>
//       <h1 className="text-2xl font-bold">Admin Pagess</h1>
//       {/* Page content here */}
//     </SidebarLayout>
//   );
// };

// export default Adminpage;