import { Model } from 'mongoose';
import { IAlumni } from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import { Alumni } from '../../../../models/alumni';
import Joi from 'joi';
import { AppError, CommonErrors } from '../../../../utils/errors';
import { generateSearchResultsPipeline } from '../../../../constants/queries/alumni-search-results';

interface SearchQuery {
  q?: string;

  limit?: number;
  page?: number;

  location?: string;
  company?: string;
  designation?: string;
  year?: string;
  branch?: string;
  degree?: string;
}

const getSearchResults =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const schema = Joi.object({
        q: Joi.string().required(),
        // Optional filters
        year: Joi.string().optional(),
        branch: Joi.string().optional(),
        degree: Joi.string().optional(),
        company: Joi.string().optional(),
        designation: Joi.string().optional(),
        location: Joi.string().optional(),
        // Pagination
        limit: Joi.number().optional(),
        offset: Joi.number().optional(),
      });
      const { error } = schema.validate(req.query);
      if (error) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          error.message,
        );
      }

      let {
        q = '',
        limit = 10,
        page = 1,
        ...filters
      } = req.query as SearchQuery;
      limit = Math.min(Math.max(Number(limit) || 10, 1), 50); // Limit between 1 and 50, default 10
      const offset = Math.max(Number(page) - 1 || 0, 0) * limit; // Offset >= 0
      filters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value),
      );

      const pipeline = generateSearchResultsPipeline(q?.toString(), filters, {
        limit,
        offset,
      });
      const results = await alumniModel.aggregate(pipeline);

      res.status(200).json({
        results,
        _meta: {
          limit,
          offset,
        },
      });
    } catch (err) {
      next(err);
    }
  };

export const get = getSearchResults(Alumni);
