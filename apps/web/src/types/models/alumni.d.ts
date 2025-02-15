import { IUser } from './user';

export interface IAlumni extends Record<string, unknown> {
  account: string | IUser;
  // unique card number
  ucn: string;
  validity: Date;

  // personal details
  name: string;
  // name on certificate/card/etc
  alias: string;
  yearOfGraduation: number;
  phone: string;

  verificationDocLink: string;
  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}
