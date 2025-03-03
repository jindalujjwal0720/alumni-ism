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
import { ExtendedPost } from '../api/posts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { convertDateToReadable, convertDurationToReadable } from '@/utils/time';
import { PostVisibility } from '@/types/models/post';
import { Show } from '@/components/show';
import {
  linkProcessor,
  TextMarkup,
  TextProcessor,
} from '../../../components/text-markup';

const getPostTime = (createdAt: string | Date) => {
  const durationInSeconds = Math.abs(
    (new Date(createdAt).getTime() - new Date().getTime()) / 1000,
  );

  const TWO_WEEKS = 2 * 7 * 24 * 60 * 60;
  if (durationInSeconds > TWO_WEEKS) {
    return convertDateToReadable(createdAt);
  }
  return convertDurationToReadable(durationInSeconds) + ' ago';
};

export const Post = ({ post }: { post: ExtendedPost }) => {
  return (
    <div className="pt-4 flex flex-col bg-card rounded-lg">
      <div className="pl-4 pr-3 flex items-center gap-4 justify-between">
        <Link to={`/p/alumni/${post.author.ucn}`} from="Home">
          <div className="flex items-center gap-2">
            <Avatar className="size-12">
              <AvatarImage
                src={post.author.profilePicture}
                alt={post.author.name}
              />
              <AvatarFallback>
                {post.author.name[0]}
                {post.author.name.split(' ')[1]
                  ? post.author?.name.split(' ')[1][0]
                  : ''}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <h2 className="font-medium">{post.author.name}</h2>
              <p className="text-muted-foreground text-xs">
                {post?.author.designation} at {post.author.company}
              </p>
              <p className="text-muted-foreground text-xs flex gap-2 items-center mt-0.5">
                <span>{getPostTime(post.createdAt)}</span>
                <span> • </span>
                <Show when={post.visibility === PostVisibility.PUBLIC}>
                  <Earth size={13} />
                </Show>
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
        <ClipText lines={3} more className="px-4 text-sm space-y-3">
          <TextMarkup
            processors={[linkProcessor, createMentionProcessor(post.mentions)]}
          >
            {post.body}
          </TextMarkup>
        </ClipText>
        <div className="px-2">
          {/* Space for media carousel or grid */}
          {/* <Link to="/posts/123456" from="Home">
            <img
              src="https://media.licdn.com/dms/image/v2/D5610AQEWxz5hzzQdOw/image-shrink_800/B56ZVHEFD8GoAg-/0/1740654007144?e=1741262400&v=beta&t=0Ccf6R8yA_BrZ6316WiqfQtxSvUpjSdo8nbMydF6BOk"
              className="w-full max-h-[600px] rounded-lg object-cover"
              alt="Post"
            />
          </Link> */}
        </div>
        <div className="px-4 py-2">
          <div className="flex gap-6 items-center justify-between text-muted-foreground text-sm">
            <div className="flex gap-6 items-center">
              <span className="p-0 flex items-center gap-1">
                <Heart size={18} className={cn('fill-muted-foreground')} />
                <span>{post.analytics.likes}</span>
              </span>
              <span className="p-0 flex items-center gap-1">
                <MessageCircle size={18} />
                <span>{post.analytics.comments}</span>
              </span>
            </div>
            <span className="p-0 flex items-center gap-1">
              <Share2 size={18} />
            </span>
          </div>
        </div>
      </div>

      <Show when={post.latestComment}>
        <Link to={`/posts/${post._id}`} from="Home">
          <div className="m-3 mt-0 px-3 py-2 bg-muted/70 rounded-md">
            <div className="space-y-1">
              <ClipText lines={2} className="text-sm">
                <span className="font-medium">
                  {post.latestComment?.author}
                </span>{' '}
                <span className="text-muted-foreground">
                  {post.latestComment?.body}
                </span>
              </ClipText>
              <p className="text-muted-foreground text-sm">View all comments</p>
            </div>
          </div>
        </Link>
      </Show>
    </div>
  );
};

const createMentionProcessor = (
  mentions: Array<{ name: string; ucn: string }>,
): TextProcessor => ({
  pattern: /@(\w+)/g,
  component: (_, username) => {
    // partial match also
    const user = mentions.find((m) => m.name.startsWith(username));
    return user ? (
      <Link
        to={`/p/alumni/${user.ucn}`}
        from="Home"
        className="font-medium text-primary"
      >
        @{username}
      </Link>
    ) : (
      `@${username}`
    );
  },
});
