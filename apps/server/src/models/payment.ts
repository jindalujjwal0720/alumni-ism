import mongoose from 'mongoose';
import { IPayment, PaymentStatus } from '../types/models/payment';

const paymentSchema = new mongoose.Schema<IPayment>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    category: {
      type: String,
      enum: ['yearly', 'lifetime', 'donation'],
      required: true,
    },
    amountInINR: {
      type: Number,
      required: true,
    },
    amountInWords: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      default: '',
    },
    paymentVerificationLink: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['accepted', 'in_consideration', 'rejected'],
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
