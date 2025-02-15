import { api } from '@/stores/api';
import { IUser } from '@/types/models/user';

const cardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    validateCard: builder.query<
      {
        valid: boolean;
        data: IUser['studentData'];
      },
      string
    >({
      query: (cardNumber) => `/v1/validate-card?id=${cardNumber}`,
    }),
  }),
});

export const { useLazyValidateCardQuery } = cardsApi;
