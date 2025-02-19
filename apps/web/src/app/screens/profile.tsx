import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';

const ProfileScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Profile" />
      <ScreenContent>
        <h1>Profile Screen</h1>
        <div className="flex flex-col space-y-4 min-h-[2000px] ">big box</div>
      </ScreenContent>
    </>
  );
};

export default ProfileScreen;
