import { useReadMyAlumniDetailsQuery } from '@/features/standalone-profile/api/details';
import { PublicProfile } from '@/features/standalone-profile/components/public-profile';

export const GeneralProfileScreenContent = () => {
  const { data: { alumni } = {} } = useReadMyAlumniDetailsQuery();

  return (
    <div>
      <PublicProfile ucn={alumni?.ucn ?? ''} />
    </div>
  );
};
