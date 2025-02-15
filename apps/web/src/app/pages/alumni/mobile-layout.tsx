import { BottomNavigationTabs } from '@/components/bottom-tabs';
import Navbar from '@/features/navbar/components/navbar';
import { HomeIcon, IdCard, ReceiptIndianRupee, Settings } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const navigationTabs = [
  {
    id: 'home',
    icon: <HomeIcon />,
    label: 'Home',
    to: '/',
  },
  {
    id: 'pledges',
    icon: <ReceiptIndianRupee />,
    label: 'Donations',
    to: '/donations',
  },
  {
    id: 'details',
    icon: <IdCard />,
    label: 'Details',
    to: '/details',
  },
  {
    id: 'settings',
    icon: <Settings />,
    label: 'Settings',
    to: '/settings',
  },
];

export const AlumniMobileLayout = () => {
  return (
    <div className="pb-16">
      <Navbar variant="sticky" />
      <Outlet />
      <BottomNavigationTabs tabs={navigationTabs} />
    </div>
  );
};
