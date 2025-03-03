import { Model } from 'mongoose';
import { RequestHandler } from 'express';
import { generatePostsForFeedPipeline } from '../../../constants/queries/alumni-feed-posts';
import { IAlumni } from '../../../types/models/alumni';
import { Alumni } from '../../../models/alumni';

const listMyFeedPosts =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      let { limit = 10, page = 1 } = req.query;
      const { id: userId } = req.user;

      limit = Math.min(Math.max(Number(limit) || 10, 1), 50); // Limit between 1 and 50, default 10
      const offset = Math.max(Number(page) - 1 || 0, 0) * limit; // Offset >= 0

      const pipeline = generatePostsForFeedPipeline({ userId, limit, offset });
      const posts = await alumniModel.aggregate(pipeline);

      res.status(200).send({ posts });
    } catch (err) {
      next(err);
    }
  };

export const get = listMyFeedPosts(Alumni);
