import { Model } from 'mongoose';
import { IAlumni } from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { Alumni } from '../../../../models/alumni';
import { generateSearchSuggestionsPipeline } from '../../../../constants/queries/alumni-search-suggestions';

const getSearchSuggestions =
  (personalDetailsModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id: userId } = req.user;

      const pipeline = generateSearchSuggestionsPipeline(userId);
      const suggestions = await personalDetailsModel.aggregate(pipeline);

      res.status(200).json({
        suggestions,
        _meta: {
          total: suggestions.length,
        },
      });
    } catch (err) {
      next(err);
    }
  };

export const get = getSearchSuggestions(Alumni);
