import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { PostComments } from '@/features/standalone-home/components/post-comments';
import { PostDetails } from '@/features/standalone-home/components/post-details';
import { useParams } from 'react-router-dom';

export const PostDetailsScreen = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <>
      <ScreenTitleBar title="Post" logo />
      <ScreenContent>
        <div className="pb-24">
          <PostDetails post={postId ?? ''} />
          <PostComments post={postId ?? ''} />
        </div>
      </ScreenContent>
    </>
  );
};
