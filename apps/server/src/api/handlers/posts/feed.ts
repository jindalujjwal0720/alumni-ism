import { Model } from 'mongoose';
import { IPost } from '../../../types/models/post';
import { RequestHandler } from 'express';
import { Post } from '../../../models/post';

const listMyFeedPosts =
  (postModel: Model<IPost>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { limit = 10, offset = 0 } = req.query;

      const posts = await postModel
        .find()
        .sort({ createdAt: -1 })
        .skip(Number(offset))
        .limit(Number(limit));

      res.status(200).send({ posts });
    } catch (err) {
      next(err);
    }
  };

export const get = listMyFeedPosts(Post);
