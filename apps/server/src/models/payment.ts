import mongoose from 'mongoose';
import {
  DonationPurpose,
  IPayment,
  PaymentCategory,
  PaymentStatus,
} from '../types/models/payment';

const paymentSchema = new mongoose.Schema<IPayment>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    category: {
      type: String,
      enum: PaymentCategory,
      required: true,
    },
    purpose: {
      type: String,
      enum: DonationPurpose,
    },
    amountInINR: {
      type: Number,
      required: true,
    },
    amountInWords: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: PaymentStatus,
      required: true,
      default: PaymentStatus.IN_CONSIDERATION,
    },
    rejectionReason: {
      type: String,
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
export default Payment;
