import React from 'react';
import SidebarLayout from '../../components/SidebarLayout';
import Header from '@/components/header';

const EmployeePage: React.FC = () => {
  return (
    <SidebarLayout>
      <Header title={'Employees'}/>
      <h1 className="text-2xl font-bold">Employee Pagess</h1>
      {/* Page content here */}
    </SidebarLayout>
  );
};

export default EmployeePage;


// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Checkbox } from "@/components/ui/checkbox";
// import DataTable from "@/components/datatable";
// import React, { useState } from "react";
// import EmployeeStats from "@/components/employees/employeeStats";
// import { ColumnDef, Row } from "@tanstack/react-table";
// // import IconButton from "@/components/iconbutton";
// import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// import LeaveRequestTable from "@/components/employees/leavetable";
// import SidebarLayout from "@/components/SidebarLayout";
// import Header from "@/components/header";
// import IconButton from "@/components/ui/iconbutton";


// interface Employee {
//   id: string;
//   name: string;
//   position: string;
//   department: string;
//   email: string;
//   phoneNumber: string;
//   hireDate: string;
//   salary: number;
//   status: "active" | "inactive";
// }


// const Homepage: React.FC = () => {

//   const [EmployeeList, setEmployeeList] = useState<boolean>(true)
//   const [LeaveForm, setLeaveForm] = useState<boolean>(false)

//   const OnView = () => {
//     setEmployeeList(true)
//     setLeaveForm(false)
//   }

//   const OnLeave = () => {
//     setEmployeeList(false)
//     setLeaveForm(true)
//   }

//   const columns: ColumnDef<Employee>[] = [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={table.getIsAllPageRowsSelected()}
//           onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value: any) => row.toggleSelected(!!value)}
//         />
//       ),
//       enableSorting: false,
//       enableColumnFilter: false,
//       size: 48,
//     },
//     {
//       accessorKey: "name",
//       header: "Name",
//       cell: ({ row }: { row: Row<Employee> }) => {
//         const name = row.getValue("name") as string;
//         const initials = name.slice(0, 2).toUpperCase(); // Get the first two letters
//         return (
//           <div className="flex items-center space-x-2 ml-4">
//             <div
//               className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-300 text-gray-400"
//               style={{ minWidth: "2rem" }}
//             >
//               {initials}
//             </div>
//             <div className="font-medium">{name}</div>
//           </div>
//         );
//       },
//     },

//     {
//       accessorKey: "position",
//       header: "Position",
//       cell: ({ row }: { row: Row<Employee> }) => (
//         <div className="text-gray-500">{row.getValue("position")}</div>
//       ),
//     },
//     // {
//     //   accessorKey: "department",
//     //   header: "Department",
//     //   cell: ({ row }: { row: Row<Employee> }) => (
//     //     <div className="text-gray-500">{row.getValue("department")}</div>
//     //   ),
//     // },
//     {
//       accessorKey: "email",
//       header: "Email",
//       cell: ({ row }: { row: Row<Employee> }) => (
//         <div className="text-gray-500">{row.getValue("email")}</div>
//       ),
//     },
//     {
//       accessorKey: "phoneNumber",
//       header: "Phone Number",
//       cell: ({ row }: { row: Row<Employee> }) => (
//         <div className="text-gray-500">{row.getValue("phoneNumber")}</div>
//       ),
//     },
//     {
//       accessorKey: "hireDate",
//       header: "Hire Date",
//       cell: ({ row }: { row: Row<Employee> }) => (
//         <div className="text-gray-500">{row.getValue("hireDate")}</div>
//       ),
//     },
//     // {
//     //   accessorKey: "salary",
//     //   header: "Salary",
//     //   cell: ({ row }: { row: Row<Employee> }) => {
//     //     const salary = parseFloat(row.getValue("salary"));
//     //     const formatted = new Intl.NumberFormat("en-US", {
//     //       style: "currency",
//     //       currency: "USD",
//     //     }).format(salary);
//     //     return <div className="text-right font-medium">{formatted}</div>;
//     //   },
//     // },
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }: { row: Row<Employee> }) => (
//         <div className={`capitalize ${row.getValue("status") === 'active' ? 'text-green-500' : 'text-red-500'}`}>
//           {row.getValue("status")}
//         </div>
//       ),
//     },
//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }: { row: Row<Employee> }) => (
//         <div className="flex items-center justify-center space-x-2">
//           <IconButton
//             icon={<EyeIcon className="h-5 w-5 text-black" />}
//             onClick={() => handleView(row.original)}
//           />
//           <IconButton
//             icon={<PencilIcon className="h-5 w-5 text-black" />}
//             onClick={() => handleEdit(row.original)}
//           />
//           <IconButton
//             icon={<TrashIcon className="h-5 w-5 text-black" />}
//             onClick={() => handleDelete(row.original)}
//           />
//         </div>
//       ),
//     },
//   ];



//   function handleView(row: Employee) {
//     console.log("Viewing employee:", row);
//   }

//   function handleEdit(row: Employee) {
//     console.log("Editing employee:", row);
//   }
//   function handleDelete(row: Employee) {
//     console.log("Deleting employee:", row);
//   }


//   const [formData, setFormData] = useState({
//     name: "",
//     position: "",
//     department: "",
//     phoneNumber: "",
//     email: "",
//     hireDate: "",
//     salary: "",
//     status: "active",
//   });

//   const handleSubmit = () => {
//     try {
//       // Handle form submission and validation
//       console.log("Employee data:", formData);
//     } catch (error) {
//       // Handle validation errors
//       console.error("An unexpected error occurred:", error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };
//   return (
//     <>
//       <SidebarLayout>
//         <div className=" min-h-screen  w-full bg-stone-200">
//         <Header title={'Employees'}/>
//            <h1 className="text-2xl font-bold">Employee Pagess</h1>


//           <div>

//             <div className="flex space-x-4 ml-2">
//               <button
//                 className="relative group p-2 text-gray-700 font-light"
//                 onClick={() => OnView()} // Corrected: Wrapped in an arrow function
//               >
//                 <span className="relative z-10">View</span>
//                 <span className="absolute inset-x-0 top-0 h-0.5 bg-slate-400 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
//               </button>
//               {/* <button className="relative group p-2 text-gray-700 font-light">
//                 <span className="relative z-10">All</span>
//                 <span className="absolute inset-x-0 top-0 h-0.5 bg-slate-400 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
//               </button> */}
//               <button
//                 className="relative group p-2 text-gray-700 font-light"
//                 onClick={() => OnLeave()} // Corrected: Wrapped in an arrow function
//               >
//                 <span className="relative z-10">Leave requests</span>
//                 <span className="absolute inset-x-0 top-0 h-0.5 bg-slate-400 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
//               </button>
//             </div>
//             <EmployeeStats />
//             <Dialog >

//               <div className="flex justify-end mr-5 mt-5">
//                 <DialogTrigger className="bg-slate-100 w-20 h-8 rounded-md items-center">
//                   + Add
//                 </DialogTrigger>
//               </div>

//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>
//                     <h1>Add a New Employee</h1>
//                     <p>This will also be added to your employee database:</p>
//                   </DialogTitle>
//                   <DialogDescription>
//                     <br />
                    
//                   </DialogDescription>
//                 </DialogHeader>
//                 <DialogFooter className="items-center justify-center flex">
//                   <Button variant="outline" onClick={() => console.log("Cancel")}>
//                     Cancel
//                   </Button>
//                   <Button
//                     disabled={false}
//                     variant="default"
//                     onClick={handleSubmit}
//                   >
//                     Add Employee
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>



//           <br />
//           <div>

//             {EmployeeList && <DataTable
//               // tableAction={<TableAction />}
//               columns={columns}
//               data={[]}
//             />}
//             {LeaveForm && <LeaveRequestTable />}
//           </div>
//           <br />
//         </div>
//       </SidebarLayout>
//     </>
//   );
// };

// export default Homepage;
// function handleEdit(row: any): void {
//   throw new Error("Function not implemented.");
// }

// function handleDelete(original: Employee): void {
//   throw new Error("Function not implemented.");
// }
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
// import { auth, db } from '../../../firebase.config'; // Adjust the import path as needed

// const EmployeePage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [employeeData, setEmployeeData] = useState<any>(null);
//   const [businessId, setBusinessId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEmployeeBusinessId = async () => {
//       const user = auth.currentUser;
//       if (user && id) {
//         try {
//           // Iterate through all businesses to find the employee
//           const businessesSnapshot = await getDocs(collection(db, 'businesses'));
          
//           let foundBusinessId = null;

//           for (const businessDoc of businessesSnapshot.docs) {
//             const businessId = businessDoc.id;
//             const employeesRef = collection(db, `businesses/${businessId}/employees`);
//             const employeeSnapshot = await getDocs(employeesRef);
            
//             const employeeDoc = employeeSnapshot.docs.find(doc => doc.id === id);

//             if (employeeDoc) {
//               foundBusinessId = businessId;
//               break;
//             }
//           }

//           if (foundBusinessId) {
//             setBusinessId(foundBusinessId);
//           } else {
//             throw new Error('Employee not found in any business.');
//           }
//         } catch (error: any) {
//           console.error('Error fetching business ID:', error.message);
//           router.push('/404'); // Redirect to a 404 page if employee is not found
//         }
//       }
//     };

//     fetchEmployeeBusinessId();
//   }, [id]);

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       if (businessId && id) {
//         try {
//           const employeeDocRef = doc(db, `businesses/${businessId}/employees/${id}`);
//           const employeeDoc = await getDoc(employeeDocRef);

//           if (employeeDoc.exists()) {
//             setEmployeeData(employeeDoc.data());
//           } else {
//             throw new Error('Employee data not found.');
//           }
//         } catch (error: any) {
//           console.error('Error fetching employee data:', error.message);
//           router.push('/404'); // Redirect to a 404 page if employee data is not found
//         }
//       }
//     };

//     fetchEmployeeData();
//   }, [businessId, id]);

//   if (!employeeData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {employeeData.name}</h1>
//       <p>Email: {employeeData.email}</p>
//       <p>Phone: {employeeData.phone}</p>
//       <p>Address: {employeeData.address}</p>
//       {/* Additional employee data can be displayed here */}
//     </div>
//   );
// };

// export default EmployeePage;




