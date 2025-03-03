/**
 * @file This file contains the query to generate search suggestions for alumni.
 *
 * Note: for visual or editing the pipeline, use MongoDB Compass Pipeline Aggregation.
 */

import mongoose, { PipelineStage } from 'mongoose';

const ALUMNI_PERSONAL_DETAILS = 'alumnipersonaldetails';
const ALUMNI_EDUCATION_DETAILS = 'alumnieducationdetails';
const ALUMNI_FOLLOWS = 'alumnifollows';
const ALUMNIS = 'alumnis';
const ALUMNI_PROFESSIONAL_DETAILS = 'alumniprofessionaldetails';
const ALUMNI_ANALYTICS = 'alumnianalytics';

export const generateSearchSuggestionsPipeline = (
  userId: string,
): PipelineStage[] => {
  return [
    {
      $match: {
        account: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: ALUMNI_FOLLOWS,
        localField: 'account',
        foreignField: 'follower',
        as: 'following',
      },
    },
    {
      $lookup: {
        from: ALUMNI_PERSONAL_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'personal',
      },
    },
    {
      $lookup: {
        from: ALUMNI_EDUCATION_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'education',
      },
    },
    {
      $project: {
        followingIds: '$following.following',
        myDegree: {
          $arrayElemAt: ['$education.degree', 0],
        },
        myBranch: {
          $arrayElemAt: ['$education.branch', 0],
        },
        myGradYear: {
          $arrayElemAt: ['$education.yearOfGraduation', 0],
        },
      },
    },
    {
      $lookup: {
        from: ALUMNIS,
        let: {
          currentUser: new mongoose.Types.ObjectId(userId),
          followingIds: '$followingIds',
          myDegree: '$myDegree',
          myBranch: '$myBranch',
          myGradYear: '$myGradYear',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $ne: ['$account', '$$currentUser'],
                  },
                  {
                    $not: {
                      $in: ['$account', '$$followingIds'],
                    },
                  },
                ],
              },
            },
          },
          {
            $lookup: {
              from: ALUMNI_PERSONAL_DETAILS,
              localField: 'account',
              foreignField: 'account',
              as: 'personal',
            },
          },
          {
            $lookup: {
              from: ALUMNI_EDUCATION_DETAILS,
              localField: 'account',
              foreignField: 'account',
              as: 'education',
            },
          },
          {
            $lookup: {
              from: ALUMNI_PROFESSIONAL_DETAILS,
              localField: 'account',
              foreignField: 'account',
              as: 'professional',
            },
          },
          {
            $lookup: {
              from: ALUMNI_ANALYTICS,
              localField: 'account',
              foreignField: 'account',
              as: 'analytics',
            },
          },
          {
            $lookup: {
              from: ALUMNI_FOLLOWS,
              let: { alumniId: '$account' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $in: ['$follower', '$$followingIds'] },
                        { $eq: ['$following', '$$alumniId'] },
                      ],
                    },
                  },
                },
              ],
              as: 'mutualFollows',
            },
          },
          {
            $addFields: {
              personal: { $arrayElemAt: ['$personal', 0] },
              education: { $arrayElemAt: ['$education', 0] },
              professional: { $arrayElemAt: ['$professional', 0] },
              analytics: { $arrayElemAt: ['$analytics', 0] },
              mutualCount: { $size: '$mutualFollows' },
              score: {
                $add: [
                  { $multiply: ['$mutualCount', 10] },
                  {
                    $cond: [{ $eq: ['$education.degree', '$$myDegree'] }, 5, 0],
                  },
                  {
                    $cond: [{ $eq: ['$education.branch', '$$myBranch'] }, 8, 0],
                  },
                  {
                    $cond: [
                      {
                        $and: [
                          { $ne: ['$education.yearOfGraduation', null] },
                          {
                            $lte: [
                              {
                                $abs: {
                                  $subtract: [
                                    '$education.yearOfGraduation',
                                    '$$myGradYear',
                                  ],
                                },
                              },
                              2,
                            ],
                          },
                        ],
                      },
                      3,
                      0,
                    ],
                  },
                  {
                    $divide: [
                      {
                        $ifNull: ['$analytics.followersCount', 0],
                      },
                      100,
                    ],
                  },
                ],
              },
            },
          },
          { $sort: { score: -1 } },
          { $limit: 10 },
          {
            $project: {
              ucn: 1,
              account: 1,
              name: '$personal.name',
              profilePicture: '$personal.profile',
              degree: '$education.degree',
              branch: '$education.branch',
              yearOfGraduation: '$education.yearOfGraduation',
              currentCompany: '$professional.currentCompany',
              designation: '$professional.designation',
              mutualConnections: '$mutualCount',
              score: 1,
            },
          },
        ],
        as: 'suggestions',
      },
    },
    { $unwind: '$suggestions' },
    { $replaceRoot: { newRoot: '$suggestions' } },
  ];
};
