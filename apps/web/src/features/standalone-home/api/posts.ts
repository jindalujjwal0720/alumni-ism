import { api } from '@/stores/api';
import { IPost } from '@/types/models/post';

export interface ExtendedPost extends IPost {
  author: {
    ucn: string;
    name: string;
    profilePicture: string;
    company: string;
    designation: string;
  };
  latestComment?: {
    body: string;
    author: string;
  };
  analytics: {
    likes: number;
    comments: number;
  };
}

const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<void, Partial<IPost>>({
      query: (data) => ({
        url: '/v1/posts',
        method: 'POST',
        body: data,
      }),
    }),
    listFeedPosts: build.query<
      { posts: ExtendedPost[] },
      { limit?: number; page?: number }
    >({
      query: ({ limit = 10, page = 1 }) => ({
        url: `/v1/posts/feed?limit=${limit}&page=${page}`,
      }),
      // merge: (cache, data) => ({
      //   posts: [...(cache.posts || []), ...data.posts],
      // }),
    }),
    readPost: build.query<{ post: ExtendedPost }, string>({
      query: (postId) => `/v1/posts/${postId}`,
    }),
    listPostComments: build.query<
      { comments: { body: string; author: { name: string } }[] },
      string
    >({
      query: (postId) => `/v1/posts/${postId}/comments`,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useListFeedPostsQuery,
  useReadPostQuery,
} = postsApi;
