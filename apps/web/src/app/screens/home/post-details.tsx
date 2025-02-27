import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { PostComments } from '@/features/standalone-home/components/post-comments';
import { PostDetails } from '@/features/standalone-home/components/post-details';

export const PostDetailsScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Post" logo />
      <ScreenContent>
        <PostDetails />
        <PostComments />
      </ScreenContent>
    </>
  );
};
