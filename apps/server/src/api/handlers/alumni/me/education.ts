import { Model } from 'mongoose';
import { IAlumniEducationDetails } from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { AlumniEducationDetails } from '../../../../models/alumni';
import Joi from 'joi';
import { AppError, CommonErrors } from '../../../../utils/errors';

const getMyEducationDetails =
  (educationDetailsModel: Model<IAlumniEducationDetails>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const educationDetails = await educationDetailsModel.findOne({
        account: id,
      });
      if (!educationDetails) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni education details not found',
        );
      }

      res.status(200).json({ details: educationDetails });
    } catch (err) {
      next(err);
    }
  };

const upsertMyEducationDetails =
  (educationDetailsModel: Model<IAlumniEducationDetails>): RequestHandler =>
  async (req, res, next) => {
    try {
      // Validate request body
      const schema = Joi.object({
        degree: Joi.string().required(),
        branch: Joi.string().required(),
        yearOfGraduation: Joi.number().required(),
        admissionNumber: Joi.string().required(),
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
      await educationDetailsModel.findOneAndUpdate(
        { account: id },
        { ...req.body, account: id },
        { upsert: true },
      );

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = getMyEducationDetails(AlumniEducationDetails);
export const put = upsertMyEducationDetails(AlumniEducationDetails);
