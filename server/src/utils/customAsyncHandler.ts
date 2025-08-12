import { type RequestHandler } from "express";

export const asyncHandler =
  (fn: Function): RequestHandler =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
