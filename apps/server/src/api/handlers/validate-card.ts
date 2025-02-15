import { RequestHandler } from 'express';
import User from '../../models/user';
import { IUser } from '../../types/models/user';
import { AppError, CommonErrors } from '../../utils/errors';
import { Model } from 'mongoose';

const checkCardValidity =
  (userModel: Model<IUser>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.query;

      const user = await userModel
        .findOne({
          studentData: { $exists: true },
          'studentData.ucn': `${id}`,
          studentDataVerified: true,
        })
        .select('studentData');
      if (!user) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Student not found',
        );
      }

      res.status(200).json({
        valid: true,
      });
    } catch (err) {
      next(err);
    }
  };

export const get = checkCardValidity(User);
