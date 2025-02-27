import { Link } from '@/components/standalone/navigation';
// import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tw';
import {
  Earth,
  Heart,
  MessageCircle,
  //   MoreHorizontal,
  Share2,
} from 'lucide-react';

export const PostDetails = () => {
  return (
    <div className="pt-4 flex flex-col bg-card rounded-lg">
      <div className="pl-4 pr-3 flex items-center gap-4 justify-between">
        <Link to="/p/alumni/123456" from="Post">
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

      <div className="pt-4 pb-2 space-y-3">
        <p className="px-4 text-sm">
          Everything health-related in the last decade felt like it was too
          early. This seems to be changing now, with health and longevity
          becoming mainstream in urban India. The timing might be right now for
          entrepreneurs to build something in health. Thoughts?
        </p>
        <div className="">
          <img
            src="https://media.licdn.com/dms/image/v2/D5610AQEWxz5hzzQdOw/image-shrink_800/B56ZVHEFD8GoAg-/0/1740654007144?e=1741262400&v=beta&t=0Ccf6R8yA_BrZ6316WiqfQtxSvUpjSdo8nbMydF6BOk"
            className="w-full object-cover"
            alt="Post"
          />
        </div>
        <div className="px-4 pt-1 pb-2">
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
    </div>
  );
};
