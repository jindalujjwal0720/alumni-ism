import { api } from '@/stores/api';
import {
  IAlumni,
  IAlumniContactDetails,
  IAlumniEducationDetails,
  IAlumniPersonalDetails,
  IAlumniProfessionalDetails,
} from '@/types/models/alumni';

const publicDetailsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    readPublicAlumniDetails: builder.query<
      { alumni: IAlumni; isFollowing: boolean },
      string
    >({
      query: (ucn: string) => `/v1/public/alumni/${ucn}`,
      providesTags: (_result, _error, ucn) => [{ type: 'Alumni', id: ucn }],
    }),
    readPublicPersonalDetails: builder.query<
      { details: IAlumniPersonalDetails },
      string
    >({
      query: (ucn: string) => `/v1/public/alumni/${ucn}/personal`,
      providesTags: (_result, _error, ucn) => [
        { type: 'Alumni', id: `${ucn}-personal` },
      ],
    }),
    readPublicEducationDetails: builder.query<
      { details: IAlumniEducationDetails },
      string
    >({
      query: (ucn: string) => `/v1/public/alumni/${ucn}/education`,
      providesTags: (_result, _error, ucn) => [
        { type: 'Alumni', id: `${ucn}-education` },
      ],
    }),
    readPublicProfessionalDetails: builder.query<
      { details: IAlumniProfessionalDetails },
      string
    >({
      query: (ucn: string) => `/v1/public/alumni/${ucn}/professional`,
      providesTags: (_result, _error, ucn) => [
        { type: 'Alumni', id: `${ucn}-professional` },
      ],
    }),
    readPublicContactDetails: builder.query<
      { details: IAlumniContactDetails },
      string
    >({
      query: (ucn: string) => `/v1/public/alumni/${ucn}/contact`,
      providesTags: (_result, _error, ucn) => [
        { type: 'Alumni', id: `${ucn}-contact` },
      ],
    }),
  }),
});

export const {
  useReadPublicAlumniDetailsQuery,
  useReadPublicPersonalDetailsQuery,
  useReadPublicEducationDetailsQuery,
  useReadPublicProfessionalDetailsQuery,
  useReadPublicContactDetailsQuery,
} = publicDetailsApi;
