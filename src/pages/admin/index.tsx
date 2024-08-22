import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../components/SidebarLayout';
import Header from '@/components/header';
import { db, auth } from '../../../firebase.config'; // Correct import
import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import AddEmployeeForm from '@/components/adminBasedForm/AddEmployeeForm';
import AddStudentForm from '@/components/adminBasedForm/AddStudentForm';

type BusinessType = 'employeeManagement' | 'courseManagement';

interface AdminData {
  businessId: string;
}

interface BusinessData {
  businessType: BusinessType;
}

const Adminpage: React.FC = () => {
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessType = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetch the admin's businessId
        const adminDocRef = doc(db, 'admins', user.uid); // Use doc to reference the document
        const adminDoc = await getDoc(adminDocRef);
        const adminData = adminDoc.data() as AdminData;

        if (adminData && adminData.businessId) {
          // Fetch the business type from the businesses collection
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!businessType) {
    return <div>Error: Business data not found.</div>;
  }

  return (
    <SidebarLayout>
      <Header title={'Admin Panel'} />
      <h1 className="text-2xl font-bold">Admin Page</h1>

      {/* Conditional rendering based on business type */}
      {businessType === 'employeeManagement' && (
        <div>
          <h2 className="text-xl font-semibold">Employee Management</h2>
          <p>Here you can add and manage employees.</p>
          <AddEmployeeForm />
        </div>
      )}

      {businessType === 'courseManagement' && (
        <div>
          <h2 className="text-xl font-semibold">Course Management</h2>
          <p>Here you can add and manage courses and students.</p>
          <AddStudentForm />
        </div>
      )}

      {/* Add more business types as needed */}
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