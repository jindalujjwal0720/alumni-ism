import { api } from '@/stores/api';

const detailsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    readMyAlumniDetails: builder.query({
      query: () => '/v1/alumni/me',
      providesTags: ['Alumni'],
    }),
    readMyPersonalDetails: builder.query({
      query: () => '/v1/alumni/me/personal',
      providesTags: [{ type: 'Alumni', id: 'personal' }],
    }),
    readMyVerificationDetails: builder.query({
      query: () => '/v1/alumni/me/verification',
      providesTags: [{ type: 'Alumni', id: 'verification' }],
    }),
    readMyContactDetails: builder.query({
      query: () => '/v1/alumni/me/contact',
      providesTags: [{ type: 'Alumni', id: 'contact' }],
    }),
    readMyEducationDetails: builder.query({
      query: () => '/v1/alumni/me/education',
      providesTags: [{ type: 'Alumni', id: 'education' }],
    }),
    readMyProfessionalDetails: builder.query({
      query: () => '/v1/alumni/me/professional',
      providesTags: [{ type: 'Alumni', id: 'professional' }],
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
      invalidatesTags: [{ type: 'Alumni', id: 'contact' }],
    }),
    upsertMyEducationDetails: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/me/education',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Alumni', id: 'education' }],
    }),
    upsertMyProfessionalDetails: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/me/professional',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Alumni', id: 'professional' }],
    }),
    upsertMyVerificationDetails: builder.mutation({
      query: (body) => ({
        url: '/v1/alumni/me/verification',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Alumni', id: 'verification' }],
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
