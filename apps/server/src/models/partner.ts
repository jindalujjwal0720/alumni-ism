import mongoose from 'mongoose';
import { IPartner } from '../types/models/partner';

const partnerSchema = new mongoose.Schema<IPartner>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    supportUrl: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Partner = mongoose.model<IPartner>('Partner', partnerSchema);
export default Partner;
