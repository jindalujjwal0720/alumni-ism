import { api } from '@/stores/api';
import { IOffer } from '@/types/models/offer';

const offersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listOffers: builder.query<
      {
        offers: IOffer[];
      },
      undefined
    >({
      query: () => '/v1/partners/offers',
      providesTags: ['Offer'],
    }),
    readOffer: builder.query({
      query: (id) => `/v1/partners/offers/${id}`,
      providesTags: ['Offer'],
    }),
    createOffer: builder.mutation({
      query: (body) => ({
        url: '/v1/partners/offers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Offer'],
    }),
    updateOffer: builder.mutation({
      query: ({ id, body }) => ({
        url: `/v1/partners/offers/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Offer'],
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `/v1/partners/offers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Offer'],
    }),
  }),
});

export const {
  useListOffersQuery,
  useReadOfferQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = offersApi;
