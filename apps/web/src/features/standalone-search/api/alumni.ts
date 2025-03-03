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
    getSearchFilterSuggestions: builder.query<
      { suggestions: { value: string; count: number }[] },
      { filterType: string; limit?: number }
    >({
      query: ({ filterType, limit = 5 }) =>
        `/v1/alumni/search/filters?ft=${filterType}&limit=${limit}`,
    }),
    getSearchResults: builder.mutation<
      { results: Omit<IAlumniSuggestion, 'mutualFollowers' | 'score'>[] },
      {
        query: string;
        filters: Record<string, string>;
        limit?: number;
        page?: number;
      }
    >({
      query: ({ query, filters, limit = 10, page = 0 }) =>
        `/v1/alumni/search?${new URLSearchParams({
          q: query,
          ...filters,
          ...(limit !== undefined && { limit: limit.toString() }),
          ...(page !== undefined && { page: page.toString() }),
        }).toString()}`,
    }),
  }),
});

export const {
  useGetSearchSuggestionsQuery,
  useGetSearchFilterSuggestionsQuery,
  useGetSearchResultsMutation,
} = alumniSearchApi;
