import { Model } from 'mongoose';
import {
  AlumniGender,
  IAlumniPersonalDetails,
} from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { AlumniPersonalDetails } from '../../../../models/alumni';
import Joi from 'joi';
import { AppError, CommonErrors } from '../../../../utils/errors';

const getMyPersonalDetails =
  (personalDetailsModel: Model<IAlumniPersonalDetails>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const personalDetails = await personalDetailsModel.findOne({
        account: id,
      });
      if (!personalDetails) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni personal details not found',
        );
      }

      res.status(200).json({ details: personalDetails });
    } catch (err) {
      next(err);
    }
  };

const upsertMyPersonalDetails =
  (personalDetailsModel: Model<IAlumniPersonalDetails>): RequestHandler =>
  async (req, res, next) => {
    try {
      // Validate request body
      const schema = Joi.object({
        name: Joi.string().required(),
        alias: Joi.string().required(),
        profilePicture: Joi.string().uri().valid('').optional(),
        bannerPicture: Joi.string().uri().valid('').optional(),
        bio: Joi.string().min(0).optional(),
        dob: Joi.date().optional(),
        gender: Joi.string()
          .valid(...Object.values(AlumniGender))
          .required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          error.message,
        );
      }

      const { id } = req.user;
      await personalDetailsModel.findOneAndUpdate(
        { account: id },
        { ...req.body, account: id },
        { upsert: true },
      );

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = getMyPersonalDetails(AlumniPersonalDetails);
export const put = upsertMyPersonalDetails(AlumniPersonalDetails);
