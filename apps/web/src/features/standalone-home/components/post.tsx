import { ClipText } from '@/components/clip-text';
import { Link } from '@/components/standalone/navigation';
// import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tw';
import {
  Earth,
  Heart,
  MessageCircle,
  // MoreHorizontal,
  Share2,
} from 'lucide-react';

export const Post = () => {
  return (
    <div className="pt-4 flex flex-col bg-card rounded-lg">
      <div className="pl-4 pr-3 flex items-center gap-4 justify-between">
        <Link to="/p/alumni/123456" from="Home">
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/42.jpg"
              className="size-12 rounded-full"
              alt="User"
            />
            <div className="ml-2">
              <h2 className="font-medium">Nikhil Kamath</h2>
              <p className="text-muted-foreground text-xs">
                Co-Founder at Zerodha
              </p>
              <p className="text-muted-foreground text-xs flex gap-2 items-center">
                <span>2 hours ago</span>
                <span> • </span>
                <Earth size={13} />
              </p>
            </div>
          </div>
        </Link>
        <div className="flex gap-2 flex-end">
          {/* <Button size="icon" variant="link">
            <MoreHorizontal size={18} />
          </Button> */}
        </div>
      </div>

      <div className="pt-4 pb-2 space-y-2">
        <ClipText lines={3} more className="px-4 text-sm">
          Everything health-related in the last decade felt like it was too
          early. This seems to be changing now, with health and longevity
          becoming mainstream in urban India. The timing might be right now for
          entrepreneurs to build something in health. Thoughts?
        </ClipText>
        <div className="px-2">
          <Link to="/posts/123456" from="Home">
            <img
              src="https://media.licdn.com/dms/image/v2/D5610AQEWxz5hzzQdOw/image-shrink_800/B56ZVHEFD8GoAg-/0/1740654007144?e=1741262400&v=beta&t=0Ccf6R8yA_BrZ6316WiqfQtxSvUpjSdo8nbMydF6BOk"
              className="w-full max-h-[600px] rounded-lg object-cover"
              alt="Post"
            />
          </Link>
        </div>
        <div className="px-4 py-2">
          <div className="flex gap-6 items-center justify-between text-muted-foreground text-sm">
            <div className="flex gap-6 items-center">
              <span className="p-0 flex items-center gap-1">
                <Heart size={18} className={cn('fill-muted-foreground')} />
                <span>18</span>
              </span>
              <span className="p-0 flex items-center gap-1">
                <MessageCircle size={18} />
                <span>7</span>
              </span>
            </div>
            <span className="p-0 flex items-center gap-1">
              <Share2 size={18} />
            </span>
          </div>
        </div>
      </div>

      <Link to="/posts/123456" from="Home">
        <div className="m-3 mt-0 px-3 py-2 bg-muted/70 rounded-md">
          <div className="space-y-1">
            <ClipText lines={2} className="text-sm">
              <span className="font-medium">Nilesh Mishra</span>{' '}
              <span className="text-muted-foreground">
                Everything health-related in the last decade felt like it was
                too early. This seems to be changing now, with health and
                longevity becoming mainstream in urban India. The timing might
                be right now for entrepreneurs to build something in health.
                Thoughts?
              </span>
            </ClipText>
            <p className="text-muted-foreground text-sm">View all 7 comments</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
