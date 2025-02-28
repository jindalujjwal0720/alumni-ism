import { Model } from 'mongoose';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import {
  IAlumni,
  IAlumniContactDetails,
  IAlumniPublicProfilePreferences,
} from '../../../../../types/models/alumni';
import {
  Alumni,
  AlumniContactDetails,
  AlumniPublicProfilePreferences,
} from '../../../../../models/alumni';
import { ALUMNI_PUBLIC_PROFILE_PREFERENCES } from '../../../../../constants/alumni';

const readAlumniContactPublicDetails =
  (
    alumniModel: Model<IAlumni>,
    contactModel: Model<IAlumniContactDetails>,
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

      const fields = {
        phone:
          prefs?.showPhone || ALUMNI_PUBLIC_PROFILE_PREFERENCES.showPhone
            ? 1
            : 0,
        email:
          prefs?.showEmail || ALUMNI_PUBLIC_PROFILE_PREFERENCES.showEmail
            ? 1
            : 0,
        city: 1,
        state: 1,
        country: 1,
        zip:
          prefs?.showZip || ALUMNI_PUBLIC_PROFILE_PREFERENCES.showZip ? 1 : 0,
        linkedin: 1,
        twitter: 1,
        website: 1,
      };

      const details = await contactModel
        .find({ account: alumni.account })
        .select(fields);

      res.status(200).json({ details });
    } catch (err) {
      next(err);
    }
  };

export const get = readAlumniContactPublicDetails(
  Alumni,
  AlumniContactDetails,
  AlumniPublicProfilePreferences,
);
