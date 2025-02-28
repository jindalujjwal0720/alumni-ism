import { RequestHandler } from 'express';
import { Model, PipelineStage } from 'mongoose';
import {
  IAlumni,
  AlumniVerificationStatus,
} from '../../../../types/models/alumni';
import { Alumni } from '../../../../models/alumni';

const listUnverifiedAlumni =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const pipeline: PipelineStage[] = [
        // Match all alumni with pending verification status
        {
          $match: {
            verificationStatus: AlumniVerificationStatus.PENDING,
          },
        },
        // fetch name from personal details
        {
          $lookup: {
            from: 'alumnipersonaldetails',
            localField: 'account',
            foreignField: 'account',
            as: 'personal',
          },
        },
        {
          $unwind: '$personal',
        },
        // fetch email, phone from contact details
        {
          $lookup: {
            from: 'alumnicontactdetails',
            localField: 'account',
            foreignField: 'account',
            as: 'contact',
          },
        },
        {
          $unwind: '$contact',
        },
        // fetch year of graduation from education details
        {
          $lookup: {
            from: 'alumnieducationdetails',
            localField: 'account',
            foreignField: 'account',
            as: 'education',
          },
        },
        {
          $unwind: '$education',
        },
        {
          $project: {
            'personal.name': 1,
            'contact.phone': 1,
            'contact.email': 1,
            'education.yearOfGraduation': 1,
          },
        },
      ];

      const alumni = await alumniModel.aggregate(pipeline);

      res.status(200).json({ alumni });
    } catch (err) {
      next(err);
    }
  };

export const get = listUnverifiedAlumni(Alumni);
