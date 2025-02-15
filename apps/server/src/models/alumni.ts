import mongoose from 'mongoose';
import { IAlumni } from '../types/models/alumni';

const alumniSchema = new mongoose.Schema<IAlumni>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ucn: {
      type: String,
      required: function () {
        return this?.isVerified === true;
      },
    },
    validity: {
      type: Date,
      required: function () {
        return this?.isVerified === true;
      },
      // current date to be set as default
      default: new Date(),
    },

    // Alumni specific fields
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    yearOfGraduation: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    // Verification document link
    verificationDocLink: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const Alumni = mongoose.model<IAlumni>('Alumni', alumniSchema);
export default Alumni;
