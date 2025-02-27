import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { SearchInput } from '@/components/standalone/search-input';
import { SuggestedAlumni } from '@/features/standalone-search/components/suggested-alumni';
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
          <SuggestedAlumni />
        </div>
      </ScreenContent>
    </SearchProvider>
  );
};
