import { ClipText } from '@/components/clip-text';
import { Link } from '@/components/standalone/navigation';
// import { Button } from '@/components/ui/button';
// import { MoreHorizontal } from 'lucide-react';

export const PostComment = () => {
  return (
    <div className="py-2 space-y-3">
      <div className="pl-4 pr-3 flex items-center gap-4 justify-between">
        <Link to="/p/alumni/123456" from="Post">
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/42.jpg"
              className="size-8 rounded-full"
              alt="User"
            />
            <div className="ml-2">
              <h2 className="font-medium text-sm">Nikhil Kamath</h2>
              <p className="text-muted-foreground text-xs">
                Co-Founder at Zerodha
              </p>
            </div>
          </div>
        </Link>
        <div className="flex flex-end items-center">
          <span className="text-muted-foreground text-xs">2h</span>
          {/* <Button size="icon" variant="link">
            <MoreHorizontal size={18} />
          </Button> */}
        </div>
      </div>
      <ClipText lines={6} more className="px-4 text-sm pl-16">
        Everything health-related in the last decade felt like it was too early.
        This seems to be changing now, with health and longevity becoming
        mainstream in urban India. The timing might be right now for
        entrepreneurs to build something in health. Thoughts?
      </ClipText>
    </div>
  );
};

export const PostComments = () => {
  return (
    <div className="py-2">
      <PostComment />
      <PostComment />
      <PostComment />
    </div>
  );
};
