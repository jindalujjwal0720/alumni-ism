import { api } from '@/stores/api';
import { IUser } from '@/types/models/user';

const partnersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listPartners: builder.query<
      {
        partners: IUser[];
      },
      undefined
    >({
      query: () => '/v1/admins/partners',
      providesTags: ['Partner'],
    }),
    readPartner: builder.query({
      query: (id) => `/v1/admins/partners/${id}`,
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
  useReadPartnerQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnersApi;
