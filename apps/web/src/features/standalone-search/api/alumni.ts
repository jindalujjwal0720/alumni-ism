import { api } from '@/stores/api';

const alumniSearchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSearchSuggestions: builder.query<
      {
        suggestions: {
          _id: string;
          ucn: string;
          account: string;
          name: string;
          profilePicture: string;
          degree: string;
          branch: string;
          yearOfGraduation: number;
          currentCompany: string;
          designation: string;
          mutualConnections: number;
          score: number;
        }[];
      },
      void
    >({
      query: () => '/v1/alumni/search/suggestions',
    }),
  }),
});

export const { useGetSearchSuggestionsQuery } = alumniSearchApi;
