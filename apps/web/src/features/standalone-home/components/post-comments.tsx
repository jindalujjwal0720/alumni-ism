import { ClipText } from '@/components/clip-text';
import { Link } from '@/components/standalone/navigation';
import { ExtendedPostComment, useListPostCommentsQuery } from '../api/posts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { convertDateToReadable, convertDurationToReadable } from '@/utils/time';
import { TextMarkup } from '@/components/text-markup';
// import { Button } from '@/components/ui/button';
// import { MoreHorizontal } from 'lucide-react';

interface PostCommentProps {
  comment: ExtendedPostComment;
}

const getCommentTime = (createdAt: string | Date) => {
  const durationInSeconds = Math.abs(
    (new Date(createdAt).getTime() - new Date().getTime()) / 1000,
  );

  if (!durationInSeconds) return '';

  const TWO_WEEKS = 2 * 7 * 24 * 60 * 60;
  if (durationInSeconds > TWO_WEEKS) {
    return convertDateToReadable(createdAt);
  }
  return convertDurationToReadable(durationInSeconds) + ' ago';
};

export const PostComment = ({ comment }: PostCommentProps) => {
  return (
    <div className="py-2 space-y-3">
      <div className="pl-4 pr-3 flex items-center gap-4 justify-between">
        <Link to={`/p/alumni/${comment?.author.ucn}`} from="Post">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage
                src={comment?.author.profilePicture}
                alt={comment?.author.name}
              />
              <AvatarFallback>
                {comment?.author.name[0]}
                {comment?.author.name.split(' ')[1]
                  ? comment?.author?.name.split(' ')[1][0]
                  : ''}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <h2 className="font-medium text-sm">{comment?.author.name}</h2>
              <p className="text-muted-foreground text-xs">
                {comment?.author.designation} at {comment?.author.company}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex flex-end items-center">
          <span className="text-muted-foreground text-xs">
            {getCommentTime(comment?.createdAt)}
          </span>
          {/* <Button size="icon" variant="link">
            <MoreHorizontal size={18} />
          </Button> */}
        </div>
      </div>
      <ClipText lines={6} more className="px-4 text-sm pl-16">
        <TextMarkup>{comment?.body}</TextMarkup>
      </ClipText>
    </div>
  );
};

interface PostCommentsProps {
  post: string;
}

export const PostComments = ({ post }: PostCommentsProps) => {
  const { data: { comments } = {}, isLoading } = useListPostCommentsQuery(
    { postId: post },
    { skip: !post },
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-2">
      {comments?.map((comment) => (
        <PostComment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};
