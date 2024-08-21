import React from 'react';
import SidebarLayout from '../../components/SidebarLayout';
import Header from '@/components/header';

const Users: React.FC = () => {
  return (
    <SidebarLayout>
      <Header title={'Users'}/>
      <h1 className="text-2xl font-bold">User Pagess</h1>
      {/* Page content here */}
    </SidebarLayout>
  );
};

export default Users;