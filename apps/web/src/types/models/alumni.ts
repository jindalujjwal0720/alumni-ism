import { IUser } from './user';

export enum AlumniGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer-not-to-say',
}

export enum AlumniVerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export interface IAlumniPersonalDetails extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  name: string;
  alias: string;
  profilePicture?: string;
  bannerPicture?: string;
  bio?: string;
  dob?: Date;
  gender: AlumniGender;

  createdAt: Date;
  updatedAt: Date;
}

export interface IAlumniContactDetails extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  phone: string;
  email: string;

  city: string;
  state: string;
  country: string;
  zip: string;

  // social media
  linkedIn?: string;
  twitter?: string;
  website?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IAlumniEducationDetails extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  degree: string;
  branch: string;
  yearOfGraduation: number;
  admissionNumber: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IAlumniProfessionalDetails extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  currentCompany?: string;
  designation?: string;
  currentCompanyWebsite?: string;
  totalExperienceYears?: number;

  createdAt: Date;
  updatedAt: Date;
}

export enum AlumniVerificationDocType {
  PAN = 'pan',
  AADHAR = 'aadhar',
  DRIVING_LICENSE = 'driving_license',
  PASSPORT = 'passport',
  VOTER_ID = 'voter_id',
  OTHER = 'other',
}

export interface IAlumniVerificationDetails extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  verificationDocType: AlumniVerificationDocType;
  verificationDocLink: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IAlumni extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  // unique card number
  ucn: string;
  validity: Date;

  verificationStatus: AlumniVerificationStatus;
  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IAlumniPublicProfilePreferences
  extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  // personal
  showDob: boolean;
  showGender: boolean;

  // contact
  showPhone: boolean;
  showEmail: boolean;
  showZip: boolean;

  // education
  showAdmissionNumber: boolean;

  // professional

  // verification

  createdAt: Date;
  updatedAt: Date;
}
