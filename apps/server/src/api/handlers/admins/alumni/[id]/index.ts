import { Model } from 'mongoose';
import { IAlumni } from '../../../../../types/models/alumni';
import { RequestHandler } from 'express';
import Alumni from '../../../../../models/alumni';
import { AppError, CommonErrors } from '../../../../../utils/errors';

const readAlumniData =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          'Alumni ID is required',
        );
      }
      const alumni = await alumniModel.findById(id);
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

export const get = readAlumniData(Alumni);
