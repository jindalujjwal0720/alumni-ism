import { IUser } from './user';

export enum PaymentCategory {
  Yearly = 'yearly',
  Lifetime = 'lifetime',
  Donation = 'donation',
}

export enum PaymentStatus {
  ACCEPTED = 'accepted',
  IN_CONSIDERATION = 'in_consideration',
  REJECTED = 'rejected',
}

export interface IPayment {
  account: string | IUser;

  category: PaymentCategory;
  amountInINR: number;
  amountInWords: string;
  remark?: string;
  paymentVerificationLink: string;

  status: PaymentStatus;
  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}
