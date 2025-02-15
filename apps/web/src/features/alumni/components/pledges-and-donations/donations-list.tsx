import { DataTable } from '@/components/ui/data-table';
import { PaymentStatus } from '@/types/models/payment';
import { Link } from 'react-router-dom';
import { useGetMyDonationsQuery } from '../../api/alumni';
import { Button } from '@/components/ui/button';
import { PaymentDialog } from '../settings/payment-dialog';
import { useState } from 'react';

export const MyDonationsList = () => {
  const { data: { donations } = {} } = useGetMyDonationsQuery(undefined);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  return (
    <div>
      <PaymentDialog
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        onSuccess={() => setIsPaymentDialogOpen(false)}
      />
      <DataTable
        columns={[
          {
            header: 'ID',
            accessorKey: '_id',
            cell: ({ row }) => {
              const { _id } = row.original;
              return (
                <Link
                  to={`/alumni/payments/${_id}`}
                  className="hover:underline"
                >
                  {_id.substring(0, 8)}...
                </Link>
              );
            },
          },
          {
            header: 'Category',
            accessorKey: 'category',
          },
          {
            header: 'Amount (INR)',
            accessorKey: 'amountInINR',
          },
          {
            header: 'Payment Verification Link',
            accessorKey: 'paymentVerificationLink',
          },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => {
              const status = row.original.status;

              if (status === PaymentStatus.IN_CONSIDERATION) {
                return (
                  <span className="text-yellow-600">In Consideration</span>
                );
              }

              if (status === PaymentStatus.ACCEPTED) {
                return <span className="text-green-600">Accepted</span>;
              }

              if (status === PaymentStatus.REJECTED) {
                return <span className="text-red-600">Rejected</span>;
              }

              return <span>{status}</span>;
            },
          },
        ]}
        data={donations ?? []}
        title="My Donations"
        header={() => (
          <div className="flex items-center">
            <Button onClick={() => setIsPaymentDialogOpen(true)}>
              Donate now
            </Button>
          </div>
        )}
      />
    </div>
  );
};
