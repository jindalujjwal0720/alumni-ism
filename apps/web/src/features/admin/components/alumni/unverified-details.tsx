import { useParams } from 'react-router-dom';
import {
  useReadAlumniDataQuery,
  useVerifyAlumniDataMutation,
} from '../../api/alumni';
import KeyValueGrid from '@/components/key-value-grid';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errors';
import { Button } from '@/components/ui/button';

export const UnverifiedAlumniDetails = () => {
  const { id } = useParams();
  const { data: { alumni } = {}, isLoading: isAlumniLoading } =
    useReadAlumniDataQuery(id ?? '', {
      skip: !id,
    });
  const [verifyAlumni, { isLoading: isVerifying }] =
    useVerifyAlumniDataMutation();

  const handleVerifyAlumni = async () => {
    try {
      await verifyAlumni(id).unwrap();
      toast.success('Alumni verified successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isAlumniLoading) {
    return <div>Loading...</div>;
  }

  if (!alumni) {
    return <div>Alumni not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-medium">Alumni Details</h1>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Personal Information"
            data={alumni}
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
      <div className="flex gap-4">
        <Button
          variant="default"
          onClick={handleVerifyAlumni}
          disabled={isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify Alumni'}
        </Button>
      </div>
    </div>
  );
};
