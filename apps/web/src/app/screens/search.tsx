import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { SearchInput } from '@/components/standalone/search-input';

export const SearchScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Search" size="large" logo>
        <div className="px-2 pb-2">
          <SearchInput />
        </div>
      </ScreenTitleBar>
      <ScreenContent></ScreenContent>
    </>
  );
};
