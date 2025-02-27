import { Model } from 'mongoose';
import { IPostComment } from '../../../../../types/models/post';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import { PostComment } from '../../../../../models/post';

const editPostComment =
  (_postModel: Model<IPostComment>): RequestHandler =>
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

export const put = editPostComment(PostComment);
