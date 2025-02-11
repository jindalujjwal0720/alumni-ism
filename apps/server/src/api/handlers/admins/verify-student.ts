import { RequestHandler } from 'express';
import User from '../../../models/user';
import { AppError, CommonErrors } from '../../../utils/errors';
import { Model } from 'mongoose';
import { IUser } from '../../../types/models/user';

const verifyStudent =
  (userModel: Model<IUser>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { studentData } = req.body;

      const user = await userModel.findById(id);
      if (!user) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'User not found',
        );
      }

      user.studentData = studentData;
      user.studentDataVerified = true;

      await user.save();

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const post = verifyStudent(User);
