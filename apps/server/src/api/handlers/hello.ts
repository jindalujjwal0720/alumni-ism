import { RequestHandler } from 'express';

export const get: RequestHandler = async (req, res) => {
  res.json({
    message: 'Welcome to the API!',
    browser: req.useragent?.browser,
    os: req.useragent?.os,
    platform: req.useragent?.platform,
    source: req.useragent?.source,
  });
};
