import { NavigationProvider } from '@/components/standalone/navigation';
import {
  ScreenBottomNav,
  ScreenBottomNavItem,
  ScreenLayout,
} from '@/components/standalone/screen-layout';
import { Home, Search } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from './home';
import { ProfileScreenLayout } from './profile/(tabs)';
import { NotificationsScreen } from './notifications';
import { DonationsScreen } from './donations';
import { SearchScreen } from './search';
import { PersonalDetailsScreen } from './profile/(tabs)/personal';
import { EducationDetailsScreen } from './profile/(tabs)/education';
import { ProfessionalDetailsScreen } from './profile/(tabs)/professional';
import { ContactDetailsScreen } from './profile/(tabs)/contact';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/utils/tw';
import { TbCoinRupee } from 'react-icons/tb';
import { PublicProfileScreen } from './profile/public';

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
            <Route path="contact" element={<ContactDetailsScreen />} />
            <Route path="education" element={<EducationDetailsScreen />} />
            <Route
              path="professional"
              element={<ProfessionalDetailsScreen />}
            />

            <Route path="public/:ucn" element={<PublicProfileScreen />} />
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
            icon={<TbCoinRupee size={22} />}
          />
          {/* <ScreenBottomNavItem
            title="Notifications"
            path="/notifications"
            icon={<Bell size={20} />}
          /> */}
          <ScreenBottomNavItem
            title="Profile"
            path="/profile/personal"
            base="/profile"
            icon={({ selected }) => (
              <Avatar
                className={cn('size-5 m-0', selected && 'ring-2 ring-primary')}
              >
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="text-sm bg-muted-foreground text-background">
                  U
                </AvatarFallback>
              </Avatar>
            )}
          />
        </ScreenBottomNav>
      </ScreenLayout>
    </NavigationProvider>
  );
};
