import { Model } from 'mongoose';
import {
  IAlumniContactDetails,
  IAlumniEducationDetails,
  IAlumniProfessionalDetails,
} from '../../../../types/models/alumni';
import { RequestHandler } from 'express';
import {
  AlumniContactDetails,
  AlumniEducationDetails,
  AlumniProfessionalDetails,
} from '../../../../models/alumni';
import { AppError, CommonErrors } from '../../../../utils/errors';

type FilterType =
  | 'year' // year of graduation
  | 'branch'
  | 'degree'
  | 'company'
  | 'location' // city
  | 'designation';

interface SuggestionResult {
  value: string;
  count: number;
}

const getSearchFilterSuggestions =
  (
    contactDetailsModel: Model<IAlumniContactDetails>,
    educationDetailsModel: Model<IAlumniEducationDetails>,
    professionalDetailsModel: Model<IAlumniProfessionalDetails>,
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      // Extract and validate query parameters
      const { ft: filterType, limit = 5 } = req.query;
      const suggestionLimit = Math.min(Math.max(Number(limit) || 5, 1), 20); // Limit between 1 and 20, default 5

      if (!filterType) {
        throw new AppError(
          CommonErrors.BadRequest.name,
          CommonErrors.BadRequest.statusCode,
          'Filter type (ft) is required',
        );
      }

      let suggestions: SuggestionResult[] = [];

      // Helper function to standardize aggregation across models
      const getAggregatedSuggestions = async (
        model:
          | Model<IAlumniContactDetails>
          | Model<IAlumniProfessionalDetails>
          | Model<IAlumniEducationDetails>,
        field: string,
      ): Promise<SuggestionResult[]> => {
        try {
          return await model.aggregate([
            // To improve performance by reducing documents in pipeline
            { $match: { [field]: { $ne: '' } } },
            { $match: { [field]: { $ne: null } } },
            // Group by field and count occurrences
            { $group: { _id: `$${field}`, count: { $sum: 1 } } },
            // Sort by count in descending
            { $sort: { count: -1 } },
            // Limit results
            { $limit: suggestionLimit },
            // Project to standardize result format
            { $project: { _id: 0, value: '$_id', count: 1 } },
          ]);
        } catch (_) {
          return [];
        }
      };

      switch (filterType as FilterType) {
        case 'location':
          suggestions = await getAggregatedSuggestions(
            contactDetailsModel,
            'city',
          );
          break;

        case 'company':
          suggestions = await getAggregatedSuggestions(
            professionalDetailsModel,
            'currentCompany',
          );
          break;

        case 'designation':
          suggestions = await getAggregatedSuggestions(
            professionalDetailsModel,
            'designation',
          );
          break;

        case 'year':
          suggestions = await getAggregatedSuggestions(
            educationDetailsModel,
            'yearOfGraduation',
          );
          break;

        case 'branch':
          suggestions = await getAggregatedSuggestions(
            educationDetailsModel,
            'branch',
          );
          break;

        case 'degree':
          suggestions = await getAggregatedSuggestions(
            educationDetailsModel,
            'degree',
          );
          break;

        default:
          throw new AppError(
            CommonErrors.BadRequest.name,
            CommonErrors.BadRequest.statusCode,
            `Invalid filter type: ${filterType}`,
          );
      }

      // Add cache control headers for better performance
      res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes

      return res.status(200).json({
        suggestions,
        _meta: {
          ft: filterType,
          total: suggestions.length,
          limit: suggestionLimit,
        },
      });
    } catch (err) {
      next(err);
    }
  };

export const get = getSearchFilterSuggestions(
  AlumniContactDetails,
  AlumniEducationDetails,
  AlumniProfessionalDetails,
);
