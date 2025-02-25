import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { PublicProfile } from '@/features/standalone-profile/components/public-profile';

export const AlumniPublicDetailsScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Ujjwal Jindal" logo />
      <ScreenContent>
        <PublicProfile />
      </ScreenContent>
    </>
  );
};
