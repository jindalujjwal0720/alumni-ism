import { selectRole } from '@/features/auth/stores/auth';
import { useSelector } from 'react-redux';
import AlumniCardLanding from '../alumni/landing';

export const Home = () => {
  const role = useSelector(selectRole);

  if (role === 'office') {
    return <div>Office</div>;
  } else if (role === 'partner') {
    return <div>Partner</div>;
  }

  return <AlumniCardLanding />;
};
