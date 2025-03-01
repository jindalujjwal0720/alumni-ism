import { Model } from 'mongoose';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import {
  IAlumni,
  IAlumniEducationDetails,
  IAlumniPublicProfilePreferences,
} from '../../../../../types/models/alumni';
import {
  Alumni,
  AlumniEducationDetails,
  AlumniPublicProfilePreferences,
} from '../../../../../models/alumni';
import { ALUMNI_PUBLIC_PROFILE_PREFERENCES } from '../../../../../constants/alumni';

const readAlumniEducationPublicDetails =
  (
    alumniModel: Model<IAlumni>,
    educationModel: Model<IAlumniEducationDetails>,
    preferencesModel: Model<IAlumniPublicProfilePreferences>,
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

      const prefs = await preferencesModel.findOne({ account: alumni.account });

      const fields = [
        'degree',
        'branch',
        'yearOfGraduation',
        prefs?.showAdmissionNumber ||
        ALUMNI_PUBLIC_PROFILE_PREFERENCES.showAdmissionNumber
          ? 'admissionNumber'
          : '',
      ].filter((field) => field);

      const details = await educationModel
        .findOne({ account: alumni.account })
        .select(fields);

      res.status(200).json({ details });
    } catch (err) {
      next(err);
    }
  };

export const get = readAlumniEducationPublicDetails(
  Alumni,
  AlumniEducationDetails,
  AlumniPublicProfilePreferences,
);
