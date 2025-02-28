import { Model } from 'mongoose';
import { IAlumniProfessionalDetails } from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { AlumniProfessionalDetails } from '../../../../models/alumni';
import Joi from 'joi';
import { AppError, CommonErrors } from '../../../../utils/errors';

const getMyProfessionalDetails =
  (
    professionalDetailsModel: Model<IAlumniProfessionalDetails>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const professionalDetails = await professionalDetailsModel.findOne({
        account: id,
      });
      if (!professionalDetails) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni professional details not found',
        );
      }

      res.status(200).json({ details: professionalDetails });
    } catch (err) {
      next(err);
    }
  };

const upsertMyProfessionalDetails =
  (
    professionalDetailsModel: Model<IAlumniProfessionalDetails>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      // Validate request body
      const schema = Joi.object({
        currentCompany: Joi.string().optional(),
        designation: Joi.string().optional(),
        currentCompanyWebsite: Joi.string().optional(),
        totalExperienceYears: Joi.number().optional(),
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
      await professionalDetailsModel.findOneAndUpdate(
        { account: id },
        { ...req.body, account: id },
        { upsert: true },
      );

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = getMyProfessionalDetails(AlumniProfessionalDetails);
export const put = upsertMyProfessionalDetails(AlumniProfessionalDetails);
