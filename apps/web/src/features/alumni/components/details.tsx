import { Card, CardContent } from '@/components/ui/card';
import { useReadAlumniPublicDataQuery } from '../api/alumni';
import { AlumniCard } from './alumni-card';
import { Label } from '@/components/ui/label';

export const AlumniPublicDetails = ({
  alumni: alumniId,
}: {
  alumni: string;
}) => {
  const { data: { alumni } = {}, isLoading } =
    useReadAlumniPublicDataQuery(alumniId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!alumni) {
    return <div>Alumni not found</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h3 className="text-lg font-medium">Alumni Public Details</h3>
        <p className="text-sm text-muted-foreground">
          View the public details of the alumni.
        </p>
      </div>
      <div className="w-full flex items-center justify-center">
        <AlumniCard
          name={alumni?.alias || 'Your Alias'}
          ucn={alumni?.ucn || 'xxxxxxxxxxxxxxxx'}
          expiry={alumni?.validity ?? '••/••'}
        />
      </div>
      <Card>
        <CardContent className="space-y-6">
          <h3 className="text-lg font-medium">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Name</Label>
              <p>{alumni.name}</p>
            </div>
            <div>
              <Label>Alias (aka)</Label>
              <p>{alumni.alias}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-6">
          <h3 className="text-lg font-medium">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Email</Label>
              <p>{alumni.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
