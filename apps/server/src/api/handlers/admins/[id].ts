import { RequestHandler } from 'express';
import { Model } from 'mongoose';
import { IUser } from '../../../types/models/user';
import User from '../../../models/user';

const deleteAdmin =
  (userModel: Model<IUser>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await userModel.findByIdAndDelete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const del = deleteAdmin(User);
