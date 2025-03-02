import { api } from '@/stores/api';
import { IPost } from '@/types/models/post';

const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation<void, Partial<IPost>>({
      query: (data) => ({
        url: '/v1/posts',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreatePostMutation } = postsApi;
