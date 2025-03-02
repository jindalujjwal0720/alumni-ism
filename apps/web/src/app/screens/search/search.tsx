import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import useSearchParamState from '@/hooks/useSearchParamState';
import { Show } from '@/components/show';
import { SearchFilterInput } from '@/features/standalone-search/components/search-filter-input';
import { SearchFilterSuggestions } from '@/features/standalone-search/components/search-filter-suggestions';
import { useStandaloneNavigation } from '@/components/standalone/navigation';
import {
  SearchFilterIcon,
  SearchFilters,
} from '@/features/standalone-search/components/search-filters';
import { SearchResults } from '@/features/standalone-search/components/search-results';
import { SearchInputBox } from '@/features/standalone-search/components/search-input';

export const SearchScreen = () => {
  const [filter, setFilter, clearFilter] = useSearchParamState('filter');
  const { goBack } = useStandaloneNavigation();

  return (
    <>
      <ScreenTitleBar title="Search" logo>
        <div className="px-2 pb-2 flex gap-2">
          <SearchInputBox />
          <Drawer
            open={!!filter}
            onOpenChange={(open) => {
              if (!open) {
                clearFilter();
              }
              if (open) {
                setFilter('all');
              }
            }}
          >
            <DrawerTrigger>
              <SearchFilterIcon />
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4 pb-24">
                <Show when={filter === 'all'}>
                  <SearchFilters />
                </Show>
                <Show when={filter !== 'all'}>
                  <div className="mb-24 space-y-4">
                    <DrawerTitle>
                      <Button
                        variant="link"
                        className="p-0 h-max hover:no-underline hover:bg-muted/10 text-sm flex items-center"
                        onClick={() => goBack('/search')}
                      >
                        <ChevronLeft size={24} />
                        <span>All Filters</span>
                      </Button>
                    </DrawerTitle>
                    <SearchFilterInput />
                    <SearchFilterSuggestions />
                  </div>
                </Show>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </ScreenTitleBar>
      <ScreenContent>
        <div className="p-4">
          <SearchResults />
        </div>
      </ScreenContent>
    </>
  );
};
