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
          <ScreenTopNavItem title="Personal" path="/profile/personal" />
          <ScreenTopNavItem title="Academic" path="/profile/academic" />
          <ScreenTopNavItem title="Professional" path="/profile/professional" />
          <ScreenTopNavItem title="Preferences" path="/profile/preferences" />
        </ScreenTopNav>
      </ScreenTitleBar>
      <ScreenContent className="bg-card">
        <Outlet />
      </ScreenContent>
    </>
  );
};
