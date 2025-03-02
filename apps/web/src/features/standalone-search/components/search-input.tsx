import { SearchInput } from '@/components/standalone/search-input';
import { useSearch } from './provider';

export const SearchInputBox = () => {
  const { query, setQuery } = useSearch();

  return (
    <SearchInput
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for alumni"
      containerClassName="flex-1 w-full"
    />
  );
};
