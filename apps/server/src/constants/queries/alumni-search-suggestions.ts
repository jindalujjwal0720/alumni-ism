/**
 * @file This file contains the query to generate search suggestions for alumni.
 *
 * The query is used to generate search suggestions for alumni based on the user's profile.
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
        from: ALUMNI_PERSONAL_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'myPersonal',
      },
    },
    {
      $unwind: {
        path: '$myPersonal',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: ALUMNI_EDUCATION_DETAILS,
        localField: 'account',
        foreignField: 'account',
        as: 'myEducation',
      },
    },
    {
      $unwind: {
        path: '$myEducation',
        preserveNullAndEmptyArrays: true,
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
      $project: {
        _id: 0,
        account: 1,
        myName: {
          $ifNull: ['$myPersonal.name', ''],
        },
        myProfilePicture: {
          $ifNull: ['$myPersonal.profilePicture', ''],
        },
        myDegree: {
          $ifNull: ['$myEducation.degree', ''],
        },
        myBranch: {
          $ifNull: ['$myEducation.branch', ''],
        },
        myGradYear: {
          $ifNull: ['$myEducation.yearOfGraduation', null],
        },
        followingIds: {
          $map: {
            input: {
              $ifNull: ['$following', []],
            },
            as: 'follow',
            in: '$$follow.following',
          },
        },
      },
    },
    {
      $lookup: {
        from: ALUMNIS,
        let: {
          myDegree: '$myDegree',
          myBranch: '$myBranch',
          myGradYear: '$myGradYear',
          followingIds: {
            $ifNull: ['$followingIds', []],
          },
          currentUser: new mongoose.Types.ObjectId(userId),
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
            $unwind: {
              path: '$personal',
              preserveNullAndEmptyArrays: true,
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
            $unwind: {
              path: '$education',
              preserveNullAndEmptyArrays: true,
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
            $unwind: {
              path: '$professional',
              preserveNullAndEmptyArrays: true,
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
            $addFields: {
              analytics: {
                $cond: {
                  if: {
                    $eq: [
                      {
                        $size: '$analytics',
                      },
                      0,
                    ],
                  },
                  then: [
                    {
                      followersCount: 0,
                    },
                  ],
                  else: '$analytics',
                },
              },
            },
          },
          {
            $unwind: {
              path: '$analytics',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: ALUMNI_FOLLOWS,
              let: {
                alumniId: '$account',
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$following', '$$alumniId'],
                        },
                        {
                          $in: ['$follower', '$$followingIds'],
                        },
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
              score: {
                $sum: [
                  {
                    $multiply: [
                      {
                        $size: {
                          $ifNull: ['$mutualFollows', []],
                        },
                      },
                      10,
                    ],
                  },
                  {
                    $cond: [
                      {
                        $and: [
                          {
                            $ne: [
                              {
                                $ifNull: ['$education.degree', ''],
                              },
                              '',
                            ],
                          },
                          {
                            $ne: [
                              {
                                $ifNull: ['$$myDegree', ''],
                              },
                              '',
                            ],
                          },
                          {
                            $eq: ['$education.degree', '$$myDegree'],
                          },
                        ],
                      },
                      5,
                      0,
                    ],
                  },
                  {
                    $cond: [
                      {
                        $and: [
                          {
                            $ne: [
                              {
                                $ifNull: ['$education.branch', ''],
                              },
                              '',
                            ],
                          },
                          {
                            $ne: [
                              {
                                $ifNull: ['$$myBranch', ''],
                              },
                              '',
                            ],
                          },
                          {
                            $eq: ['$education.branch', '$$myBranch'],
                          },
                        ],
                      },
                      8,
                      0,
                    ],
                  },
                  {
                    $cond: [
                      {
                        $and: [
                          {
                            $ne: [
                              {
                                $ifNull: ['$education.yearOfGraduation', null],
                              },
                              null,
                            ],
                          },
                          {
                            $ne: [
                              {
                                $ifNull: ['$$myGradYear', null],
                              },
                              null,
                            ],
                          },
                          {
                            $lte: [
                              {
                                $abs: {
                                  $subtract: [
                                    {
                                      $ifNull: [
                                        '$education.yearOfGraduation',
                                        0,
                                      ],
                                    },
                                    {
                                      $ifNull: ['$$myGradYear', 0],
                                    },
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
          {
            $sort: {
              score: -1,
            },
          },
          {
            $limit: 10,
          },
          {
            $project: {
              _id: 1,
              ucn: 1,
              account: 1,
              name: {
                $ifNull: ['$personal.name', ''],
              },
              profilePicture: {
                $ifNull: ['$personal.profile', ''],
              },
              degree: {
                $ifNull: ['$education.degree', ''],
              },
              branch: {
                $ifNull: ['$education.branch', ''],
              },
              yearOfGraduation: {
                $ifNull: ['$education.yearOfGraduation', null],
              },
              currentCompany: {
                $ifNull: ['$professional.currentCompany', ''],
              },
              designation: {
                $ifNull: ['$professional.designation', ''],
              },
              mutualFollowers: {
                $size: {
                  $ifNull: ['$mutualFollows', []],
                },
              },
              score: 1,
            },
          },
        ],
        as: 'suggestions',
      },
    },
    {
      $match: {
        suggestions: {
          $exists: true,
        },
      },
    },
    {
      $unwind: {
        path: '$suggestions',
      },
    },
    {
      $replaceRoot: {
        newRoot: '$suggestions',
      },
    },
  ];
};
