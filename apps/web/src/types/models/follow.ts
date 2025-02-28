import { IUser } from './user';

export interface IAlumniFollow extends Record<string, unknown> {
  _id: string;
  // The account that is following
  follower: string | IUser;
  // The account that is being followed
  following: string | IUser;
}
