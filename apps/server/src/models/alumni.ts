import mongoose from 'mongoose';
import {
  AlumniGender,
  AlumniVerificationDocType,
  IAlumni,
  IAlumniContactDetails,
  IAlumniEducationDetails,
  IAlumniPersonalDetails,
  IAlumniProfessionalDetails,
  IAlumniVerificationDetails,
} from '../types/models/alumni';

const alumniPersonalDetailsSchema = new mongoose.Schema<IAlumniPersonalDetails>(
  {
    name: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    bannerPicture: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: AlumniGender,
      default: AlumniGender.PREFER_NOT_TO_SAY,
      required: true,
    },
  },
  { _id: false },
);

const alumniContactDetailsSchema = new mongoose.Schema<IAlumniContactDetails>(
  {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
  },
  { _id: false },
);

const alumniEducationDetailsSchema =
  new mongoose.Schema<IAlumniEducationDetails>(
    {
      degree: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      yearOfGraduation: {
        type: Number,
        required: true,
      },
    },
    { _id: false },
  );

const alumniProfessionalDetailsSchema =
  new mongoose.Schema<IAlumniProfessionalDetails>(
    {
      currentCompany: {
        type: String,
        default: '',
      },
      designation: {
        type: String,
        default: '',
      },
      currentCompanyWebsite: {
        type: String,
        default: '',
      },
      totalExperienceYears: {
        type: Number,
        default: 0,
      },
    },
    { _id: false },
  );

const alumniVerificationDetailsSchema =
  new mongoose.Schema<IAlumniVerificationDetails>(
    {
      verificationDocType: {
        type: String,
        enum: AlumniVerificationDocType,
        required: true,
      },
      verificationDocLink: {
        type: String,
        required: true,
      },
    },
    { _id: false },
  );

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
      // means card is not valid yet
      default: new Date(),
    },

    personal: {
      type: alumniPersonalDetailsSchema,
      required: true,
    },
    contact: {
      type: alumniContactDetailsSchema,
      required: true,
    },
    education: {
      type: alumniEducationDetailsSchema,
      required: true,
    },
    professional: {
      type: alumniProfessionalDetailsSchema,
      required: true,
    },
    verification: {
      type: alumniVerificationDetailsSchema,
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
