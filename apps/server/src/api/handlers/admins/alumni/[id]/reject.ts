import { RequestHandler } from 'express';
import { Model } from 'mongoose';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import {
  AlumniVerificationStatus,
  IAlumni,
} from '../../../../../types/models/alumni';
import { Alumni } from '../../../../../models/alumni';
import Joi from 'joi';

const rejectAlumni =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const schema = Joi.object({
        rejectionReason: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          error.message,
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

      alumni.verificationStatus = AlumniVerificationStatus.REJECTED;
      alumni.rejectionReason = req.body.rejectionReason;

      await alumni.save();

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const post = rejectAlumni(Alumni);
