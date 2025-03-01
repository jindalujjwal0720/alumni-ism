import { RequestHandler } from 'express';
import { Model } from 'mongoose';
import { AppError, CommonErrors } from '../../../../../utils/errors';
import {
  AlumniVerificationStatus,
  IAlumni,
} from '../../../../../types/models/alumni';
import { Alumni } from '../../../../../models/alumni';
import { env } from '../../../../../config';

const SPECIAL_OCCASSION_DIGITS = env.alumniCard.specialOccassionDigits;

const generateRandomDigits = (length: number): string => {
  return Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, '0');
};

const generateCardNumber = (yearOfGraduation: number): string => {
  // 16 digit card number with properties
  // first 4 digits are for special occassions, if any
  // last 4 digits are for the year of graduation
  // remaining 8 digits are random
  const specialOccassionDigits =
    SPECIAL_OCCASSION_DIGITS ?? generateRandomDigits(4);
  const yearOfGraduationDigits = yearOfGraduation.toString().slice(-4);
  const randomDigits = generateRandomDigits(8);

  return `${specialOccassionDigits}${randomDigits}${yearOfGraduationDigits}`;
};

const verifyAlumni =
  (alumniModel: Model<IAlumni>): RequestHandler =>
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const alumni = await alumniModel
        .findById(id)
        .select('isVerified ucn education.yearOfGraduation');
      if (!alumni) {
        throw new AppError(
          CommonErrors.NotFound.name,
          CommonErrors.NotFound.statusCode,
          'Alumni not found',
        );
      }

      alumni.verificationStatus = AlumniVerificationStatus.VERIFIED;

      // generate unique card number, if not already generated
      // IMPORTANT: This condition should NOT be removed
      // as it is required to generate unique non-repeating card numbers
      if (!alumni.ucn) {
        const maxTries = 5;
        let tries = 0;
        let ucn: string;

        do {
          // TODO: Add graduation year
          ucn = generateCardNumber(1926);
          tries++;
        } while ((await alumniModel.findOne({ ucn })) && tries < maxTries);

        if (tries === maxTries) {
          throw new AppError(
            CommonErrors.InternalServerError.name,
            CommonErrors.InternalServerError.statusCode,
            'Failed to generate unique card number. Please try again.',
          );
        }

        alumni.ucn = ucn;
      }

      alumni.rejectionReason = undefined;
      await alumni.save();

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

export const post = verifyAlumni(Alumni);
