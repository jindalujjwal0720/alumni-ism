import {
  ScreenContent,
  ScreenFloatingButton,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { Pencil } from 'lucide-react';

export const HomeScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Home" size="large" />
      <ScreenContent>
        <h1>Home Screen</h1>
        <div className="flex flex-col space-y-4 min-h-[2000px] ">big box</div>
        <ScreenFloatingButton className="p-4 size-14 rounded-full">
          <Pencil />
        </ScreenFloatingButton>
      </ScreenContent>
    </>
  );
};
