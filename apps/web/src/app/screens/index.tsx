import { NavigationProvider } from '@/components/standalone/navigation';
import {
  ScreenBottomNav,
  ScreenBottomNavItem,
  ScreenLayout,
} from '@/components/standalone/screen-layout';
import { Bell, Home, IndianRupee, User } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './home';
import ProfileScreen from './profile';
import { NotificationsPage } from './notifications';
import { DonationsPage } from './donations';

export const AppScreens = () => {
  return (
    <NavigationProvider>
      <ScreenLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/donations" element={<DonationsPage />} />
        </Routes>
        <ScreenBottomNav>
          <ScreenBottomNavItem
            title="Home"
            path="/"
            icon={<Home size={20} />}
          />
          <ScreenBottomNavItem
            title="Donations"
            path="/donations"
            icon={<IndianRupee size={20} />}
          />
          <ScreenBottomNavItem
            title="Notifications"
            path="/notifications"
            icon={<Bell size={20} />}
          />
          <ScreenBottomNavItem
            title="Profile"
            path="/profile"
            icon={<User size={20} />}
          />
        </ScreenBottomNav>
      </ScreenLayout>
    </NavigationProvider>
  );
};
