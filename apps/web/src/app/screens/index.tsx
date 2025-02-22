import { NavigationProvider } from '@/components/standalone/navigation';
import {
  ScreenBottomNav,
  ScreenBottomNavItem,
  ScreenLayout,
} from '@/components/standalone/screen-layout';
import { Bell, Home, IndianRupee, Search, User } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from './home';
import { ProfileScreenLayout } from './profile';
import { NotificationsScreen } from './notifications';
import { DonationsScreen } from './donations';
import { SearchScreen } from './search';
import { PersonalDetailsScreen } from './profile/personal';
import { EducationDetailsScreen } from './profile/education';
import { ProfessionalDetailsScreen } from './profile/professional';

export const AppScreens = () => {
  return (
    <NavigationProvider>
      <ScreenLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/donations" element={<DonationsScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/profile/*" element={<ProfileScreenLayout />}>
            <Route path="personal" element={<PersonalDetailsScreen />} />
            <Route path="education" element={<EducationDetailsScreen />} />
            <Route
              path="professional"
              element={<ProfessionalDetailsScreen />}
            />
          </Route>
        </Routes>
        <ScreenBottomNav>
          <ScreenBottomNavItem
            title="Home"
            path="/"
            icon={<Home size={20} />}
          />
          <ScreenBottomNavItem
            title="Search"
            path="/search"
            icon={<Search size={20} />}
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
            path="/profile/personal"
            base="/profile"
            icon={<User size={20} />}
          />
        </ScreenBottomNav>
      </ScreenLayout>
    </NavigationProvider>
  );
};
