import { Model } from 'mongoose';
import { IPost } from '../../../../types/models/post';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../utils/errors';
import { Post } from '../../../../models/post';

const listMyPosts =
  (_postModel: Model<IPost>): RequestHandler =>
  async (req, res, next) => {
    try {
      throw new AppError(
        CommonErrors.InternalServerError.name,
        CommonErrors.InternalServerError.statusCode,
        'Not implemented',
      );
    } catch (err) {
      next(err);
    }
  };

export const get = listMyPosts(Post);
