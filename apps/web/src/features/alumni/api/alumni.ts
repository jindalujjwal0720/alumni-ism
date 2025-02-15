import { api } from '@/stores/api';
import { IAlumni } from '@/types/models/alumni';
import { IPayment } from '@/types/models/payment';
import { IPledge } from '@/types/models/pledge';

const alumniApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyAlumniData: builder.query<
      {
        alumni: IAlumni;
      },
      undefined
    >({
      query: () => '/v1/alumni',
      providesTags: ['Alumni'],
    }),
    createOrUpdateMyAlumniData: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Alumni'],
    }),
    createPayment: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/payment',
        method: 'POST',
        body,
      }),
    }),

    getMyPledges: builder.query<
      {
        pledges: IPledge[];
      },
      undefined
    >({
      query: () => '/v1/alumni/pledges',
      providesTags: ['Pledge'],
    }),
    createPledge: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/pledges',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Pledge'],
    }),

    getMyDonations: builder.query<
      {
        donations: IPayment[];
      },
      undefined
    >({
      query: () => '/v1/alumni/donations',
      providesTags: ['Payment'],
    }),
  }),
});

export const {
  useGetMyAlumniDataQuery,
  useCreateOrUpdateMyAlumniDataMutation,
  useCreatePaymentMutation,

  useGetMyPledgesQuery,
  useCreatePledgeMutation,

  useGetMyDonationsQuery,
} = alumniApi;
