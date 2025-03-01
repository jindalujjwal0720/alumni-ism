import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { SearchInput } from '@/components/standalone/search-input';
import { Suggestions } from '@/features/standalone-search/components/suggestions';
import { SearchProvider } from '@/features/standalone-search/components/provider';

export const SearchScreen = () => {
  return (
    <SearchProvider>
      <ScreenTitleBar title="Search" logo>
        <div className="px-2 pb-2">
          <SearchInput />
        </div>
      </ScreenTitleBar>
      <ScreenContent>
        <div className="p-4">
          <Suggestions />
        </div>
      </ScreenContent>
    </SearchProvider>
  );
};
