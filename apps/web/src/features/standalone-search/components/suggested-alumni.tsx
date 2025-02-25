import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { AlumniProfileCard } from './alumni-profile-card';

export const SuggestedAlumni = () => {
  return (
    <TableView title="Suggested">
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
      <TableViewCell
        description={
          <AlumniProfileCard
            ucn="123457"
            name="Aman Singh"
            profilePicture="https://randomuser.me/api/portraits/men/43.jpg"
            description="Software Engineer at Microsoft"
          />
        }
      />
      <TableViewCell
        description={
          <AlumniProfileCard
            ucn="123458"
            name="Sneha Agarwal"
            profilePicture="https://randomuser.me/api/portraits/women/42.jpg"
            description="Product Manager at Google"
          />
        }
      />
    </TableView>
  );
};
