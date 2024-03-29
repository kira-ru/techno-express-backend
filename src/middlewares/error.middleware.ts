import {BaseErrorService} from '@/service/base-error.service';
import {NextFunction, Request, Response} from 'express';

export function errorMiddleware(err: BaseErrorService, req: Request, res: Response, next: NextFunction): Response<unknown, Record<string, unknown>> {
  if (err instanceof BaseErrorService) {
    return res.status(Number(err.status)).json({message: err.message});
  }
  next();
}
