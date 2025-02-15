import { IUser } from './user';

export interface IOffer extends Record<string, unknown> {
  _id: string;
  description: string;
  tags: string[];
  partner: string | IUser;
}
