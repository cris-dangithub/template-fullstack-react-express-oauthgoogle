import { Request } from 'express';
import { AsyncReqResNextFn, ReqResNextFn } from '../types/reqResHandler.types';

type CatchAsyncFn = <T extends Request = Request>(
  param: AsyncReqResNextFn<T>
) => ReqResNextFn<T>;

export const catchAsync: CatchAsyncFn = fn => {
  return (req, res, next) => {
    //* Esta siguiente linea es la magia, si hay error cae a la pila de errores (que seria la funcion globalHandleErrors)
    fn(req, res, next).catch(
      next // PASAREMOS ESTE ERROR A LA PILA DE ERRORES CON EL NEXT. //! "err => next(err)" es resumido por "next"
    );
  };
};
