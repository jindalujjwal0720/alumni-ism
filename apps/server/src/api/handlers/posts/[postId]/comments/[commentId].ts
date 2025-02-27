import { Model } from 'mongoose';
import { IPostComment } from '../../../../../types/models/post';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import { PostComment } from '../../../../../models/post';
import Joi from 'joi';

const editPostComment =
  (commentModel: Model<IPostComment>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { id: userId } = req.user;

      const comment = await commentModel.findOne({
        _id: commentId,
        account: userId,
      });
      if (!comment) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Comment not found',
        );
      }

      const schema = Joi.object({
        body: Joi.string(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          error.message,
        );
      }

      await commentModel.updateOne(
        { _id: commentId, account: userId },
        req.body,
      );

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const put = editPostComment(PostComment);
