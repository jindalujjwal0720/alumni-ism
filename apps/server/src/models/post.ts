import mongoose from 'mongoose';
import {
  IMedia,
  IPost,
  IPostAnalytics,
  IPostComment,
  IPostLike,
  MediaType,
} from '../types/models/post';

const mediaSchema = new mongoose.Schema<IMedia>(
  {
    type: {
      type: String,
      required: true,
      enum: MediaType,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const postSchema = new mongoose.Schema<IPost>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    media: {
      type: [mediaSchema],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const postCommentSchema = new mongoose.Schema<IPostComment>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const postLikeSchema = new mongoose.Schema<IPostLike>(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { timestamps: true },
);

const postAnalyticsSchema = new mongoose.Schema<IPostAnalytics>(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model<IPost>('Post', postSchema);
const PostComment = mongoose.model<IPostComment>(
  'PostComment',
  postCommentSchema,
);
const PostLike = mongoose.model<IPostLike>('PostLike', postLikeSchema);
const PostAnalytics = mongoose.model<IPostAnalytics>(
  'PostAnalytics',
  postAnalyticsSchema,
);

export { Post, PostComment, PostLike, PostAnalytics };
