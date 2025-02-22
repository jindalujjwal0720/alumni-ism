import { Model } from 'mongoose';
import {
  AlumniGender,
  AlumniVerificationDocType,
  IAlumni,
} from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import Alumni from '../../../../models/alumni';
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
      const schema = Joi.object({
        // personal details
        personal: Joi.object({
          name: Joi.string().required(),
          alias: Joi.string().required(),
          profilePicture: Joi.string().optional(),
          bio: Joi.string().optional(),
          dob: Joi.date().optional(),
          gender: Joi.string()
            .valid(...Object.values(AlumniGender))
            .required(),
        }).optional(),
        // contact details
        contact: Joi.object({
          phone: Joi.string().required(),
          email: Joi.string().required(),

          city: Joi.string().required(),
          state: Joi.string().required(),
          country: Joi.string().required(),
          zip: Joi.string().required(),

          linkedIn: Joi.string().optional(),
          twitter: Joi.string().optional(),
          website: Joi.string().optional(),
        }).optional(),
        // education details
        education: Joi.object({
          degree: Joi.string().required(),
          branch: Joi.string().required(),
          yearOfGraduation: Joi.number().required(),
        }).optional(),
        // professional details
        professional: Joi.object({
          currentCompany: Joi.string().optional(),
          designation: Joi.string().optional(),
          currentCompanyWebsite: Joi.string().optional(),
          totalExperienceYears: Joi.number().optional(),
        }).optional(),
        // verification details
        verification: Joi.object({
          verificationDocType: Joi.string()
            .valid(...Object.values(AlumniVerificationDocType))
            .required(),
          verificationDocLink: Joi.string().required(),
        }).optional(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          error.message,
        );
      }

      // Update alumni data
      alumni.personal = req.body.personal ?? alumni.personal;
      alumni.contact = req.body.contact ?? alumni.contact;
      alumni.education = req.body.education ?? alumni.education;
      alumni.professional = req.body.professional ?? alumni.professional;
      alumni.verification = req.body.verification ?? alumni.verification;

      await alumni.save();

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = readMyAlumniData(Alumni);
export const post = createOrUpdateMyAlumniData(Alumni);
