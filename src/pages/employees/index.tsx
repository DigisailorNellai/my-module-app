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