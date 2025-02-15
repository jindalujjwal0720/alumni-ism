import { RequestHandler } from 'express';
import Offer from '../../../../models/offer';
import { IOffer } from '../../../../types/models/offer';
import { Model } from 'mongoose';

const getOffers =
  (offerModel: Model<IOffer>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { user } = req;
      const offers = await offerModel.find({ partner: user.id });
      res.json({ offers });
    } catch (err) {
      next(err);
    }
  };

const createOffer =
  (offerModel: Model<IOffer>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { user } = req;
      const { description, tags } = req.body;
      const offer = new offerModel({
        partner: user.id,
        description,
        tags,
      });
      await offer.save();
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  };

export const get = getOffers(Offer);
export const post = createOffer(Offer);
