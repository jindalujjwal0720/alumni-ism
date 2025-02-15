import { IUser } from './user';

export interface IPartner extends Record<string, unknown> {
  account: string | IUser;

  name: string;
  logo: string;
  supportUrl: string;
  about: string;

  createdAt: Date;
  updatedAt: Date;
}
