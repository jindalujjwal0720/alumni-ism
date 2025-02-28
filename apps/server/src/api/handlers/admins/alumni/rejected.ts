import { RequestHandler } from 'express';
import { Model } from 'mongoose';
import {
  IAlumni,
  AlumniVerificationStatus,
} from '../../../../types/models/alumni';
import { Alumni } from '../../../../models/alumni';

const listRejectedAlumni =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const alumni = await alumniModel.find({
        verificationStatus: AlumniVerificationStatus.PENDING,
      });
      res.status(200).json({ alumni });
    } catch (err) {
      next(err);
    }
  };

export const get = listRejectedAlumni(Alumni);
