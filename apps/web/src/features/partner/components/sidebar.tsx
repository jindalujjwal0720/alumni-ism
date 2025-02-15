import { cn } from '@/utils/tw';
import { CreditCard, LayoutDashboard, PercentCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    link: '/partner',
  },
  {
    title: 'Offers',
    icon: PercentCircle,
    link: '/partner/offers',
  },
  {
    title: 'Validate card',
    icon: CreditCard,
    link: '/partner/validate',
  },
];

export const PartnerSidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <div className="text-lg font-medium p-4 text-primary">Partner</div>
      <div className="flex flex-col px-6">
        {sidebarItems.map((item) => (
          <Link
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
