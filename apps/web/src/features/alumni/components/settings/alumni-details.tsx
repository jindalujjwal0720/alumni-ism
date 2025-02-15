import { useGetMyAlumniDataQuery } from '../../api/alumni';
import { AlumniCard } from '../alumni-card';
import { AlumniDetailsForm } from './forms/alumni-details-form';

export const AlumniDetails = () => {
  const { data: { alumni } = {} } = useGetMyAlumniDataQuery(undefined);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h3 className="text-lg font-medium">Alumni Details</h3>
        <p className="text-sm text-muted-foreground">
          Update your alumni details here and request verification.
        </p>
      </div>
      <div className="w-full flex items-center justify-center">
        <AlumniCard
          name={alumni?.alias || 'Your Alias'}
          ucn={alumni?.ucn || 'xxxxxxxxxxxxxxxx'}
          expiry={alumni?.validity ?? '••/••'}
        />
      </div>
      <AlumniDetailsForm />
    </div>
  );
};
