import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../utils/errors';
import { Model } from 'mongoose';
import { IAlumni } from '../../types/models/alumni';
import { Alumni } from '../../models/alumni';

const checkCardValidity =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.query;

      const alumni = await alumniModel.findOne({
        account: id,
      });
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni not found',
        );
      }

      if (!alumni.ucn || new Date(alumni.validity) < new Date()) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          'Card is not valid or expired',
        );
      }

      res.status(200).json({ valid: true });
    } catch (err) {
      next(err);
    }
  };

export const get = checkCardValidity(Alumni);
