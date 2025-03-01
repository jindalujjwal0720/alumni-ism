/**
 * @file This file contains the query to generate search suggestions for alumni.
 *
 * The query is used to generate search suggestions for alumni based on the user's profile.
 *
 * for visual or editing the pipeline, use MongoDB Compass Pipeline Aggregation.
 */

import mongoose, { PipelineStage } from 'mongoose';

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
        from: 'alumnipersonaldetails',
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
        from: 'alumnieducationdetails',
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
        from: 'alumnifollows',
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
        from: 'alumnis',
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
              from: 'alumnipersonaldetails',
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
              from: 'alumniEducationDetails',
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
              from: 'alumniProfessionalDetails',
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
              from: 'alumniAnalytics',
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
              from: 'follows',
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
              mutualConnections: {
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
