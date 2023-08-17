import { NextFunction, Request, Response } from 'express';

export type ReqResNextArgs<T extends Request = Request> = [
  req: T,
  res: Response,
  next: NextFunction
];

export type ReqResNextFn<T extends Request = Request> = (
  ...params: ReqResNextArgs<T>
) => void;

export type AsyncReqResNextFn<T extends Request = Request> = (
  ...params: ReqResNextArgs<T>
) => Promise<void>;
