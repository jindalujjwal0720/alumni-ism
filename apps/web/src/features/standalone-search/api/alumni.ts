import { api } from '@/stores/api';

export interface IAlumniSuggestion {
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

  mutualFollowers: number;
  score: number;
}

const alumniSearchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSearchSuggestions: builder.query<
      { suggestions: IAlumniSuggestion[] },
      void
    >({
      query: () => '/v1/alumni/search/suggestions',
    }),
  }),
});

export const { useGetSearchSuggestionsQuery } = alumniSearchApi;
