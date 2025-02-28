import { Model } from 'mongoose';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import {
  IAlumni,
  IAlumniProfessionalDetails,
} from '../../../../../types/models/alumni';
import {
  Alumni,
  AlumniProfessionalDetails,
} from '../../../../../models/alumni';

const readAlumniProfessionalPublicDetails =
  (
    alumniModel: Model<IAlumni>,
    professionalModel: Model<IAlumniProfessionalDetails>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const { ucn } = req.params;
      const alumni = await alumniModel.findOne({ ucn }).select('account');
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni not found',
        );
      }

      const fields = {
        currentCompany: 1,
        designation: 1,
        currentCompanyWebsite: 1,
        totalExperienceYears: 1,
      };

      const details = await professionalModel
        .find({ account: alumni.account })
        .select(fields);

      res.status(200).json({ details });
    } catch (err) {
      next(err);
    }
  };

export const get = readAlumniProfessionalPublicDetails(
  Alumni,
  AlumniProfessionalDetails,
);
