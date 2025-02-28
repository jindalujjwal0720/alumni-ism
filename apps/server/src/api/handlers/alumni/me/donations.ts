import { Model } from 'mongoose';
import { IPayment, PaymentCategory } from '../../../../types/models/payment';
import { RequestHandler } from 'express';
import Payment from '../../../../models/payment';

const getMyDonations =
  (paymentModel: Model<IPayment>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const donations = await paymentModel.find({
        account: id,
        category: PaymentCategory.DONATION,
      });
      res.status(200).json({ donations });
    } catch (err) {
      next(err);
    }
  };

export const get = getMyDonations(Payment);
