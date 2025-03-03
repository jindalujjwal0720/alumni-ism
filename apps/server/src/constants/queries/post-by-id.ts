/**
 * @file This file contains the query to generate posts for the alumni feed.
 *
 * Note: for visual or editing the pipeline, use MongoDB Compass Pipeline Aggregation.
 */

import mongoose, { PipelineStage } from 'mongoose';

const ALUMNIS = 'alumnis';
const ALUMNI_PERSONAL_DETAILS = 'alumnipersonaldetails';
const POST_ANALYTICS = 'postanalytics';
const ALUMNI_PROFESSIONAL_DETAILS = 'alumniprofessionaldetails';

export const generateGetPostByIdPipeline = (
  postId: string,
): PipelineStage[] => {
  return [
    { $match: { _id: new mongoose.Types.ObjectId(postId) } },
    {
      $lookup: {
        from: ALUMNIS,
        localField: 'account',
        foreignField: 'account',
        as: 'authorDetails',
      },
    },
    {
      $lookup: {
        from: ALUMNI_PERSONAL_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'authorPersonalDetails',
      },
    },
    {
      $lookup: {
        from: ALUMNI_PROFESSIONAL_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'authorProfessionalDetails',
      },
    },
    {
      $lookup: {
        from: POST_ANALYTICS,
        localField: '_id',
        foreignField: 'post',
        as: 'analytics',
      },
    },
    {
      $addFields: {
        analytics: {
          $arrayElemAt: ['$analytics', 0],
        },
        author: {
          ucn: { $arrayElemAt: ['$authorDetails.ucn', 0] },
          name: { $arrayElemAt: ['$authorPersonalDetails.name', 0] },
          profilePicture: {
            $arrayElemAt: ['$authorPersonalDetails.profilePicture', 0],
          },
          designation: {
            $arrayElemAt: ['$authorProfessionalDetails.designation', 0],
          },
          company: {
            $arrayElemAt: ['$authorProfessionalDetails.currentCompany', 0],
          },
        },
      },
    },
    {
      $project: {
        authorDetails: 0,
        authorPersonalDetails: 0,
        authorProfessionalDetails: 0,
        'analytics._id': 0,
        'analytics.post': 0,
      },
    },
    { $limit: 1 },
  ];
};
