import { IUser } from './user';

export enum MediaType {
  IMAGE = 'image',
}

export interface IMedia {
  type: MediaType;
  url: string;
}

export interface IPost {
  _id: string;
  account: string | IUser;

  body: string;
  media: IMedia[];
  tags: string[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IPostComment {
  _id: string;
  account: string | IUser;

  post: string | IPost;
  body: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IPostLike {
  _id: string;
  account: string | IUser;

  post: string | IPost;
}

export interface IPostAnalytics {
  _id: string;
  post: string | IPost;

  likes: number;
  comments: number;
}
