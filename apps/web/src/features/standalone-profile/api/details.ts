import { api } from '@/stores/api';
import {
  IAlumni,
  IAlumniContactDetails,
  IAlumniEducationDetails,
  IAlumniPersonalDetails,
  IAlumniProfessionalDetails,
  IAlumniPublicProfilePreferences,
  IAlumniVerificationDetails,
} from '@/types/models/alumni';

const detailsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    readMyAlumniDetails: builder.query<{ alumni: IAlumni }, void>({
      query: () => '/v1/alumni/me',
      providesTags: ['Alumni'],
    }),
    readMyPersonalDetails: builder.query<
      { details: IAlumniPersonalDetails },
      void
    >({
      query: () => '/v1/alumni/me/personal',
      providesTags: [{ type: 'Alumni', id: 'personal' }],
    }),
    readMyVerificationDetails: builder.query<
      { details: IAlumniVerificationDetails },
      void
    >({
      query: () => '/v1/alumni/me/verification',
      providesTags: [{ type: 'Alumni', id: 'verification' }],
    }),
    readMyContactDetails: builder.query<
      { details: IAlumniContactDetails },
      void
    >({
      query: () => '/v1/alumni/me/contact',
      providesTags: [{ type: 'Alumni', id: 'contact' }],
    }),
    readMyEducationDetails: builder.query<
      { details: IAlumniEducationDetails },
      void
    >({
      query: () => '/v1/alumni/me/education',
      providesTags: [{ type: 'Alumni', id: 'education' }],
    }),
    readMyProfessionalDetails: builder.query<
      { details: IAlumniProfessionalDetails },
      void
    >({
      query: () => '/v1/alumni/me/professional',
      providesTags: [{ type: 'Alumni', id: 'professional' }],
    }),
    readMyPreferences: builder.query<
      { details: IAlumniPublicProfilePreferences },
      void
    >({
      query: () => '/v1/alumni/me/preferences',
      providesTags: [{ type: 'Alumni', id: 'preferences' }],
    }),

    upsertMyPersonalDetails: builder.mutation<
      void,
      Partial<IAlumniPersonalDetails>
    >({
      query: (body) => ({
        url: '/v1/alumni/me/personal',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Alumni'],
    }),
    upsertMyContactDetails: builder.mutation<
      void,
      Partial<IAlumniContactDetails>
    >({
      query: (body) => ({
        url: '/v1/alumni/me/contact',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Alumni', id: 'contact' }],
    }),
    upsertMyEducationDetails: builder.mutation<
      void,
      Partial<IAlumniEducationDetails>
    >({
      query: (body) => ({
        url: '/v1/alumni/me/education',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Alumni', id: 'education' }],
    }),
    upsertMyProfessionalDetails: builder.mutation<
      void,
      Partial<IAlumniProfessionalDetails>
    >({
      query: (body) => ({
        url: '/v1/alumni/me/professional',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Alumni', id: 'professional' }],
    }),
    upsertMyVerificationDetails: builder.mutation<
      void,
      Partial<IAlumniVerificationDetails>
    >({
      query: (body) => ({
        url: '/v1/alumni/me/verification',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Alumni', id: 'verification' }],
    }),
    upsertMyPreferences: builder.mutation<
      void,
      Partial<IAlumniPublicProfilePreferences>
    >({
      query: (body) => ({
        url: '/v1/alumni/me/preferences',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Alumni', id: 'preferences' }],
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
  useReadMyPreferencesQuery,

  useUpsertMyPersonalDetailsMutation,
  useUpsertMyContactDetailsMutation,
  useUpsertMyEducationDetailsMutation,
  useUpsertMyProfessionalDetailsMutation,
  useUpsertMyVerificationDetailsMutation,
  useUpsertMyPreferencesMutation,
} = detailsApi;
