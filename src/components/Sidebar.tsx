import { useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useSidebarStore } from './sidebarStore';

export default function Sidebar() {
  const { sidebarOptions, businessName, logoUrl, loading, fetchSidebarData } = useSidebarStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchSidebarData(user.uid);
      }
    });

    return () => unsubscribe();
  }, [fetchSidebarData]);

  const availableOptions = [
    { id: 'admin', name: 'Admin', route: '/admin' },
    { id: 'employees', name: 'Employees', route: '/employees' },
    { id: 'courses', name: 'Courses', route: '/Courses' },
    { id: 'customers', name: 'Customers', route: '/Customers' },
    { id: 'users', name: 'Users', route: '/Users' },
  ];

  if (loading) {
    return null; // or a skeleton loader
  }

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="ml-10 mb-4 flex items-center space-x-2">
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


// import { useEffect } from 'react';
// import Link from 'next/link';
// import { auth } from '../../firebase.config';
// import { onAuthStateChanged } from 'firebase/auth';
// import { useSidebarStore } from './sidebarStore';

// export default function Sidebar() {
//   const { sidebarOptions, businessName, logoUrl, loading, fetchSidebarData, userRole } = useSidebarStore();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchSidebarData(user.uid);
//       }
//     });

//     return () => unsubscribe();
//   }, [fetchSidebarData]);

//   // Define available sidebar options for both admins and employees
//   const allOptions = [
//     { id: 'admin', name: 'Admin', route: '/admin' },
//     { id: 'employees', name: 'Employees', route: '/employees' },
//     { id: 'courses', name: 'Courses', route: '/Courses' },
//     { id: 'customers', name: 'Customers', route: '/Customers' },
//     { id: 'users', name: 'Users', route: '/Users' },
//   ];

//   // Filter options based on user role
//   const filteredOptions = userRole === 'admin'
//     ? allOptions
//     : allOptions.filter(option => option.id === 'employees');

//   if (loading) {
//     return null; // or a skeleton loader
//   }

//   return (
//     <div className="w-64 bg-gray-800 text-white h-screen p-4">
//       <div className="ml-10 mb-4 flex items-center space-x-2">
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
//         {filteredOptions
//           .map(option => (
//             <li key={option.id}>
//               <Link href={option.route}>
//                 <span className="block py-2 px-4 hover:bg-gray-700">{option.name}</span>
//               </Link>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// }
