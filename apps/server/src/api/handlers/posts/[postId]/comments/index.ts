import { Model } from 'mongoose';
import { IPost, IPostComment } from '../../../../../types/models/post';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import { Post, PostComment } from '../../../../../models/post';
import Joi from 'joi';

const listPostComments =
  (commentModel: Model<IPostComment>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { limit = 10, offset = 0 } = req.query;

      const comments = await commentModel
        .find({ post: postId })
        .sort({ createdAt: -1 })
        .skip(Number(offset))
        .limit(Number(limit));

      res.status(200).send({ comments });
    } catch (err) {
      next(err);
    }
  };

const createPostComment =
  (
    commentModel: Model<IPostComment>,
    postModel: Model<IPost>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { id: userId } = req.user;

      const post = await postModel.findById(postId);
      if (!post) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Post not found',
        );
      }

      const schema = Joi.object({
        body: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          error.message,
        );
      }

      await commentModel.create({
        ...req.body,
        post: postId,
        account: userId,
      });

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = listPostComments(PostComment);
export const post = createPostComment(PostComment, Post);
