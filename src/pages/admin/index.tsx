import React from 'react';
import SidebarLayout from '../../components/SidebarLayout';
import Header from '@/components/header';

const Adminpage: React.FC = () => {
  return (
    <SidebarLayout>
      <Header title={'Admin'}/>
      <h1 className="text-2xl font-bold">Admin Pagess</h1>
      {/* Page content here */}
    </SidebarLayout>
  );
};

export default Adminpage;