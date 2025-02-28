import { Model } from 'mongoose';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import {
  IAlumni,
  IAlumniPersonalDetails,
  IAlumniPublicProfilePreferences,
} from '../../../../../types/models/alumni';
import {
  Alumni,
  AlumniPersonalDetails,
  AlumniPublicProfilePreferences,
} from '../../../../../models/alumni';
import { ALUMNI_PUBLIC_PROFILE_PREFERENCES } from '../../../../../constants/alumni';

const readAlumniPersonalPublicDetails =
  (
    alumniModel: Model<IAlumni>,
    personalModel: Model<IAlumniPersonalDetails>,
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
        name: 1,
        alias: 1,
        profilePicture: 1,
        bannerPicture: 1,
        bio: 1,
        dob:
          prefs?.showDob || ALUMNI_PUBLIC_PROFILE_PREFERENCES.showDob ? 1 : 0,
        gender:
          prefs?.showGender || ALUMNI_PUBLIC_PROFILE_PREFERENCES.showGender
            ? 1
            : 0,
      };

      const details = await personalModel
        .find({ account: alumni.account })
        .select(fields);

      res.status(200).json({ details });
    } catch (err) {
      next(err);
    }
  };

export const get = readAlumniPersonalPublicDetails(
  Alumni,
  AlumniPersonalDetails,
  AlumniPublicProfilePreferences,
);
