import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { RegisterResponse } from '@/features/auth/types/api/auth';
import RegisterForm from '@/features/standalone-auth/components/forms/register';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: RegisterResponse) => {
    // Redirect to login page
    navigate('/auth/login', {
      state: {
        message: `Account created for ${data.user.email}. Please verify your email to login.`,
        email: data.user.email,
      },
    });
  };

  return (
    <>
      <ScreenTitleBar title="Register" logo />
      <ScreenContent>
        <div className="p-4">
          <RegisterForm onSuccess={handleSuccess} />
        </div>
      </ScreenContent>
    </>
  );
};

export default RegisterScreen;
