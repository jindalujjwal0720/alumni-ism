import {
  ScreenContent,
  ScreenTitleBar,
  ScreenTopNav,
  ScreenTopNavItem,
} from '@/components/standalone/screen-layout';
import { Outlet } from 'react-router-dom';

export const DonationsScreenLayout = () => {
  return (
    <>
      <ScreenTitleBar title="Donations" logo>
        <ScreenTopNav>
          <ScreenTopNavItem title="Recognition Wall" path="/donations/wall" />
          <ScreenTopNavItem title="My Donations" path="/donations/mine" />
          <ScreenTopNavItem title="My Pledges" path="/donations/pledges" />
        </ScreenTopNav>
      </ScreenTitleBar>
      <ScreenContent className="bg-background">
        <Outlet />
      </ScreenContent>
    </>
  );
};
