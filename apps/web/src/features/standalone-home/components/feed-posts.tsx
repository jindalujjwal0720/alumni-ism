import { Show } from '@/components/show';
import { useListFeedPostsQuery } from '../api/posts';
import { Post } from './post';

export const FeedPosts = () => {
  const { data: { posts } = {}, isLoading } = useListFeedPostsQuery({
    limit: 10,
    page: 1,
  });

  return (
    <div className="space-y-3">
      {posts?.map((post) => <Post key={post._id} post={post} />)}
      <Show when={isLoading}>
        <p>Loading...</p>
      </Show>
    </div>
  );
};
