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