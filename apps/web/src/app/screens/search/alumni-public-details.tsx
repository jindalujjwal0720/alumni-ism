import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { PublicProfile } from '@/features/standalone-profile/components/public-profile';
import { useParams } from 'react-router-dom';

export const AlumniPublicDetailsScreen = () => {
  const { ucn } = useParams();

  if (!ucn) {
    return <div className="text-center">Invalid UCN</div>;
  }

  return (
    <>
      <ScreenTitleBar title="Alumni" logo />
      <ScreenContent>
        <PublicProfile ucn={ucn} />
      </ScreenContent>
    </>
  );
};
