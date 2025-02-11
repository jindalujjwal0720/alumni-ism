import { api } from '@/stores/api';

const partnersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listPartners: builder.query({
      query: () => '/v1/admins/partners',
      providesTags: ['Partner'],
    }),
    createPartner: builder.mutation({
      query: (body) => ({
        url: '/v1/admins/partners',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Partner'],
    }),
    updatePartner: builder.mutation({
      query: ({ id, body }) => ({
        url: `/v1/admins/partners/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Partner'],
    }),
    deletePartner: builder.mutation({
      query: (id) => ({
        url: `/v1/admins/partners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Partner'],
    }),
  }),
});

export const {
  useListPartnersQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnersApi;
