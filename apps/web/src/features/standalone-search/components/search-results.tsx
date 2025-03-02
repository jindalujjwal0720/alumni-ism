import {
  TableView,
  TableViewCell,
  TableViewLoading,
} from '@/components/standalone/table-view';
import { AlumniSuggestionCard } from './alumni-suggestion-card';
import { useSearch } from './provider';
import { Show } from '@/components/show';
import { Suggestions } from './suggestions';

export const SearchResults = () => {
  const { results, isLoading } = useSearch();

  if (isLoading) {
    return <TableViewLoading />;
  }

  if (!results) {
    return <Suggestions />;
  }

  return (
    <TableView title="Search results">
      {results.map((suggestion) => (
        <TableViewCell
          key={suggestion._id}
          description={<AlumniSuggestionCard suggestion={suggestion} />}
        />
      ))}
      <Show when={results.length === 0}>
        <TableViewCell name="No results found" />
      </Show>
    </TableView>
  );
};
