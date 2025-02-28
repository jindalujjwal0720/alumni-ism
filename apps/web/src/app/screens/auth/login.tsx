import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { setAccessToken, setRole } from '@/features/auth/stores/auth';
import { LoginResponse } from '@/features/auth/types/api/auth';
import LoginForm from '@/features/standalone-auth/components/forms/login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccessfulLogin = (data: LoginResponse) => {
    if ('requires2FA' in data) {
      navigate(`/auth/2fa?token=${data.token}`);
    } else {
      dispatch(setAccessToken(data.token));
      dispatch(setRole(data.user.roles[0]));
      // navigate to the init screen
      navigate('/init');
    }
  };

  return (
    <>
      <ScreenTitleBar title="Login" logo />
      <ScreenContent>
        <div className="p-4">
          <LoginForm onSuccess={handleSuccessfulLogin} />
        </div>
      </ScreenContent>
    </>
  );
};

export default LoginScreen;
