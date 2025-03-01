import { api } from '@/stores/api';
import {
  IAlumni,
  IAlumniContactDetails,
  IAlumniEducationDetails,
  IAlumniPersonalDetails,
  IAlumniProfessionalDetails,
  IAlumniVerificationDetails,
} from '@/types/models/alumni';
import { IPayment } from '@/types/models/payment';

const alumniApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listUnverifiedAlumni: builder.query<
      {
        alumni: {
          _id: string;
          personal: {
            name: string;
          };
          contact: {
            phone: string;
            email: string;
          };
          education: {
            yearOfGraduation: number;
          };
        }[];
      },
      undefined
    >({
      query: () => '/v1/admins/alumni/unverified',
      providesTags: [{ type: 'Alumni', id: 'LIST' }],
    }),
    listRejectedAlumni: builder.query<
      {
        alumni: {
          _id: string;
          personal: {
            name: string;
          };
          contact: {
            phone: string;
            email: string;
          };
          education: {
            yearOfGraduation: number;
          };
        }[];
      },
      undefined
    >({
      query: () => '/v1/admins/alumni/rejected',
      providesTags: [{ type: 'Alumni', id: 'LIST' }],
    }),
    readAlumniData: builder.query<
      {
        alumni: IAlumni;
        personal: IAlumniPersonalDetails;
        contact: IAlumniContactDetails;
        education: IAlumniEducationDetails;
        professional: IAlumniProfessionalDetails;
        verification: IAlumniVerificationDetails;
      },
      string
    >({
      query: (id) => `/v1/admins/alumni/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Alumni', id }],
    }),
    rejectAlumniData: builder.mutation<
      void,
      {
        alumniId: string;
        rejectionReason: string;
      }
    >({
      query: ({ alumniId, rejectionReason }) => ({
        url: `/v1/admins/alumni/${alumniId}/reject`,
        method: 'POST',
        body: { rejectionReason },
      }),
      invalidatesTags: (_r, _e, { alumniId }) => [
        { type: 'Alumni', id: alumniId },
      ],
    }),
    verifyAlumniData: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/admins/alumni/${id}/verify`,
        method: 'POST',
      }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Alumni', id }],
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
  useListRejectedAlumniQuery,

  useReadAlumniDataQuery,
  useRejectAlumniDataMutation,
  useVerifyAlumniDataMutation,

  useListAlumniPaymentsQuery,
  useReadAlumniPaymentDataQuery,
  useAcceptAlumniPaymentMutation,
} = alumniApi;
