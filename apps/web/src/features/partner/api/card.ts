import { api } from '@/stores/api';

const cardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    validateCard: builder.query<
      {
        valid: boolean;
      },
      string
    >({
      query: (cardNumber) => `/v1/validate-card?id=${cardNumber}`,
    }),
  }),
});

export const { useLazyValidateCardQuery } = cardsApi;
