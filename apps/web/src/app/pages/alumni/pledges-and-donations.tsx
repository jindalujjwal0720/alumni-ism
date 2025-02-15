import { MyDonationsList } from '@/features/alumni/components/pledges-and-donations/donations-list';
import { MyPledgesList } from '@/features/alumni/components/pledges-and-donations/pledges-list';

export const PledgesAndDonationsPage = () => {
  return (
    <div className="p-6 space-y-8">
      <MyDonationsList />
      <MyPledgesList />
    </div>
  );
};
