import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { IAlumniSuggestion, useGetSearchResultsMutation } from '../api/alumni';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

export type SearchFilters = {
  branch: string;
  degree: string;
  year: string;
  company: string;
  designation: string;
  location: string;
};

interface SearchContextValue {
  query: string;
  setQuery: (query: string) => void;

  filters: SearchFilters;
  setFilter: (filter: keyof SearchFilters, value: string) => void;
  clearFilters: () => void;

  results: Omit<IAlumniSuggestion, 'mutualFollowers' | 'score'>[] | undefined;
  isLoading: boolean;
}

const SearchContext = React.createContext<SearchContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [query, setQuery] = React.useState('');
  const [filters, setFilters] = React.useState<SearchFilters>({
    branch: '',
    degree: '',
    year: '',

    company: '',
    designation: '',

    location: '',
  });
  const [search, { data, isLoading }] = useGetSearchResultsMutation();
  const debouncedSearch = useDebouncedCallback(search, 1000);

  useEffect(() => {
    if (!query) return;
    const appliedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value),
    );
    debouncedSearch({ query, filters: appliedFilters });
  }, [query, filters, debouncedSearch]);

  const setFilter = useCallback(
    (filter: keyof SearchFilters, value: string) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filter]: value,
      }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({
      branch: '',
      degree: '',
      year: '',
      company: '',
      designation: '',
      location: '',
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({
      query,
      setQuery,

      filters,
      setFilter,
      clearFilters,

      results: data?.results,
      isLoading,
    }),
    [query, filters, setFilter, clearFilters, data?.results, isLoading],
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
