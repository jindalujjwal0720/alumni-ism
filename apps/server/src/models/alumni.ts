import mongoose from 'mongoose';
import { IAlumni } from '../types/models/alumni';

const alumniSchema = new mongoose.Schema<IAlumni>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // unique card number
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

    // personal details
    name: {
      type: String,
      default: '',
    },
    alias: {
      type: String,
      default: '',
    },

    // contact details
    phone: {
      type: String,
      default: '',
    },
    permanentAddress: {
      type: String,
      default: '',
    },

    // academic details
    yearOfGraduation: {
      type: Number,
      default: 0,
    },
    branch: {
      type: String,
      default: '',
    },
    degree: {
      type: String,
      default: '',
    },

    // professional details
    pan: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
    },
    designation: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },

    updates: {
      type: mongoose.Schema.Types.Mixed,
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
