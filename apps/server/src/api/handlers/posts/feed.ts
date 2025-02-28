import { Model, PipelineStage } from 'mongoose';
import { IPost } from '../../../types/models/post';
import { RequestHandler } from 'express';
import { Post } from '../../../models/post';

const listMyFeedPosts =
  (postModel: Model<IPost>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const { id: userId } = req.user;

      // Definition of the pipeline for the user's feed
      // - Match all the posts that are not authored by the user
      // - populate the isLiked field with the user's like status
      // - populate the latestComment field with the latest comment and the user who posted it
      // - populate the author field with the author's details
      // : personal details(name, profilePicture), professional details(designation, currentCompany)
      // - Add likes and comments count
      // - Sort the posts by the most recent first
      // - Limit the number of posts to the specified limit

      const matchNotAuthoredByUserStages: PipelineStage[] = [
        {
          $match: {
            account: { $ne: userId },
          },
        },
      ];

      const populateLikeStatusStages: PipelineStage[] = [
        {
          $lookup: {
            from: 'postlikes',
            let: { postId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$post', '$$postId'] },
                      { $eq: ['$account', userId] },
                    ],
                  },
                },
              },
              { $limit: 1 }, // Optimize by limiting to 1 result
            ],
            as: 'userLikes',
          },
        },
        {
          $addFields: {
            isLiked: { $gt: [{ $size: '$userLikes' }, 0] },
          },
        },
        {
          $project: {
            userLikes: 0, // Remove the temporary field
          },
        },
      ];

      const populateLatestCommentStages: PipelineStage[] = [
        {
          $lookup: {
            from: 'postcomments',
            let: { postId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$post', '$$postId'] },
                },
              },
              {
                $sort: { createdAt: -1 },
              },
              { $limit: 1 },
              // Get comment author details
              {
                $lookup: {
                  from: 'users',
                  let: { authorId: '$account' },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$_id', '$$authorId'] },
                      },
                    },
                    {
                      $project: {
                        _id: 1,
                        username: 1,
                        name: 1,
                      },
                    },
                  ],
                  as: 'authorDetails',
                },
              },
              {
                $unwind: {
                  path: '$authorDetails',
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  _id: 1,
                  body: 1,
                  createdAt: 1,
                  author: '$authorDetails',
                },
              },
            ],
            as: 'latestComment',
          },
        },
        {
          $unwind: {
            path: '$latestComment',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      const populateAuthorDetailsStage: PipelineStage[] = [
        // Personal details lookup
        {
          $lookup: {
            from: 'alumnipersonaldetails',
            let: { authorId: '$account' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$account', '$$authorId'] },
                },
              },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  profilePicture: 1,
                },
              },
            ],
            as: 'personalDetails',
          },
        },
        {
          $unwind: {
            path: '$personalDetails',
            preserveNullAndEmptyArrays: true,
          },
        },

        // Professional details lookup
        {
          $lookup: {
            from: 'alumniprofessionaldetails',
            let: { authorId: '$account' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$account', '$$authorId'] },
                },
              },
              {
                $project: {
                  _id: 1,
                  designation: 1,
                  currentCompany: 1,
                },
              },
            ],
            as: 'professionalDetails',
          },
        },
        {
          $unwind: {
            path: '$professionalDetails',
            preserveNullAndEmptyArrays: true,
          },
        },

        // Combine into structured author object
        {
          $addFields: {
            author: {
              personal: {
                name: '$personalDetails.name',
                profilePicture: '$personalDetails.profilePicture',
              },
              professional: {
                designation: '$professionalDetails.designation',
                currentCompany: '$professionalDetails.currentCompany',
              },
            },
          },
        },

        // Remove temporary fields
        {
          $project: {
            personalDetails: 0,
            professionalDetails: 0,
          },
        },
      ];

      const postAnalyticsDetailsStages: PipelineStage[] = [
        // Add likes and comments count
        {
          $lookup: {
            from: 'postanalytics',
            localField: '_id',
            foreignField: 'post',
            as: 'analytics',
          },
        },
        {
          $unwind: {
            path: '$analytics',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            likesCount: { $ifNull: ['$analytics.likes', 0] },
            commentsCount: { $ifNull: ['$analytics.comments', 0] },
          },
        },
        {
          $project: {
            analytics: 0,
          },
        },
      ];

      const sortAndPaginationStages: PipelineStage[] = [
        // Sort by most recent first
        {
          $sort: {
            createdAt: -1,
            // Secondary sort for consistent pagination
            _id: -1,
          },
        },

        // Skip for pagination
        {
          $skip: +offset,
        },

        // Limit number of results
        {
          $limit: +limit,
        },
      ];

      const pipeline: PipelineStage[] = [
        // Match all the posts that are not authored by the user
        ...matchNotAuthoredByUserStages,
        // populate the isLiked field with the user's like status
        ...populateLikeStatusStages,
        // populate the latestComment field with the latest comment and the user who posted it
        ...populateLatestCommentStages,
        // populate the author field with the author's details
        // populate the author's personal and professional details
        ...populateAuthorDetailsStage,
        // Add likes and comments count
        ...postAnalyticsDetailsStages,
        // Sort the posts by the most recent first
        // Limit the number of posts to the specified limit
        ...sortAndPaginationStages,
      ];

      const posts = await postModel.aggregate(pipeline);

      res.status(200).send({ posts });
    } catch (err) {
      next(err);
    }
  };

export const get = listMyFeedPosts(Post);
