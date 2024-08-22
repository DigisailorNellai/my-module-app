// import React from 'react';
// import SidebarLayout from '../../components/SidebarLayout';
// import Header from '@/components/header';

// const EmployeePage: React.FC = () => {
//   return (
//     <SidebarLayout>
//       <Header title={'Employees'}/>
//       <h1 className="text-2xl font-bold">Employee Pagess</h1>
//       {/* Page content here */}
//     </SidebarLayout>
//   );
// };

// export default EmployeePage;


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Checkbox } from "@/components/ui/checkbox";
import DataTable from "@/components/datatable";
import React, { useState } from "react";
import EmployeeStats from "@/components/employees/employeeStats";
import { ColumnDef, Row } from "@tanstack/react-table";
// import IconButton from "@/components/iconbutton";
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import LeaveRequestTable from "@/components/employees/leavetable";
import SidebarLayout from "@/components/SidebarLayout";
import Header from "@/components/header";
import IconButton from "@/components/ui/iconbutton";


interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  salary: number;
  status: "active" | "inactive";
}


const Homepage: React.FC = () => {

  const [EmployeeList, setEmployeeList] = useState<boolean>(true)
  const [LeaveForm, setLeaveForm] = useState<boolean>(false)

  const OnView = () => {
    setEmployeeList(true)
    setLeaveForm(false)
  }

  const OnLeave = () => {
    setEmployeeList(false)
    setLeaveForm(true)
  }

  const columns: ColumnDef<Employee>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 48,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: { row: Row<Employee> }) => {
        const name = row.getValue("name") as string;
        const initials = name.slice(0, 2).toUpperCase(); // Get the first two letters
        return (
          <div className="flex items-center space-x-2 ml-4">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-300 text-gray-400"
              style={{ minWidth: "2rem" }}
            >
              {initials}
            </div>
            <div className="font-medium">{name}</div>
          </div>
        );
      },
    },

    {
      accessorKey: "position",
      header: "Position",
      cell: ({ row }: { row: Row<Employee> }) => (
        <div className="text-gray-500">{row.getValue("position")}</div>
      ),
    },
    // {
    //   accessorKey: "department",
    //   header: "Department",
    //   cell: ({ row }: { row: Row<Employee> }) => (
    //     <div className="text-gray-500">{row.getValue("department")}</div>
    //   ),
    // },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: { row: Row<Employee> }) => (
        <div className="text-gray-500">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }: { row: Row<Employee> }) => (
        <div className="text-gray-500">{row.getValue("phoneNumber")}</div>
      ),
    },
    {
      accessorKey: "hireDate",
      header: "Hire Date",
      cell: ({ row }: { row: Row<Employee> }) => (
        <div className="text-gray-500">{row.getValue("hireDate")}</div>
      ),
    },
    // {
    //   accessorKey: "salary",
    //   header: "Salary",
    //   cell: ({ row }: { row: Row<Employee> }) => {
    //     const salary = parseFloat(row.getValue("salary"));
    //     const formatted = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "USD",
    //     }).format(salary);
    //     return <div className="text-right font-medium">{formatted}</div>;
    //   },
    // },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: Row<Employee> }) => (
        <div className={`capitalize ${row.getValue("status") === 'active' ? 'text-green-500' : 'text-red-500'}`}>
          {row.getValue("status")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Employee> }) => (
        <div className="flex items-center justify-center space-x-2">
          <IconButton
            icon={<EyeIcon className="h-5 w-5 text-black" />}
            onClick={() => handleView(row.original)}
          />
          <IconButton
            icon={<PencilIcon className="h-5 w-5 text-black" />}
            onClick={() => handleEdit(row.original)}
          />
          <IconButton
            icon={<TrashIcon className="h-5 w-5 text-black" />}
            onClick={() => handleDelete(row.original)}
          />
        </div>
      ),
    },
  ];

  // const data: Employee[] = [
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     position: "Software Engineer",
  //     department: "Engineering",
  //     email: "john.doe@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2022-01-15",
  //     salary: 90000,
  //     status: "active",
  //   },
  //   {
  //     id: "2",
  //     name: "Jane Smith",
  //     position: "Product Manager",
  //     department: "Product",
  //     email: "jane.smith@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2021-04-20",
  //     salary: 120000,
  //     status: "active",
  //   },
  //   {
  //     id: "3",
  //     name: "Emily Brown",
  //     position: "Designer",
  //     department: "Design",
  //     email: "emily.brown@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2023-06-10",
  //     salary: 70000,
  //     status: "inactive",
  //   },
  //   {
  //     id: "2",
  //     name: "Jane Smith",
  //     position: "Product Manager",
  //     department: "Product",
  //     email: "jane.smith@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2021-04-20",
  //     salary: 120000,
  //     status: "active",
  //   },
  //   {
  //     id: "3",
  //     name: "Emily Brown",
  //     position: "Designer",
  //     department: "Design",
  //     email: "emily.brown@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2023-06-10",
  //     salary: 70000,
  //     status: "inactive",
  //   }, {
  //     id: "2",
  //     name: "Jane Smith",
  //     position: "Product Manager",
  //     department: "Product",
  //     email: "jane.smith@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2021-04-20",
  //     salary: 120000,
  //     status: "active",
  //   },
  //   {
  //     id: "3",
  //     name: "Emily Brown",
  //     position: "Designer",
  //     department: "Design",
  //     email: "emily.brown@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2023-06-10",
  //     salary: 70000,
  //     status: "inactive",
  //   }, {
  //     id: "2",
  //     name: "Jane Smith",
  //     position: "Product Manager",
  //     department: "Product",
  //     email: "jane.smith@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2021-04-20",
  //     salary: 120000,
  //     status: "active",
  //   },
  //   {
  //     id: "3",
  //     name: "Emily Brown",
  //     position: "Designer",
  //     department: "Design",
  //     email: "emily.brown@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2023-06-10",
  //     salary: 70000,
  //     status: "inactive",
  //   }, {
  //     id: "2",
  //     name: "Jane Smith",
  //     position: "Product Manager",
  //     department: "Product",
  //     email: "jane.smith@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2021-04-20",
  //     salary: 120000,
  //     status: "active",
  //   },
  //   {
  //     id: "3",
  //     name: "Emily Brown",
  //     position: "Designer",
  //     department: "Design",
  //     email: "emily.brown@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2023-06-10",
  //     salary: 70000,
  //     status: "inactive",
  //   }, {
  //     id: "2",
  //     name: "Jane Smith",
  //     position: "Product Manager",
  //     department: "Product",
  //     email: "jane.smith@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2021-04-20",
  //     salary: 120000,
  //     status: "active",
  //   },
  //   {
  //     id: "3",
  //     name: "Emily Brown",
  //     position: "Designer",
  //     department: "Design",
  //     email: "emily.brown@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2023-06-10",
  //     salary: 70000,
  //     status: "inactive",
  //   }, {
  //     id: "2",
  //     name: "Jane Smith",
  //     position: "Product Manager",
  //     department: "Product",
  //     email: "jane.smith@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2021-04-20",
  //     salary: 120000,
  //     status: "active",
  //   },
  //   {
  //     id: "3",
  //     name: "Emily Brown",
  //     position: "Designer",
  //     department: "Design",
  //     email: "emily.brown@example.com",
  //     phoneNumber: "555-555-5555",
  //     hireDate: "2023-06-10",
  //     salary: 70000,
  //     status: "inactive",
  //   },
  // ];


  // const TableAction: React.FC = () => {
  //   return (
  //     <div className="flex justify-between">
  //       <div className="flex items-center space-x-4">
  //         <DropdownMenu>
  //           <DropdownMenuTrigger className="rounded-md p-2 px-4 border bg-white border-[#CBD2DC80]">
  //             Actions
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent>
  //             <DropdownMenuLabel>Options</DropdownMenuLabel>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>Export</DropdownMenuItem>
  //             <DropdownMenuItem>Delete</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //       <Button  onClick={() => handleAddEmployee()}>
  //         + Add Employee
  //       </Button>
  //     </div>
  //   );
  // };

  function handleView(row: Employee) {
    console.log("Viewing employee:", row);
  }

  function handleEdit(row: Employee) {
    console.log("Editing employee:", row);
  }
  function handleDelete(row: Employee) {
    console.log("Deleting employee:", row);
  }


  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    phoneNumber: "",
    email: "",
    hireDate: "",
    salary: "",
    status: "active",
  });

  const handleSubmit = () => {
    try {
      // Handle form submission and validation
      console.log("Employee data:", formData);
    } catch (error) {
      // Handle validation errors
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <>
      <SidebarLayout>
        <div className=" min-h-screen  w-full bg-stone-200">
        <Header title={'Employees'}/>
        //       <h1 className="text-2xl font-bold">Employee Pagess</h1>


          <div>

            <div className="flex space-x-4 ml-2">
              <button
                className="relative group p-2 text-gray-700 font-light"
                onClick={() => OnView()} // Corrected: Wrapped in an arrow function
              >
                <span className="relative z-10">View</span>
                <span className="absolute inset-x-0 top-0 h-0.5 bg-slate-400 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </button>
              {/* <button className="relative group p-2 text-gray-700 font-light">
                <span className="relative z-10">All</span>
                <span className="absolute inset-x-0 top-0 h-0.5 bg-slate-400 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </button> */}
              <button
                className="relative group p-2 text-gray-700 font-light"
                onClick={() => OnLeave()} // Corrected: Wrapped in an arrow function
              >
                <span className="relative z-10">Leave requests</span>
                <span className="absolute inset-x-0 top-0 h-0.5 bg-slate-400 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </button>
            </div>
            <EmployeeStats />
            <Dialog >

              <div className="flex justify-end mr-5 mt-5">
                <DialogTrigger className="bg-slate-100 w-20 h-8 rounded-md items-center">
                  + Add
                </DialogTrigger>
              </div>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <h1>Add a New Employee</h1>
                    <p>This will also be added to your employee database:</p>
                  </DialogTitle>
                  <DialogDescription>
                    <br />
                    {/* <div className="md:min-w-[60%]">
                      <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex flex-col w-full md:w-1/2">
                          <label htmlFor="name" className="mb-3">Name</label>
                          <Input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                          />
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                          <label htmlFor="position" className="mb-3">Position</label>
                          <Input
                            name="position"
                            placeholder="Position"
                            type="text"
                            value={formData.position}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex flex-col w-full md:w-1/2">
                          <label htmlFor="department" className="mb-3">Department</label>
                          <Input
                            name="department"
                            placeholder="Department"
                            type="text"
                            value={formData.department}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                          <label htmlFor="phoneNumber" className="mb-3">Phone Number</label>
                          <Input
                            name="phoneNumber"
                            placeholder="Phone Number"
                            type="text"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex flex-col w-full md:w-1/2">
                          <label htmlFor="email" className="mb-3">Email</label>
                          <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                          <label htmlFor="hireDate" className="mb-3">Hire Date</label>
                          <Input
                            name="hireDate"
                            placeholder="Hire Date"
                            type="date"
                            value={formData.hireDate}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex flex-col w-full md:w-1/2">
                          <label htmlFor="salary" className="mb-3">Salary</label>
                          <Input
                            name="salary"
                            placeholder="Salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col w-full md:w-1/2">
                          <label htmlFor="status" className="mb-3">Status</label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div> */}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="items-center justify-center flex">
                  <Button variant="outline" onClick={() => console.log("Cancel")}>
                    Cancel
                  </Button>
                  <Button
                    disabled={false}
                    variant="default"
                    onClick={handleSubmit}
                  >
                    Add Employee
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>



          <br />
          <div>

            {EmployeeList && <DataTable
              // tableAction={<TableAction />}
              columns={columns}
              data={[]}
            />}
            {LeaveForm && <LeaveRequestTable />}
          </div>
          <br />
        </div>
      </SidebarLayout>
    </>
  );
};

export default Homepage;
function handleEdit(row: any): void {
  throw new Error("Function not implemented.");
}

function handleDelete(original: Employee): void {
  throw new Error("Function not implemented.");
}

