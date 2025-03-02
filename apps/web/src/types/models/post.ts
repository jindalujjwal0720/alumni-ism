import { IUser } from './user';

export enum MediaType {
  IMAGE = 'image',
}

export interface IMedia {
  type: MediaType;
  url: string;
}

export enum PostVisibility {
  PUBLIC = 'public',
  FOLLOWERS = 'followers',
}

export type PostMention = {
  ucn: string;
  name: string;
};

export interface IPost extends Record<string, unknown> {
  _id: string;
  account: string | IUser;

  body: string;
  media: IMedia[];
  mentions: PostMention[];

  visibility: PostVisibility;

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

  likes: number;
  comments: number;
}
