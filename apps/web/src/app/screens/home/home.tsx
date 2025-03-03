import { Link } from '@/components/standalone/navigation';
import { ScreenFloatingButton } from '@/components/standalone/screen-layout';
import { FeedPosts } from '@/features/standalone-home/components/feed-posts';
import { Pencil } from 'lucide-react';

export const HomeScreenContent = () => {
  return (
    <>
      <div className="space-y-3 py-3">
        <FeedPosts />
      </div>
      <Link to="/posts/new" from="Home">
        <ScreenFloatingButton className="p-4 size-14 rounded-full">
          <Pencil />
        </ScreenFloatingButton>
      </Link>
    </>
  );
};
