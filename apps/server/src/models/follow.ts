import mongoose from 'mongoose';
import { IAlumniFollow } from '../types/models/follow';

const followSchema = new mongoose.Schema<IAlumniFollow>({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });

export const AlumniFollow = mongoose.model<IAlumniFollow>(
  'AlumniFollow',
  followSchema,
);
