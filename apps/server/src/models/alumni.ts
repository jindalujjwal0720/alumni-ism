import mongoose from 'mongoose';
import {
  AlumniGender,
  AlumniVerificationDocType,
  AlumniVerificationStatus,
  IAlumni,
  IAlumniContactDetails,
  IAlumniEducationDetails,
  IAlumniPersonalDetails,
  IAlumniProfessionalDetails,
  IAlumniPublicProfilePreferences,
  IAlumniVerificationDetails,
} from '../types/models/alumni';

const alumniPersonalDetailsSchema = new mongoose.Schema<IAlumniPersonalDetails>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
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
  { timestamps: true },
);

const alumniContactDetailsSchema = new mongoose.Schema<IAlumniContactDetails>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
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
  { timestamps: true },
);

const alumniEducationDetailsSchema =
  new mongoose.Schema<IAlumniEducationDetails>(
    {
      account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
      },
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
      admissionNumber: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
  );

const alumniProfessionalDetailsSchema =
  new mongoose.Schema<IAlumniProfessionalDetails>(
    {
      account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
      },
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
    { timestamps: true },
  );

const alumniVerificationDetailsSchema =
  new mongoose.Schema<IAlumniVerificationDetails>(
    {
      account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
      },
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
    { timestamps: true },
  );

const alumniSchema = new mongoose.Schema<IAlumni>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    // unique card number
    ucn: {
      type: String,
      required: function () {
        return this?.verificationStatus === AlumniVerificationStatus.VERIFIED;
      },
      unique: true,
    },
    validity: {
      type: Date,
      required: function () {
        return this?.verificationStatus === AlumniVerificationStatus.VERIFIED;
      },
      // current date to be set as default
      // means card is not valid yet
      default: new Date(),
    },

    verificationStatus: {
      type: String,
      enum: AlumniVerificationStatus,
      default: AlumniVerificationStatus.PENDING,
    },
    rejectionReason: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

const alumniPublicProfilePreferencesSchema =
  new mongoose.Schema<IAlumniPublicProfilePreferences>(
    {
      account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
      },
      showDob: {
        type: Boolean,
        default: false,
      },
      showGender: {
        type: Boolean,
        default: true,
      },
      showEmail: {
        type: Boolean,
        default: true,
      },
      showPhone: {
        type: Boolean,
        default: false,
      },
      showAdmissionNumber: {
        type: Boolean,
        default: false,
      },
      showZip: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true },
  );

const AlumniPersonalDetails = mongoose.model<IAlumniPersonalDetails>(
  'AlumniPersonalDetails',
  alumniPersonalDetailsSchema,
);
const AlumniContactDetails = mongoose.model<IAlumniContactDetails>(
  'AlumniContactDetails',
  alumniContactDetailsSchema,
);
const AlumniEducationDetails = mongoose.model<IAlumniEducationDetails>(
  'AlumniEducationDetails',
  alumniEducationDetailsSchema,
);
const AlumniProfessionalDetails = mongoose.model<IAlumniProfessionalDetails>(
  'AlumniProfessionalDetails',
  alumniProfessionalDetailsSchema,
);
const AlumniVerificationDetails = mongoose.model<IAlumniVerificationDetails>(
  'AlumniVerificationDetails',
  alumniVerificationDetailsSchema,
);
const Alumni = mongoose.model<IAlumni>('Alumni', alumniSchema);
const AlumniPublicProfilePreferences =
  mongoose.model<IAlumniPublicProfilePreferences>(
    'AlumniPublicProfilePreferences',
    alumniPublicProfilePreferencesSchema,
  );

export {
  AlumniPersonalDetails,
  AlumniContactDetails,
  AlumniEducationDetails,
  AlumniProfessionalDetails,
  AlumniVerificationDetails,
  Alumni,
  AlumniPublicProfilePreferences,
};
