import { Model } from 'mongoose';
import { RequestHandler } from 'express';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import { IAlumni } from '../../../../../types/models/alumni';
import { Alumni } from '../../../../../models/alumni';

const readAlumniPublicData =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { ucn } = req.params;
      const alumni = await alumniModel.findOne({ ucn }).select('ucn validity');
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni not found',
        );
      }

      res.status(200).json({ alumni });
    } catch (err) {
      next(err);
    }
  };

export const get = readAlumniPublicData(Alumni);
