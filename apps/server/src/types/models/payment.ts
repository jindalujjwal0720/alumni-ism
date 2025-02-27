import { IUser } from './user';

export enum PaymentCategory {
  DONATION = 'donation',
  ALUMNI_CARD = 'alumni_card',
}

export enum DonationPurpose {
  GENERAL = 'general',
  INFRASTRUCTURE = 'infrastructure',
  SCHOLARSHIP = 'scholarship',
  OTHER = 'other',
}

export enum PaymentStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_CONSIDERATION = 'in_consideration',
  REJECTED = 'rejected',
}

export interface IPayment {
  account: string | IUser;

  category: PaymentCategory;
  purpose?: DonationPurpose;
  amountInINR: number;
  amountInWords: string;
  transactionId: string;
  remark?: string;

  status: PaymentStatus;
  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}
