import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { PledgeForm } from '@/features/standalone-donations/components/forms/pledge';

export const PledgeScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Pledge" logo></ScreenTitleBar>
      <ScreenContent className="bg-background">
        <PledgeForm />
      </ScreenContent>
    </>
  );
};
