import {
  TableView,
  TableViewCell,
  TableViewLoading,
} from '@/components/standalone/table-view';
import { useGetSearchSuggestionsQuery } from '../api/alumni';
import { AlumniSuggestionCard } from './alumni-suggestion-card';

export const Suggestions = () => {
  const { data: { suggestions } = {}, isLoading } =
    useGetSearchSuggestionsQuery();

  if (isLoading) {
    return <TableViewLoading />;
  }

  if (!suggestions) {
    return <TableViewLoading />;
  }

  return (
    <TableView title="Suggestions">
      {suggestions.map((suggestion) => (
        <TableViewCell
          key={suggestion._id}
          description={<AlumniSuggestionCard suggestion={suggestion} />}
        />
      ))}
    </TableView>
  );
};
