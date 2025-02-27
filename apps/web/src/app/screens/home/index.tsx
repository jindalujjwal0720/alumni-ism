import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { Outlet } from 'react-router-dom';

export const HomeScreenLayout = () => {
  return (
    <>
      <ScreenTitleBar title="Home" logo />
      <ScreenContent>
        <Outlet />
      </ScreenContent>
    </>
  );
};
