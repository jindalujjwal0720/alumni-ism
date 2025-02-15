import { DataTable } from '@/components/ui/data-table';
import { useGetMyPledgesQuery } from '../../api/alumni';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { PledgeDialog } from './pledge-dialog';

export const MyPledgesList = () => {
  const { data: { pledges } = {} } = useGetMyPledgesQuery(undefined);
  const [isPledgeDialogOpen, setIsPledgeDialogOpen] = useState(false);

  return (
    <div>
      <PledgeDialog
        open={isPledgeDialogOpen}
        onOpenChange={setIsPledgeDialogOpen}
        onSuccess={() => setIsPledgeDialogOpen(false)}
      />

      <DataTable
        columns={[
          {
            header: 'Category',
            accessorKey: 'category',
          },
          {
            header: 'Amount (INR)',
            accessorKey: 'amountInINR',
          },
          {
            header: 'Amount (in words)',
            accessorKey: 'amountInWords',
          },
        ]}
        data={pledges ?? []}
        title="My Pledges"
        header={() => (
          <div className="flex items-center">
            <Button onClick={() => setIsPledgeDialogOpen(true)}>
              Take a Pledge
            </Button>
          </div>
        )}
      />
    </div>
  );
};
