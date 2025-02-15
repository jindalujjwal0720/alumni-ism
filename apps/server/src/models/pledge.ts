import mongoose from 'mongoose';
import { IPledge } from '../types/models/pledge';

const pledgeSchema = new mongoose.Schema<IPledge>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
  },
  { timestamps: true },
);

const Pledge = mongoose.model<IPledge>('Pledge', pledgeSchema);
export default Pledge;
