import { Model } from 'mongoose';
import {
  IAlumni,
  IAlumniContactDetails,
  IAlumniEducationDetails,
  IAlumniPersonalDetails,
  IAlumniProfessionalDetails,
  IAlumniVerificationDetails,
} from '../../../../../types/models/alumni';
import { RequestHandler } from 'express';
import {
  Alumni,
  AlumniContactDetails,
  AlumniEducationDetails,
  AlumniPersonalDetails,
  AlumniProfessionalDetails,
  AlumniVerificationDetails,
} from '../../../../../models/alumni';
import { AppError, CommonErrors } from '../../../../../utils/errors';

const readAlumniData =
  (
    alumniModel: Model<IAlumni>,
    personalDetailsModel: Model<IAlumniPersonalDetails>,
    contactDetailsModel: Model<IAlumniContactDetails>,
    educationDetailsModel: Model<IAlumniEducationDetails>,
    professionalDetailsModel: Model<IAlumniProfessionalDetails>,
    verificationDetailsModel: Model<IAlumniVerificationDetails>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          'Alumni ID is required',
        );
      }

      const alumni = await alumniModel.findById(id);
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni not found',
        );
      }

      const details = await Promise.all([
        personalDetailsModel.findOne({ account: alumni.account }),
        contactDetailsModel.findOne({ account: alumni.account }),
        educationDetailsModel.findOne({ account: alumni.account }),
        professionalDetailsModel.findOne({ account: alumni.account }),
        verificationDetailsModel.findOne({ account: alumni.account }),
      ]);

      res.status(200).json({
        alumni,
        personal: details[0],
        contact: details[1],
        education: details[2],
        professional: details[3],
        verification: details[4],
      });
    } catch (err) {
      next(err);
    }
  };

export const get = readAlumniData(
  Alumni,
  AlumniPersonalDetails,
  AlumniContactDetails,
  AlumniEducationDetails,
  AlumniProfessionalDetails,
  AlumniVerificationDetails,
);
