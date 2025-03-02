import { Input } from '@/components/ui/input';
import useSearchParam from '@/hooks/useSearchParam';
import { SearchFilters, useSearch } from './provider';

export const SearchFilterInput = () => {
  const filterBy = useSearchParam('filter') as keyof SearchFilters | null;
  const { setFilter, filters } = useSearch();

  if (!filterBy) {
    return null;
  }

  return (
    <div>
      <Input
        placeholder={`Filter by ${filterBy}`}
        value={filters[filterBy]}
        onChange={(e) => setFilter(filterBy, e.target.value)}
        className="shadow-none focus-visible:ring-0"
      />
    </div>
  );
};
