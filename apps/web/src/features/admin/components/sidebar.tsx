import { cn } from '@/utils/tw';
import {
  Building,
  LayoutDashboard,
  ReceiptIndianRupee,
  User2,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    link: '/admin',
  },
  {
    title: 'Verifications',
    icon: User2,
    link: '/admin/alumni/unverified',
  },
  {
    title: 'Rejected Alumni',
    icon: User2,
    link: '/admin/alumni/rejected',
  },
  {
    title: 'Payments',
    icon: ReceiptIndianRupee,
    link: '/admin/alumni/payments',
  },
  {
    title: 'Partners',
    icon: Building,
    link: '/admin/partners',
  },
  {
    title: 'Admins',
    icon: User2,
    link: '/admin/admins',
  },
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <div className="text-lg font-medium p-4 text-primary">Admin</div>
      <div className="flex flex-col px-6">
        {sidebarItems.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={cn(
              'flex items-center p-2 hover:bg-muted/50 rounded-md',
              location.pathname === item.link ? 'bg-muted hover:bg-muted' : '',
            )}
          >
            <item.icon className="size-4 mr-2" />
            <div className="text-sm">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
