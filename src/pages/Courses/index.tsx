import React from 'react';
import SidebarLayout from '../../components/SidebarLayout';
import Header from '@/components/header';

const Coursespage: React.FC = () => {
  return (
    <SidebarLayout>
      <Header title={'Courses'}/>
      <h1 className="text-2xl font-bold">Courses</h1>
      {/* Page content here */}
    </SidebarLayout>
  );
};

export default Coursespage;


// import React, { useEffect, useState } from 'react';
// import SidebarLayout from '../../components/SidebarLayout';
// import Header from '@/components/header';
// import { db } from '../../../firebase.config'; // Adjust the path to where your Firebase setup is
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { useAuth } from '../../../firebase.config'; // Custom hook for authentication

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   // Add other course properties as needed
// }

// const CoursesPage: React.FC = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const { user } = useAuth(); // Using the custom hook

//   useEffect(() => {
//     const fetchUserCourses = async () => {
//       if (!user) return;

//       try {
//         const q = query(
//           collection(db, 'userCourses'),
//           where('userId', '==', user.uid)
//         );
//         const querySnapshot = await getDocs(q);
//         const userCourses: Course[] = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Course[];
        
//         setCourses(userCourses);
//       } catch (error) {
//         console.error('Error fetching user courses:', error);
//       }
//     };

//     fetchUserCourses();
//   }, [user]);

//   return (
//     <SidebarLayout>
//       <Header title={'Courses'} />
//       <h1 className="text-2xl font-bold">Courses</h1>
//       {courses.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {courses.map(course => (
//             <div key={course.id} className="p-4 border rounded-lg shadow-sm">
//               <h2 className="text-xl font-semibold">{course.title}</h2>
//               <p>{course.description}</p>
//               {/* You can add more course details here */}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No courses selected.</p>
//       )}
//     </SidebarLayout>
//   );
// };

// export default CoursesPage;
