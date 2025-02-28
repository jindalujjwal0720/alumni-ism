import { Model } from 'mongoose';
import {
  AlumniVerificationDocType,
  IAlumniVerificationDetails,
} from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { AlumniVerificationDetails } from '../../../../models/alumni';
import Joi from 'joi';
import { AppError, CommonErrors } from '../../../../utils/errors';

const getMyVerificationDetails =
  (
    verificationDetailsModel: Model<IAlumniVerificationDetails>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const verificationDetails = await verificationDetailsModel.findOne({
        account: id,
      });
      if (!verificationDetails) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni verification details not found',
        );
      }

      res.status(200).json({ details: verificationDetails });
    } catch (err) {
      next(err);
    }
  };

const upsertMyVerificationDetails =
  (
    verificationDetailsModel: Model<IAlumniVerificationDetails>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      // Validate request body
      const schema = Joi.object({
        verificationDocType: Joi.string()
          .valid(...Object.values(AlumniVerificationDocType))
          .required(),
        verificationDocLink: Joi.string().required(),
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
      await verificationDetailsModel.findOneAndUpdate(
        { account: id },
        { ...req.body, account: id },
        { upsert: true },
      );

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = getMyVerificationDetails(AlumniVerificationDetails);
export const put = upsertMyVerificationDetails(AlumniVerificationDetails);
