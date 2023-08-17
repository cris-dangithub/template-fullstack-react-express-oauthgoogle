import { Response } from 'express';

type IAppSuccessArgs = [
  res: Response,
  statusCode: number,
  message?: string,
  extras?: object
];

type IAppSuccess = (...props: IAppSuccessArgs) => void;

export const appSuccess: IAppSuccess = (...args) => {
  const [res, statusCode, message, extras = {}] = args;
  // Control de parámetros
  return res.status(statusCode).json({
    status: 'success',
    message,
    ...extras,
  });
};

export default appSuccess;
