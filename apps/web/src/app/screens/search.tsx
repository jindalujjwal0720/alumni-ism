import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { PublicProfile } from '@/features/standalone-profile/components/public-profile';

export const SearchScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Search" />
      <ScreenContent>
        <PublicProfile />
      </ScreenContent>
    </>
  );
};
