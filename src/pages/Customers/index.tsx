import React from 'react';
import SidebarLayout from '../../components/SidebarLayout';
import Header from '@/components/header';

const Customerpage: React.FC = () => {
  return (
    <SidebarLayout>
      <Header title={'Customer'}/>
      <h1 className="text-2xl font-bold">customer Pagess</h1>
      {/* Page content here */}
    </SidebarLayout>
  );
};

export default Customerpage;