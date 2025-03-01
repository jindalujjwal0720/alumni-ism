import { Model } from 'mongoose';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import { IAlumni } from '../../../../../types/models/alumni';
import { Alumni } from '../../../../../models/alumni';
import { IAlumniFollow } from '../../../../../types/models/follow';
import { AlumniFollow } from '../../../../../models/follow';

const readAlumniPublicData =
  (
    alumniModel: Model<IAlumni>,
    followModel: Model<IAlumniFollow>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const { ucn } = req.params;
      const { id: userId } = req.user ?? {};
      const alumni = await alumniModel.findOne({ ucn }).select('ucn validity');
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni not found',
        );
      }

      const following = await followModel.findOne({
        follower: userId,
        following: alumni.account,
      });

      res.status(200).json({ alumni, isFollowing: !!following });
    } catch (err) {
      next(err);
    }
  };

export const get = readAlumniPublicData(Alumni, AlumniFollow);
