import { Response } from 'express';
import { httpStatusCode } from '../enums/httpStatusCode';

interface IApiResponse<T> {
  res: Response;
  statusCode?: httpStatusCode;
  success?: boolean;
  message?: string;
  data?: T;
}

export const sendApiResponse = <T>({
  res,
  statusCode = httpStatusCode.OK,
  success = true,
  message,
  data,
}: IApiResponse<T>) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
