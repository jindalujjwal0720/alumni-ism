import { cn } from '@/utils/tw';
import { Link, useLocation } from 'react-router-dom';
import Profile from './profile';
import { Button, buttonVariants } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/features/auth/stores/auth';
import Logo from '@/components/logo';
import { useMemo, useState } from 'react';
import { Show } from '@/components/show';
import { useGetMeQuery } from '@/features/auth/api/auth';

interface NavbarProps {
  variant?: 'default' | 'sticky' | 'fixed';
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  drawer?: React.ReactNode;
}

const Navbar = ({
  variant = 'default',
  left,
  center,
  right,
  drawer,
}: NavbarProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: { user } = {} } = useGetMeQuery();
  const location = useLocation();
  const showAdminPanelButton = useMemo(() => {
    return (
      user?.roles.includes('admin') && !location.pathname.startsWith('/admin')
    );
  }, [location.pathname, user?.roles]);
  const showPartnerPanelButton = useMemo(() => {
    return (
      user?.roles.includes('partner') &&
      !location.pathname.startsWith('/partner')
    );
  }, [location.pathname, user?.roles]);
  // only show the auth/profile if the user is an admin or partner
  const showAuth = showAdminPanelButton || showPartnerPanelButton;

  return (
    <>
      <nav
        className={cn(
          'top-0 z-50 bg-card backdrop-blur-lg border-b border-muted w-full',
          variant === 'sticky' && 'sticky',
          variant === 'fixed' && 'fixed',
        )}
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/">
                <div className="flex items-center space-x-3">
                  <Logo className="size-8" />
                  <span className="text-lg font-medium">IIT(ISM) Alumni</span>
                </div>
              </Link>
              {left}
            </div>

            {center}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {right}

              {/* Admin Navigation */}
              {showAdminPanelButton && (
                <Link
                  to="/admin"
                  className={cn(
                    buttonVariants({
                      variant: 'outline',
                      size: 'sm',
                    }),
                  )}
                >
                  Admin Panel
                </Link>
              )}

              {/* Partner Navigation */}
              {showPartnerPanelButton && (
                <Link
                  to="/partner"
                  className={cn(
                    buttonVariants({
                      variant: 'outline',
                      size: 'sm',
                    }),
                  )}
                >
                  Partner Panel
                </Link>
              )}

              <Show when={showAuth}>
                {!isAuthenticated && (
                  <Link
                    to="/auth/login"
                    className={buttonVariants({ variant: 'default' })}
                  >
                    Login
                  </Link>
                )}
                <Profile />
              </Show>
            </div>

            {/* Mobile Navigation */}
            <Button
              title="Open Menu"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <Show when={showAuth}>
                <Profile popover={false} details={false} />
              </Show>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-[90%] max-w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Show when={showAuth}>
            <div className="flex items-center gap-4">
              {!isAuthenticated && (
                <Link
                  to="/auth/login"
                  className={buttonVariants({ variant: 'default' })}
                >
                  Login
                </Link>
              )}
              <Profile popover={false} />
            </div>
          </Show>
          <Button
            title="Close Menu"
            onClick={() => setIsDrawerOpen(false)}
            variant="ghost"
            size="icon"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        <div
          className="flex flex-col p-4 space-y-4"
          onClick={() => setIsDrawerOpen(false)}
        >
          <Link to="/" className="text-muted-foreground hover:text-primary">
            Home
          </Link>
          {drawer}
        </div>
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}
    </>
  );
};

export default Navbar;
