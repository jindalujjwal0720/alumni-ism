import { Model } from 'mongoose';
import { IPost, MediaType } from '../../../types/models/post';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../utils/errors';
import { Post } from '../../../models/post';
import Joi from 'joi';

const createPost =
  (postModel: Model<IPost>): RequestHandler =>
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        body: Joi.string().required(),
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

      await postModel.create({
        ...req.body,
        account: req.user.id,
      });

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const post = createPost(Post);
