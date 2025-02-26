import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { DonateForm } from '@/features/standalone-donations/components/forms/donate';

export const DonateScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Donate" logo></ScreenTitleBar>
      <ScreenContent className="bg-background">
        <DonateForm />
      </ScreenContent>
    </>
  );
};
