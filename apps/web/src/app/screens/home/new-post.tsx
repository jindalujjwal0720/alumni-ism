import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { CreatePost } from '@/features/standalone-home/components/form/create-post';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const NewPostScreen = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/', { replace: true });
    toast.success('Post created successfully');
  };

  return (
    <>
      <ScreenTitleBar title="New Post" logo />
      <ScreenContent>
        <CreatePost onSuccess={handleSuccess} />
      </ScreenContent>
    </>
  );
};
