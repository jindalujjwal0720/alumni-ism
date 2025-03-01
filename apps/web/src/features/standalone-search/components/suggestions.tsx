import {
  TableView,
  TableViewCell,
  TableViewLoading,
} from '@/components/standalone/table-view';
import { AlumniProfileCard } from './alumni-profile-card';
import { useGetSearchSuggestionsQuery } from '../api/alumni';

export const Suggestions = () => {
  const { data: { suggestions } = {}, isLoading } =
    useGetSearchSuggestionsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!suggestions) {
    return <TableViewLoading />;
  }

  return (
    <TableView title="Suggestions">
      <TableViewCell
        description={
          <AlumniProfileCard
            ucn="123456"
            name="Ujjwal Jindal"
            profilePicture="https://randomuser.me/api/portraits/men/42.jpg"
            description="Associate Member Technical Staff at Salesforce"
          />
        }
      />
      {suggestions.map((suggestion) => (
        <TableViewCell
          key={suggestion._id}
          description={
            <AlumniProfileCard
              ucn={suggestion.ucn}
              name={suggestion.name}
              profilePicture={suggestion.profilePicture}
              description={`${suggestion.designation} at ${suggestion.currentCompany}`}
            />
          }
        />
      ))}
    </TableView>
  );
};
