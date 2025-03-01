import { Model } from 'mongoose';
import { IAlumni } from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { Alumni } from '../../../../models/alumni';

const getSearchResults =
  (_alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(200).json({ results: [] });
      }
      return { results: [] };
    } catch (err) {
      next(err);
    }
  };

export const get = getSearchResults(Alumni);
