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
        <PublicProfile ucn="0100-0720-2025-1926" />
      </ScreenContent>
    </>
  );
};
