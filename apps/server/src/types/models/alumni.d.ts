import { IUser } from './user';

export interface IAlumni extends Record<string, unknown> {
  account: string | IUser;
  // unique card number
  ucn: string;
  validity: Date;

  // personal details
  name: string;
  alias: string;

  // contact details
  phone: string;
  permanentAddress: string;

  // academic details
  degree: string;
  branch: string;
  yearOfGraduation: number;

  // professional details
  pan: string;
  company: string;
  designation: string;
  location: string;

  updates?: {
    name: string;
    alias: string;

    phone: string;
    permanentAddress: string;

    degree: string;
    branch: string;
    yearOfGraduation: number;

    pan: string;
    company: string;
    designation: string;
    location: string;
  };
  verificationDocLink: string;
  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}
