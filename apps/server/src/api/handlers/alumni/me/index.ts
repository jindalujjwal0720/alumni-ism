import { Model } from 'mongoose';
import { IAlumni } from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { Alumni } from '../../../../models/alumni';
import Joi from 'joi';
import { AppError, CommonErrors } from '../../../../utils/errors';

const readMyAlumniData =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const alumni = await alumniModel.findOne({ account: id });
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni not found',
        );
      }

      res.status(200).json({ alumni });
    } catch (err) {
      next(err);
    }
  };

const createOrUpdateMyAlumniData =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      let alumni = await alumniModel.findOne({ account: id });
      if (!alumni) {
        alumni = new alumniModel({ account: id });
      }

      // Validate request body
      const schema = Joi.object({});
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          error.message,
        );
      }

      await alumni.save();

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = readMyAlumniData(Alumni);
export const post = createOrUpdateMyAlumniData(Alumni);
