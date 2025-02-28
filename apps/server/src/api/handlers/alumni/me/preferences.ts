import { Model } from 'mongoose';
import { IAlumniPublicProfilePreferences } from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { AlumniPublicProfilePreferences } from '../../../../models/alumni';
import Joi from 'joi';
import { AppError, CommonErrors } from '../../../../utils/errors';

const getMyPreferences =
  (preferencesModel: Model<IAlumniPublicProfilePreferences>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const preferences = await preferencesModel.findOne({
        account: id,
      });
      if (!preferences) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni preferences not found',
        );
      }

      res.status(200).json({ details: preferences });
    } catch (err) {
      next(err);
    }
  };

const upsertMyPreferences =
  (preferencesModel: Model<IAlumniPublicProfilePreferences>): RequestHandler =>
  async (req, res, next) => {
    try {
      // Validate request body
      const schema = Joi.object({
        showDob: Joi.boolean().required(),
        showGender: Joi.boolean().required(),

        showEmail: Joi.boolean().required(),
        showPhone: Joi.boolean().required(),
        showZip: Joi.boolean().required(),

        showAdmissionNumber: Joi.boolean().required(),
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
      await preferencesModel.findOneAndUpdate(
        { account: id },
        { ...req.body, account: id },
        { upsert: true },
      );

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = getMyPreferences(AlumniPublicProfilePreferences);
export const put = upsertMyPreferences(AlumniPublicProfilePreferences);
