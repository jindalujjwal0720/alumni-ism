import { api } from '@/stores/api';
import { IAlumni } from '@/types/models/alumni';
import { IPayment } from '@/types/models/payment';

const alumniApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listUnverifiedAlumni: builder.query<
      {
        alumni: IAlumni[];
      },
      undefined
    >({
      query: () => '/v1/admins/alumni/unverified',
      providesTags: ['Alumni'],
    }),
    readAlumniData: builder.query<
      {
        alumni: IAlumni;
      },
      string
    >({
      query: (id) => `/v1/admins/alumni/${id}`,
      providesTags: ['Alumni'],
    }),
    verifyAlumniData: builder.mutation({
      query: (id) => ({
        url: `/v1/admins/alumni/${id}/verify`,
        method: 'POST',
      }),
      invalidatesTags: ['Alumni'],
    }),

    listAlumniPayments: builder.query<
      {
        payments: IPayment[];
      },
      undefined
    >({
      query: () => '/v1/admins/alumni/payments',
      providesTags: ['Payment'],
    }),
    readAlumniPaymentData: builder.query<
      {
        payment: IPayment;
        // alumni is included in the response for the sake of completeness
        alumni: IAlumni;
      },
      string
    >({
      query: (id) => `/v1/admins/alumni/payments/${id}`,
      providesTags: ['Payment'],
    }),
    acceptAlumniPayment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/v1/admins/alumni/payments/${id}/accept`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Payment'],
    }),
  }),
});

export const {
  useListUnverifiedAlumniQuery,
  useReadAlumniDataQuery,
  useVerifyAlumniDataMutation,

  useListAlumniPaymentsQuery,
  useReadAlumniPaymentDataQuery,
  useAcceptAlumniPaymentMutation,
} = alumniApi;
