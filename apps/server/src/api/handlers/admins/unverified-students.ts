import { RequestHandler } from 'express';
import User from '../../../models/user';
import { Model } from 'mongoose';
import { IUser } from '../../../types/models/user';

const listUnverifiedStudents =
  (userModel: Model<IUser>): RequestHandler =>
  async (req, res, next) => {
    try {
      const unverifiedStudents = await userModel.find({
        roles: 'student',
        studentData: { $exists: true },
        studentDataVerified: false,
      });
      res.json({ students: unverifiedStudents });
    } catch (err) {
      next(err);
    }
  };

export const get = listUnverifiedStudents(User);
