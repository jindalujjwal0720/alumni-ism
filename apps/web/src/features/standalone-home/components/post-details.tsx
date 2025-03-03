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
import { useReadPostQuery } from '../api/posts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { convertDateTimeToReadable } from '@/utils/time';
import { Show } from '@/components/show';
import { PostVisibility } from '@/types/models/post';
import {
  linkProcessor,
  TextMarkup,
  TextProcessor,
} from '../../../components/text-markup';

export const PostDetails = ({ post: postId }: { post: string }) => {
  const { data: { post } = {}, isLoading } = useReadPostQuery(postId, {
    skip: !postId,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="pt-4 flex flex-col bg-card rounded-lg">
      <div className="pl-4 pr-3 flex items-center gap-4 justify-between">
        <Link to={`/p/alumni/${post.author.ucn}`} from="Post">
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
                <span>{convertDateTimeToReadable(post.createdAt)}</span>
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

      <div className="pt-4 pb-2 space-y-3">
        <p className="px-4 text-sm space-y-3">
          <TextMarkup
            processors={[linkProcessor, createMentionProcessor(post.mentions)]}
          >
            {post.body}
          </TextMarkup>
        </p>
        <div className="">
          {/* Space for media carousel or grid */}
          {/* <img
            src="https://media.licdn.com/dms/image/v2/D5610AQEWxz5hzzQdOw/image-shrink_800/B56ZVHEFD8GoAg-/0/1740654007144?e=1741262400&v=beta&t=0Ccf6R8yA_BrZ6316WiqfQtxSvUpjSdo8nbMydF6BOk"
            className="w-full object-cover"
            alt="Post"
          /> */}
        </div>
        <div className="px-4 pt-1 pb-2">
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
