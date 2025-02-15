import KeyValueGrid from '@/components/key-value-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useAcceptAlumniPaymentMutation,
  useReadAlumniPaymentDataQuery,
} from '@/features/admin/api/alumni';
import { PaymentStatus } from '@/types/models/payment';
import { getErrorMessage } from '@/utils/errors';
import { convertDateTimeToReadable } from '@/utils/time';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const AlumniPaymentDetails = () => {
  const { id } = useParams();
  const { data: { payment, alumni } = {}, isLoading } =
    useReadAlumniPaymentDataQuery(id ?? '', {
      skip: !id,
    });
  const [acceptPayment, { isLoading: isAccepting }] =
    useAcceptAlumniPaymentMutation();
  const [increaseValidityBy, setIncreaseValidityBy] = useState(0);

  const handleAcceptPayment = async () => {
    try {
      console.log('acceptPayment', id);
      await acceptPayment({
        id,
        body: {
          increaseValidityBy: increaseValidityBy || 0,
        },
      }).unwrap();
      toast.success('Payment accepted successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!payment || !alumni) {
    return <div>Payment or Alumni not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-medium">Payment Details</h1>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Payment Information"
            data={payment || {}}
            keys={[
              { key: 'amountInINR', label: 'Amount' },
              { key: 'category', label: 'Category' },
              {
                key: 'status',
                label: 'Status',
                formatter: (status, _) => {
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

                  return <span>{String(status)}</span>;
                },
              },
              {
                key: 'createdAt',
                label: 'Created At',
                formatter: (date, _) =>
                  convertDateTimeToReadable(date as string),
              },
              {
                key: 'updatedAt',
                label: 'Updated At',
                formatter: (date, _) =>
                  convertDateTimeToReadable(date as string),
              },
              {
                key: 'paymentVerificationLink',
                label: 'Payment Verification Link',
                formatter: (link, _) => (
                  <Link
                    to={link as string}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {link as string}
                  </Link>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Alumni Information"
            data={alumni || {}}
            keys={[
              { key: 'ucn', label: 'UCN' },
              { key: 'name', label: 'Name' },
              { key: 'alias', label: 'Alias' },
              { key: 'yearOfGraduation', label: 'Year of Graduation' },
              { key: 'phone', label: 'Phone' },
            ]}
          />
        </CardContent>
      </Card>
      {payment.status === PaymentStatus.IN_CONSIDERATION && (
        <div className="flex gap-4 items-end">
          <div>
            <Label>Increase validity by (in years)</Label>
            <Input
              type="number"
              min={0}
              placeholder="Increase validity by"
              value={increaseValidityBy}
              onChange={(e) => setIncreaseValidityBy(Number(e.target.value))}
              className="w-max"
            />
          </div>
          <Button
            disabled={isAccepting}
            onClick={handleAcceptPayment}
            variant="default"
          >
            {isAccepting
              ? 'Accepting...'
              : `Accept Payment (+${increaseValidityBy} years)`}
          </Button>
        </div>
      )}
    </div>
  );
};
