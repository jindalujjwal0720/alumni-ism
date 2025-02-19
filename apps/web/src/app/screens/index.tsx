import { NavigationProvider } from '@/components/standalone/navigation';
import {
  ScreenBottomNav,
  ScreenBottomNavItem,
  ScreenLayout,
} from '@/components/standalone/screen-layout';
import { Home, User } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './home';
import ProfileScreen from './profile';

export const AppScreens = () => {
  return (
    <NavigationProvider>
      <ScreenLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
        <ScreenBottomNav>
          <ScreenBottomNavItem
            title="Home"
            path="/"
            icon={<Home size={20} />}
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
