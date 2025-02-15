import { IUser } from './user';

export enum PaymentCategory {
  Yearly = 'yearly',
  Lifetime = 'lifetime',
}

export enum PaymentStatus {
  ACCEPTED = 'accepted',
  IN_CONSIDERATION = 'in_consideration',
  REJECTED = 'rejected',
}

export interface IPayment extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  category: PaymentCategory;
  amountInINR: number;
  amountInWords: string;
  remark: string;
  paymentVerificationLink: string;

  status: PaymentStatus;
  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}
