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
import { DonationsWallScreenContent } from './donations/(tabs)/donations-wall';
import { SearchScreen } from './search/search';
import { PersonalDetailsScreenContent } from './profile/(tabs)/personal';
import { EducationDetailsScreenContent } from './profile/(tabs)/education';
import { ProfessionalDetailsScreenContent } from './profile/(tabs)/professional';
import { ContactDetailsScreenContent } from './profile/(tabs)/contact';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/utils/tw';
import { TbCoinRupee } from 'react-icons/tb';
import { AlumniPublicDetailsScreen } from './search/alumni-public-details';
import { GeneralProfileScreenContent } from './profile/(tabs)/general';
import { DonationsScreenLayout } from './donations/(tabs)';
import { MyPledgesScreenContent } from './donations/(tabs)/my-pledges';
import { MyDonationsScreenContent } from './donations/(tabs)/my-donations';
import { DonateScreen } from './donations/donate';
import { PledgeScreen } from './donations/pledge';

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

          <Route path="/donations/*" element={<DonationsScreenLayout />}>
            <Route path="wall" element={<DonationsWallScreenContent />} />
            <Route path="mine" element={<MyDonationsScreenContent />} />
            <Route path="pledges" element={<MyPledgesScreenContent />} />
          </Route>
          <Route path="/donate" element={<DonateScreen />} />
          <Route path="/pledge" element={<PledgeScreen />} />

          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/profile/*" element={<ProfileScreenLayout />}>
            <Route path="general" element={<GeneralProfileScreenContent />} />
            <Route path="personal" element={<PersonalDetailsScreenContent />} />
            <Route path="contact" element={<ContactDetailsScreenContent />} />
            <Route
              path="education"
              element={<EducationDetailsScreenContent />}
            />
            <Route
              path="professional"
              element={<ProfessionalDetailsScreenContent />}
            />
          </Route>

          {/* Public routes: IMPORTANT: DO NOT REMOVE*/}
          <Route path="/p/*">
            <Route path="alumni/:ucn" element={<AlumniPublicDetailsScreen />} />
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
            icon={<Search size={21} />}
          />
          <ScreenBottomNavItem
            title="Donations"
            path="/donations/wall"
            icon={<TbCoinRupee size={22} />}
          />
          {/* <ScreenBottomNavItem
            title="Notifications"
            path="/notifications"
            icon={<Bell size={20} />}
          /> */}
          <ScreenBottomNavItem
            title="Profile"
            path="/profile/general"
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
