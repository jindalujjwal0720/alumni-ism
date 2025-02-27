import { IUser } from './user';

export enum MediaType {
  IMAGE = 'image',
}

export interface IMedia {
  type: MediaType;
  url: string;
}

export interface IPost extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  body: string;
  media: IMedia[];
  tags: string[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IPostComment extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  post: string | IPost;
  body: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IPostLike extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  post: string | IPost;
}

export interface IPostAnalytics extends Record<string, unknown> {
  _id: string;
  post: string | IPost;

  views: number;
  likes: number;
  comments: number;
}
