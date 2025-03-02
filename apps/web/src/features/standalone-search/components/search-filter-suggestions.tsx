import useSearchParam from '@/hooks/useSearchParam';
import { useGetSearchFilterSuggestionsQuery } from '../api/alumni';
import { Chip } from '@/components/standalone/chip';
import { cn } from '@/utils/tw';
import { SearchFilters, useSearch } from './provider';

export const SearchFilterSuggestions = () => {
  const filterBy = useSearchParam('filter') as keyof SearchFilters | null;
  const { filters, setFilter } = useSearch();
  const { data: { suggestions } = {} } = useGetSearchFilterSuggestionsQuery(
    { filterType: filterBy ?? '' },
    { skip: !filterBy },
  );

  if (!filterBy) {
    return null;
  }

  const handleChipSelect = (value: string) => {
    setFilter(filterBy, value);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions?.map((suggestion) => (
        <Chip
          key={suggestion.value}
          className={cn(
            filters[filterBy] === suggestion.value &&
              'border-primary/20 text-primary bg-primary/10',
          )}
          onClick={() => handleChipSelect(suggestion.value)}
        >
          <span>{suggestion.value}</span>
          <span className="text-xs ml-2">{suggestion.count}</span>
        </Chip>
      ))}
    </div>
  );
};
