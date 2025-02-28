import { Model } from 'mongoose';
import { IAlumniContactDetails } from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { AlumniContactDetails } from '../../../../models/alumni';
import Joi from 'joi';
import { AppError, CommonErrors } from '../../../../utils/errors';

const getMyContactDetails =
  (contactDetailsModel: Model<IAlumniContactDetails>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const contactDetails = await contactDetailsModel.findOne({
        account: id,
      });
      if (!contactDetails) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni contact details not found',
        );
      }

      res.status(200).json({ details: contactDetails });
    } catch (err) {
      next(err);
    }
  };

const upsertMyContactDetails =
  (contactDetailsModel: Model<IAlumniContactDetails>): RequestHandler =>
  async (req, res, next) => {
    try {
      // Validate request body
      const schema = Joi.object({
        phone: Joi.string().required(),
        email: Joi.string().required(),

        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        zip: Joi.string().required(),

        linkedIn: Joi.string().min(0).optional(),
        twitter: Joi.string().min(0).optional(),
        website: Joi.string().min(0).optional(),
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
      await contactDetailsModel.findOneAndUpdate(
        { account: id },
        { ...req.body, account: id },
        { upsert: true },
      );

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = getMyContactDetails(AlumniContactDetails);
export const put = upsertMyContactDetails(AlumniContactDetails);
