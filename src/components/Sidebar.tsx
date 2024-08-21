
import React from 'react';
import Link from 'next/link'; // Use Link from 'next/link' for routing
import { useRouter } from 'next/router';
import { classNames } from '../utils/classNames'; // Utility function for dynamic class names

const sidebarItems = [
  { name: 'Employee', path: '/employee' },
  { name: 'Courses', path: '/courses' },
  { name: 'Customers', path: '/customers' },
  { name: 'Users', path: '/users' },
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="w-64 bg-gray-800 text-white">
      <ul className="space-y-2">
        {sidebarItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <a
                className={classNames(
                  'block p-4 hover:bg-gray-700',
                  router.pathname === item.path ? 'bg-gray-700' : ''
                )}
              >
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
