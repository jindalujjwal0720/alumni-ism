import { RequestHandler } from 'express';
import { IPayment } from '../../../../../types/models/payment';
import Payment from '../../../../../models/payment';
import { Model } from 'mongoose';

const listPayments =
  (paymentModel: Model<IPayment>): RequestHandler =>
  async (req, res, next) => {
    try {
      const payments = await paymentModel.find();
      res.status(200).json({ payments });
    } catch (err) {
      next(err);
    }
  };

export const get = listPayments(Payment);
