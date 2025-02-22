import { IUser } from './user';

export enum AlumniGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer-not-to-say',
}

export interface IAlumniPersonalDetails {
  name: string;
  alias: string;
  profilePicture?: string;
  bio?: string;
  dob?: Date;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
}

export interface IAlumniContactDetails {
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
}

export interface IAlumniEducationDetails {
  degree: string;
  branch: string;
  yearOfGraduation: number;
}

export interface IAlumniProfessionalDetails {
  currentCompany?: string;
  designation?: string;
  currentCompanyWebsite?: string;
  totalExperienceYears?: number;
}

export enum AlumniVerificationDocType {
  PAN = 'pan',
  AADHAR = 'aadhar',
  DRIVING_LICENSE = 'driving_license',
  PASSPORT = 'passport',
  VOTER_ID = 'voter_id',
  OTHER = 'other',
}

export interface IAlumniVerificationDetails {
  verificationDocType: AlumniVerificationDocType;
  verificationDocLink: string;
}

export interface IAlumni {
  account: string | IUser;
  // unique card number
  ucn: string;
  validity: Date;

  personal: IAlumniPersonalDetails;
  contact: IAlumniContactDetails;
  education: IAlumniEducationDetails;
  professional: IAlumniProfessionalDetails;
  verification: IAlumniVerificationDetails;

  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}
