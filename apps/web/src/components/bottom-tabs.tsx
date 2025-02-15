import { cn } from '@/utils/tw';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Tab {
  id: string;
  icon: React.ReactNode;
  label?: string;
  to: string;
}

export const BottomNavigationTabs = ({ tabs }: { tabs: Tab[] }) => {
  const location = useLocation();
  const activeTabId = useMemo(() => {
    const tab = tabs.find((tab) => location.pathname === tab.to);
    return tab?.id;
  }, [location.pathname, tabs]);

  return (
    <nav className="fixed bottom-0 z-40 w-full bg-background/90 backdrop-blur-lg border-t border-muted text-muted-foreground">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-1',
                tab.id === activeTabId && 'text-primary',
              )}
            >
              {tab.icon}
              {tab.label && <span className="text-xs">{tab.label}</span>}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
