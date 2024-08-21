
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db, auth } from '../../firebase.config'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


export default function Sidebar() {
  const [sidebarOptions, setSidebarOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          // Fetch user document
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setSidebarOptions(userData?.onboardingDetails?.selectedOptions || []);
            
            // Fetch business document if businessId exists
            const businessId = userData?.businessId;
            if (businessId) {
              const businessDoc = await getDoc(doc(db, 'businesses', businessId));
              if (businessDoc.exists()) {
                const businessData = businessDoc.data();
                setBusinessName(businessData?.businessName || 'No Business Name');
                setLogoUrl(businessData?.logoUrl || null); // Get the logo URL
              }
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const availableOptions = [
    { id: 'admin', name: 'Admin', route: '/admin' },
    { id: 'employees', name: 'Employees', route: '/employees' },
    { id: 'courses', name: 'Courses', route: '/Courses' },
    { id: 'customers', name: 'Customers', route: '/Customers' },
    { id: 'users', name: 'Users', route: '/Users' },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className=" ml-10 mb-4 flex items-center space-x-2">
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Business Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
        )}
        <h2 className="text-xl font-bold">{businessName}</h2>
      </div>
      <ul>
        {availableOptions
          .filter(option => sidebarOptions.includes(option.id))
          .map(option => (
            <li key={option.id}>
              <Link href={option.route}>
                <span className="block py-2 px-4 hover:bg-gray-700">{option.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { db, auth } from '../../firebase.config';
// import { doc, getDoc } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import { useQuery } from '@tanstack/react-query';

// interface UserData {
//   onboardingDetails?: {
//     selectedOptions: string[];
//   };
//   businessId?: string;
// }

// interface BusinessData {
//   businessName?: string;
//   logoUrl?: string;
// }

// interface SidebarData {
//   sidebarOptions: string[];
//   businessName: string | null;
//   logoUrl: string | null;
// }

// export default function Sidebar() {
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//       } else {
//         setUserId(null);
//       }
//     });

//     return () => unsubscribe(); // Clean up subscription on unmount
//   }, []);

//   const { data, isLoading, isError, error } = useQuery<SidebarData | null>(
//     ['userAndBusinessData', userId],
//     async () => {
//       if (userId) {
//         // Fetch user document
//         const userDoc = await getDoc(doc(db, 'users', userId));
//         if (userDoc.exists()) {
//           const userData = userDoc.data() as UserData;
//           const sidebarOptions = userData?.onboardingDetails?.selectedOptions || [];

//           // Fetch business document if businessId exists
//           const businessId = userData?.businessId;
//           let businessName: string | null = null;
//           let logoUrl: string | null = null;
//           if (businessId) {
//             const businessDoc = await getDoc(doc(db, 'businesses', businessId));
//             if (businessDoc.exists()) {
//               const businessData = businessDoc.data() as BusinessData;
//               businessName = businessData?.businessName || 'No Business Name';
//               logoUrl = businessData?.logoUrl || null;
//             }
//           }

//           return { sidebarOptions, businessName, logoUrl };
//         }
//       }
//       return null;
//     },
    
//       enabled: !!userId,
  
//   );

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

//   const { sidebarOptions, businessName, logoUrl } = data || {
//     sidebarOptions: [],
//     businessName: null,
//     logoUrl: null,
//   };

//   const availableOptions = [
//     { id: 'admin', name: 'Admin', route: '/admin' },
//     { id: 'employees', name: 'Employees', route: '/employees' },
//     { id: 'courses', name: 'Courses', route: '/Courses' },
//     { id: 'customers', name: 'Customers', route: '/Customers' },
//     { id: 'users', name: 'Users', route: '/Users' },
//   ];

//   return (
//     <div className="w-64 bg-gray-800 text-white h-screen p-4">
//       <div className="mb-4 flex items-center space-x-2">
//         {logoUrl && (
//           <img
//             src={logoUrl}
//             alt="Business Logo"
//             className="w-12 h-12 object-cover rounded-full"
//           />
//         )}
//         <h2 className="text-xl font-bold">{businessName}</h2>
//       </div>
//       <ul>
//         {availableOptions
//           .filter((option) => sidebarOptions.includes(option.id))
//           .map((option) => (
//             <li key={option.id}>
//               <Link href={option.route}>
//                 <a className="block py-2 px-4 hover:bg-gray-700">
//                   {option.name}
//                 </a>
//               </Link>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }