import { Model } from 'mongoose';
import { IPost } from '../../../../types/models/post';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../utils/errors';
import { Post } from '../../../../models/post';

const createPost =
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

export const post = createPost(Post);
