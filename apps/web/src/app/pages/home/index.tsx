import { selectRole } from '@/features/auth/stores/auth';
import { useSelector } from 'react-redux';
import AlumniCardLanding from '../alumni/landing';
import { AdminHome } from '../admin';
import { PartnerHome } from '../partner';

export const Home = () => {
  const role = useSelector(selectRole);

  if (role === 'admin') {
    return <AdminHome />;
  } else if (role === 'partner') {
    return <PartnerHome />;
  }

  return <AlumniCardLanding />;
};
