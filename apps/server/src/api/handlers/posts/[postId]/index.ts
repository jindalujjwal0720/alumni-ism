import { Model } from 'mongoose';
import { IPost, MediaType } from '../../../../types/models/post';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../utils/errors';
import { Post } from '../../../../models/post';
import Joi from 'joi';

const readPost =
  (_postModel: Model<IPost>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { postId } = req.params;

      const post = await Post.findById(postId);
      if (!post) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Post not found',
        );
      }

      res.status(200).send({ post });
    } catch (err) {
      next(err);
    }
  };

const editPost =
  (postModel: Model<IPost>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { id: userId } = req.user;

      const post = await postModel.findOne({ _id: postId, account: userId });
      if (!post) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Post not found',
        );
      }

      const schema = Joi.object({
        body: Joi.string(),
        media: Joi.array().items(
          Joi.object({
            type: Joi.string().valid(MediaType).required(),
            url: Joi.string().uri().required(),
          }),
        ),
        tags: Joi.array().items(Joi.string()),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          error.message,
        );
      }

      await postModel.updateOne({ _id: postId, account: userId }, req.body);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const get = readPost(Post);
export const put = editPost(Post);
