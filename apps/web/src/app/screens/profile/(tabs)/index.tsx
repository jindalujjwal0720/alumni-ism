import {
  ScreenContent,
  ScreenTitleBar,
  ScreenTopNav,
  ScreenTopNavItem,
} from '@/components/standalone/screen-layout';
import { Outlet } from 'react-router-dom';

export const ProfileScreenLayout = () => {
  return (
    <>
      <ScreenTitleBar title="Profile" logo>
        <ScreenTopNav>
          <ScreenTopNavItem title="General" path="/profile/general" />
          <ScreenTopNavItem title="Personal" path="/profile/personal" />
          <ScreenTopNavItem title="Contact" path="/profile/contact" />
          <ScreenTopNavItem title="Education" path="/profile/education" />
          <ScreenTopNavItem title="Professional" path="/profile/professional" />
          <ScreenTopNavItem title="Preferences" path="/profile/preferences" />
        </ScreenTopNav>
      </ScreenTitleBar>
      <ScreenContent className="bg-background">
        <Outlet />
      </ScreenContent>
    </>
  );
};
