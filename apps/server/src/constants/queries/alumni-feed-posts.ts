/**
 * @file This file contains the query to generate posts for the alumni feed.
 *
 * Note: for visual or editing the pipeline, use MongoDB Compass Pipeline Aggregation.
 */

import mongoose, { PipelineStage } from 'mongoose';

const ALUMNI_PERSONAL_DETAILS = 'alumnipersonaldetails';
const ALUMNI_FOLLOWS = 'alumnifollows';
const POSTS = 'posts';
const ALUMNIS = 'alumnis';
const POST_ANALYTICS = 'postanalytics';
const POST_COMMENTS = 'postcomments';
const ALUMNI_PROFESSIONAL_DETAILS = 'alumniprofessionaldetails';

export const generatePostsForFeedPipeline = ({
  userId,
  limit = 10,
  offset = 0,
}: {
  userId: string;
  limit?: number;
  offset?: number;
}): PipelineStage[] => {
  return [
    { $match: { account: new mongoose.Types.ObjectId(userId) } },
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
        followingIds: {
          $ifNull: [
            { $map: { input: '$following', in: '$$this.following' } },
            [],
          ],
        },
      },
    },
    {
      $lookup: {
        from: POSTS,
        let: { userFollowing: '$followingIds' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $ne: ['$account', new mongoose.Types.ObjectId(userId)] },
                  {
                    $or: [
                      { $eq: ['$visibility', 'public'] },
                      {
                        $and: [
                          { $eq: ['$visibility', 'followers'] },
                          { $in: ['$account', '$$userFollowing'] },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
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
            $lookup: {
              from: POST_COMMENTS,
              let: { postId: '$_id' },
              pipeline: [
                { $match: { $expr: { $eq: ['$post', '$$postId'] } } },
                { $sort: { createdAt: -1 } },
                { $limit: 1 },
                {
                  $lookup: {
                    from: ALUMNI_PERSONAL_DETAILS,
                    localField: 'account',
                    foreignField: 'account',
                    as: 'commentAuthorPersonalDetails',
                  },
                },
                {
                  $addFields: {
                    author: {
                      $arrayElemAt: ['$commentAuthorPersonalDetails.name', 0],
                    },
                  },
                },
                {
                  $project: {
                    commentAuthorPersonalDetails: 0,
                  },
                },
              ],
              as: 'latestComment',
            },
          },
          {
            $addFields: {
              author: {
                ucn: { $arrayElemAt: ['$authorDetails.ucn', 0] },
                name: {
                  $arrayElemAt: ['$authorPersonalDetails.name', 0],
                },
                profilePicture: {
                  $arrayElemAt: ['$authorPersonalDetails.profilePicture', 0],
                },
                company: {
                  $arrayElemAt: [
                    '$authorProfessionalDetails.currentCompany',
                    0,
                  ],
                },
                designation: {
                  $arrayElemAt: ['$authorProfessionalDetails.designation', 0],
                },
              },
              analytics: { $arrayElemAt: ['$analytics', 0] },
              latestComment: { $arrayElemAt: ['$latestComment', 0] },
            },
          },
          {
            $project: {
              authorPersonalDetails: 0,
              authorProfessionalDetails: 0,
              'analytics._id': 0,
              'analytics.post': 0,
            },
          },
        ],
        as: 'posts',
      },
    },
    { $unwind: '$posts' },
    {
      $addFields: {
        'posts.score': {
          $add: [
            {
              $add: [
                {
                  $multiply: [{ $ifNull: ['$posts.analytics.likes', 0] }, 0.3],
                },
                {
                  $multiply: [
                    { $ifNull: ['$posts.analytics.comments', 0] },
                    0.7,
                  ],
                },
                {
                  $multiply: [{ $ifNull: ['$posts.analytics.shares', 0] }, 1.2],
                },
              ],
            },
            {
              $multiply: [
                100,
                {
                  $exp: {
                    $divide: [
                      { $subtract: [new Date(), '$posts.createdAt'] },
                      24 * 3600000,
                    ],
                  },
                },
              ],
            },
            {
              $cond: [{ $in: ['$posts.account', '$followingIds'] }, 35, 0],
            },
          ],
        },
      },
    },
    { $sort: { 'posts.score': -1, 'posts.createdAt': -1 } },
    { $skip: offset },
    { $limit: limit },
    { $replaceRoot: { newRoot: '$posts' } },
  ];
};
