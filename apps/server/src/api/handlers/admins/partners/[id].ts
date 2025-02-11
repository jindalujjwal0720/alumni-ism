import { RequestHandler } from 'express';
import User from '../../../../models/user';
import { Model } from 'mongoose';
import { IUser } from '../../../../types/models/user';
import { AppError, CommonErrors } from '../../../../utils/errors';

const updatePartner =
  (userModel: Model<IUser>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { partnerData } = req.body;

      const user = await userModel.findById(id);
      if (!user) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'User not found',
        );
      }

      user.partnerData = partnerData;

      await user.save();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

const deletePartner =
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

export const put = updatePartner(User);
export const del = deletePartner(User);
