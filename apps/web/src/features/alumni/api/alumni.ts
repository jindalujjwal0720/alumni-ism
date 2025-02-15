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
      query: () => '/v1/alumni/my',
      providesTags: ['Alumni'],
    }),
    createOrUpdateMyAlumniData: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/my',
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
      query: () => '/v1/alumni/my/pledges',
      providesTags: ['Pledge'],
    }),
    createPledge: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/my/pledges',
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

    readAlumniPublicData: builder.query<
      {
        alumni: IAlumni;
      },
      string
    >({
      query: (ucn) => `/v1/public/alumni/${ucn}`,
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

  useReadAlumniPublicDataQuery,
} = alumniApi;
