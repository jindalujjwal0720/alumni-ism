import { api } from '@/stores/api';

const offersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listOffers: builder.query({
      query: () => '/v1/partners/offers',
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
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = offersApi;
