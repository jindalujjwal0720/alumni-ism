import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';

const HomeScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Home" variant="large" />
      <ScreenContent>
        <h1>Home Screen</h1>
        <div className="flex flex-col space-y-4 min-h-[2000px] ">big box</div>
      </ScreenContent>
    </>
  );
};

export default HomeScreen;
