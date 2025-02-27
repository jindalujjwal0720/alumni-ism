import { api } from '@/stores/api';

const detailsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    readMyAlumniDetails: builder.query({
      query: () => '/v1/alumni/me',
      providesTags: ['Alumni'],
    }),
    readMyPersonalDetails: builder.query({
      query: () => '/v1/alumni/me/personal',
      providesTags: ['Alumni'],
    }),
    readMyVerificationDetails: builder.query({
      query: () => '/v1/alumni/me/verification',
      providesTags: ['Alumni'],
    }),
    readMyContactDetails: builder.query({
      query: () => '/v1/alumni/me/contact',
      providesTags: ['Alumni'],
    }),
    readMyEducationDetails: builder.query({
      query: () => '/v1/alumni/me/education',
      providesTags: ['Alumni'],
    }),
    readMyProfessionalDetails: builder.query({
      query: () => '/v1/alumni/me/professional',
      providesTags: ['Alumni'],
    }),

    upsertMyPersonalDetails: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/me/personal',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Alumni'],
    }),
    upsertMyContactDetails: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/me/contact',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Alumni'],
    }),
    upsertMyEducationDetails: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/me/education',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Alumni'],
    }),
    upsertMyProfessionalDetails: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/me/professional',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Alumni'],
    }),
    upsertMyVerificationDetails: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/me/verification',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Alumni'],
    }),
  }),
});

export const {
  useReadMyAlumniDetailsQuery,
  useReadMyPersonalDetailsQuery,
  useReadMyVerificationDetailsQuery,
  useReadMyContactDetailsQuery,
  useReadMyEducationDetailsQuery,
  useReadMyProfessionalDetailsQuery,
  useUpsertMyPersonalDetailsMutation,
  useUpsertMyContactDetailsMutation,
  useUpsertMyEducationDetailsMutation,
  useUpsertMyProfessionalDetailsMutation,
  useUpsertMyVerificationDetailsMutation,
} = detailsApi;
