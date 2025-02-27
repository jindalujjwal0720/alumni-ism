import { Model } from 'mongoose';
import { IPostLike } from '../../../../types/models/post';
import { RequestHandler } from 'express';
import { PostLike } from '../../../../models/post';

const createPostLike =
  (likeModel: Model<IPostLike>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { id: userId } = req.user;

      await likeModel.updateOne(
        { post: postId, account: userId },
        { post: postId, account: userId },
        { upsert: true },
      );

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

const removePostLike =
  (likeModel: Model<IPostLike>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { id: userId } = req.user;

      await likeModel.deleteOne({ post: postId, account: userId });

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const get = createPostLike(PostLike);
export const put = removePostLike(PostLike);
