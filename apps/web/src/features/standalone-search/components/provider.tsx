import React, { PropsWithChildren } from 'react';

interface SearchContextValue {
  query: string;
  setQuery: (query: string) => void;
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

  const contextValue = React.useMemo(() => ({ query, setQuery }), [query]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
