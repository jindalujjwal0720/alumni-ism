import { useParams } from 'react-router-dom';
import {
  useReadAlumniDataQuery,
  useVerifyAlumniDataMutation,
} from '../../api/alumni';
import KeyValueGrid, { FormatterFunction } from '@/components/key-value-grid';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errors';
import { Button } from '@/components/ui/button';
import { IAlumni } from '@/types/models/alumni';

const keyValueFormatter: FormatterFunction<IAlumni> = ({ key, row }) => {
  const updatesKey = key as keyof IAlumni['updates'];

  if (!row.updates) {
    return String(row[key] ?? 'N/A');
  }

  if (key === 'ucn') {
    return String(row[key] ?? 'Not assigned yet');
  }

  if (row[key] === row.updates?.[updatesKey]) {
    return String(row[key] ?? 'N/A');
  }

  return (
    <div className="space-x-1">
      <span className="text-red-500 line-through">
        {String(row[key] ?? 'N/A')}
      </span>
      <span className="text-green-600 bg-green-500/10">
        {String(row.updates?.[updatesKey] ?? 'N/A')}
      </span>
    </div>
  );
};

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
            formatter={keyValueFormatter}
            keys={[
              { key: 'ucn', label: 'UCN' },
              { key: 'name', label: 'Name' },
              { key: 'alias', label: 'Alias' },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Contact Information"
            data={alumni}
            formatter={keyValueFormatter}
            keys={[
              { key: 'phone', label: 'Phone' },
              { key: 'permanentAddress', label: 'Permanent Address' },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Academic Information"
            data={alumni}
            formatter={keyValueFormatter}
            keys={[
              { key: 'yearOfGraduation', label: 'Year of Graduation' },
              { key: 'branch', label: 'Branch' },
              { key: 'degree', label: 'Degree' },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Professional Information"
            data={alumni}
            formatter={keyValueFormatter}
            keys={[
              { key: 'company', label: 'Company' },
              { key: 'designation', label: 'Designation' },
              { key: 'location', label: 'Work Location' },
            ]}
          />
        </CardContent>
      </Card>
      <div className="flex gap-4">
        {alumni.updates && (
          <Button
            variant="default"
            onClick={handleVerifyAlumni}
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Alumni'}
          </Button>
        )}
      </div>
    </div>
  );
};
