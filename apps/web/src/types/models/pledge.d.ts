import { IUser } from './user';

export interface IPledge {
  account: string | IUser;

  amountInINR: number;
  amountInWords: string;

  createdAt: Date;
  updatedAt: Date;
}
