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
import { SearchScreen } from './search/search';
import { PersonalDetailsScreen } from './profile/(tabs)/personal';
import { EducationDetailsScreen } from './profile/(tabs)/education';
import { ProfessionalDetailsScreen } from './profile/(tabs)/professional';
import { ContactDetailsScreen } from './profile/(tabs)/contact';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/utils/tw';
import { TbCoinRupee } from 'react-icons/tb';
import { AlumniPublicDetailsScreen } from './search/alumni-public-details';

export const AppScreens = () => {
  return (
    <NavigationProvider>
      <ScreenLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search/*">
            <Route path="*" element={<SearchScreen />} />
            <Route path="alumni/:ucn" element={<AlumniPublicDetailsScreen />} />
          </Route>
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
                className={cn(
                  'size-5 ring-2',
                  selected
                    ? 'ring-primary'
                    : 'ring-offset-0 ring-muted-foreground',
                )}
              >
                <AvatarImage
                  src="https://randomuser.me/api/portraits/men/42.jpg"
                  alt="User"
                />
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
