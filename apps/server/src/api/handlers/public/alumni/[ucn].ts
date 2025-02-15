import { Model } from 'mongoose';
import { AppError, CommonErrors } from '../../../../utils/errors';
import { RequestHandler } from 'express';
import { IAlumni } from '../../../../types/models/alumni';
import Alumni from '../../../../models/alumni';
import { IUser } from '../../../../types/models/user';
import User from '../../../../models/user';

const readAlumniPublicData =
  (alumniModel: Model<IAlumni>, userModel: Model<IUser>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { ucn } = req.params;
      const alumni = await alumniModel.findOne({ ucn }).select({
        _id: 0,
        verificationDocLink: 0,
      });
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni not found',
        );
      }
      const user = await userModel.findById(alumni.account).select('imageUrl');

      res.status(200).json({
        alumni: {
          ...alumni.toObject(),
          account: undefined,
          imageUrl: user?.imageUrl,
        },
      });
    } catch (err) {
      next(err);
    }
  };

export const get = readAlumniPublicData(Alumni, User);
