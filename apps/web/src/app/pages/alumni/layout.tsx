import Navbar from '@/features/navbar/components/navbar';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const AlumniLayout = () => {
  const location = useLocation();
  const hideNavbar = useMemo(() => {
    // Hide the navbar on the Landing page as it has a different layout
    return location.pathname === '/';
  }, [location.pathname]);

  return (
    <div className="pb-16">
      {!hideNavbar && <Navbar variant="sticky" />}
      <Outlet />
    </div>
  );
};
