import { api } from '@/stores/api';

const adminsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listAdmins: builder.query({
      query: () => '/v1/admins',
      providesTags: ['Admin'],
    }),
    createAdmin: builder.mutation({
      query: (body) => ({
        url: '/v1/admins',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    updateAdmin: builder.mutation({
      query: ({ id, body }) => ({
        url: `/v1/admins/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/v1/admins/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
});

export const {
  useListAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminsApi;
