import { IUser } from './user';

export interface IPledge {
  account: string | IUser;

  amountInINR: number;
  amountInWords: string;
  expectedFullfillmentDate: Date;
  // for partial fulfillments
  fullfilledAmountInINR: number;
  payments: string[];

  createdAt: Date;
  updatedAt: Date;
}
