import { Link } from '@/components/standalone/navigation';
import { ScreenFloatingButton } from '@/components/standalone/screen-layout';
import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { AlumniDonationCard } from '@/features/standalone-donations/components/alumni-donation-card';
import { Plus } from 'lucide-react';

export const MyPledgesScreenContent = () => {
  return (
    <>
      <div className="p-4">
        <TableView title="Pledges">
          <TableViewCell
            description={
              <AlumniDonationCard
                ucn="123456"
                name="Ujjwal Jindal"
                profilePicture="https://randomuser.me/api/portraits/men/42.jpg"
                description="Associate Member Technical Staff at Salesforce"
                amountInINR={100000}
              />
            }
          />
          <TableViewCell
            description={
              <AlumniDonationCard
                ucn="123457"
                name="Aman Singh"
                profilePicture="https://randomuser.me/api/portraits/men/43.jpg"
                description="Software Engineer at Microsoft"
                amountInINR={50000}
              />
            }
          />
          <TableViewCell
            description={
              <AlumniDonationCard
                ucn="123458"
                name="Sneha Agarwal"
                profilePicture="https://randomuser.me/api/portraits/women/42.jpg"
                description="Product Manager at Google"
                amountInINR={25000}
              />
            }
          />
        </TableView>
      </div>
      <ScreenFloatingButton className="p-4 size-14 rounded-full">
        <Link to="/pledge" from="Donations">
          <Plus />
        </Link>
      </ScreenFloatingButton>
    </>
  );
};
