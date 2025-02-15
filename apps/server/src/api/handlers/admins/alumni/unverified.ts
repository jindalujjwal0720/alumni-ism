import { RequestHandler } from 'express';
import { Model } from 'mongoose';
import { IAlumni } from '../../../../types/models/alumni';
import Alumni from '../../../../models/alumni';

const listUnverifiedAlumni =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const alumni = await alumniModel.find({ isVerified: false });
      res.status(200).json({ alumni });
    } catch (err) {
      next(err);
    }
  };

export const get = listUnverifiedAlumni(Alumni);
