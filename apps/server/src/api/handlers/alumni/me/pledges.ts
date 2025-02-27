import { RequestHandler } from 'express';
import { IPledge } from '../../../../types/models/pledge';
import Pledge from '../../../../models/pledge';
import { Model } from 'mongoose';

const getMyPledges =
  (pledgeModel: Model<IPledge>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const pledges = await pledgeModel.find({ account: id });
      res.status(200).json({ pledges });
    } catch (err) {
      next(err);
    }
  };

const createPledge =
  (pledgeModel: Model<IPledge>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const { amountInINR, amountInWords } = req.body;
      const pledge = new pledgeModel({
        account: id,
        amountInINR,
        amountInWords,
      });
      await pledge.save();
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = getMyPledges(Pledge);
export const post = createPledge(Pledge);
