import { Model } from 'mongoose';
import { RequestHandler } from 'express';
import { IAlumniFollow } from '../../../../types/models/follow';
import { AlumniFollow } from '../../../../models/follow';
import { IAlumni } from '../../../../types/models/alumni';
import { AppError, CommonErrors } from '../../../../utils/errors';
import { Alumni } from '../../../../models/alumni';

const createAlumniFollow =
  (
    followModel: Model<IAlumniFollow>,
    alumniModel: Model<IAlumni>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const { alumniId } = req.params;
      const { id: userId } = req.user;

      const alumni = await alumniModel.findById(alumniId).select('account');
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          `Alumni not found`,
        );
      }

      await followModel.updateOne(
        { follower: userId, following: alumni.account },
        { follower: userId, following: alumni.account },
        { upsert: true },
      );

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

const removeAlumniFollow =
  (
    followModel: Model<IAlumniFollow>,
    alumniModel: Model<IAlumni>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const { alumniId } = req.params;
      const { id: userId } = req.user;

      const alumni = await alumniModel.findById(alumniId).select('account');
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          `Alumni not found`,
        );
      }

      await followModel.deleteOne({
        follower: userId,
        following: alumni.account,
      });

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const get = createAlumniFollow(AlumniFollow, Alumni);
export const put = removeAlumniFollow(AlumniFollow, Alumni);
