import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterScreen from './register';
import useQueryParam from '@/hooks/useQueryParam';
import useLocationState from '@/hooks/useLocationState';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/features/auth/stores/auth';

const Auth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const action = useQueryParam('action');
  const from = useLocationState('from');

  if (isAuthenticated && action !== 'new') {
    return <Navigate to={from || '/'} />;
  }

  return (
    <Routes>
      <Route path="/login" element={<RegisterScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Routes>
  );
};

export default Auth;
