/**
 * @file This file contains the query to generate posts for the alumni feed.
 *
 * Note: for visual or editing the pipeline, use MongoDB Compass Pipeline Aggregation.
 */

import mongoose, { PipelineStage } from 'mongoose';

const ALUMNIS = 'alumnis';
const ALUMNI_PERSONAL_DETAILS = 'alumnipersonaldetails';
const ALUMNI_PROFESSIONAL_DETAILS = 'alumniprofessionaldetails';

export const generatePostCommentsPipeline = (
  postId: string,
  { limit = 10, offset = 0 }: { limit?: number; offset?: number },
): PipelineStage[] => {
  return [
    // match all comments for the post
    { $match: { post: new mongoose.Types.ObjectId(postId) } },
    // join with alumni personal details
    {
      $lookup: {
        from: ALUMNIS,
        localField: 'account',
        foreignField: 'account',
        as: 'authorDetails',
      },
    },
    // join with alumni personal details
    {
      $lookup: {
        from: ALUMNI_PERSONAL_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'authorPersonalDetails',
      },
    },
    // join with alumni professional details
    {
      $lookup: {
        from: ALUMNI_PROFESSIONAL_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'authorProfessionalDetails',
      },
    },
    {
      $addFields: {
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
      },
    },
    // sort by created date
    { $sort: { createdAt: -1 } },
    // limit the number of comments for pagination
    { $skip: offset },
    { $limit: limit },
  ];
};
