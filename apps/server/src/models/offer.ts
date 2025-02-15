import mongoose from 'mongoose';
import { IOffer } from '../types/models/offer';

const offerSchema = new mongoose.Schema<IOffer>({
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    required: true,
  },
});

const Offer = mongoose.model<IOffer>('Offer', offerSchema);
export default Offer;
