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

      const fields = [
        prefs?.showPhone || ALUMNI_PUBLIC_PROFILE_PREFERENCES.showPhone
          ? 'phone'
          : '',
        prefs?.showEmail || ALUMNI_PUBLIC_PROFILE_PREFERENCES.showEmail
          ? 'email'
          : '',
        'city',
        'state',
        'country',
        prefs?.showZip || ALUMNI_PUBLIC_PROFILE_PREFERENCES.showZip
          ? 'zip'
          : '',
        'linkedin',
        'twitter',
        'website',
      ].filter((field) => field);

      const details = await contactModel
        .findOne({ account: alumni.account })
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
