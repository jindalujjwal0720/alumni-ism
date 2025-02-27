import { Model } from 'mongoose';
import { IPostLike } from '../../../../../types/models/post';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import { PostLike } from '../../../../../models/post';

const createPostLike =
  (_postModel: Model<IPostLike>): RequestHandler =>
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

const removePostLike =
  (_postModel: Model<IPostLike>): RequestHandler =>
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

export const get = createPostLike(PostLike);
export const put = removePostLike(PostLike);
