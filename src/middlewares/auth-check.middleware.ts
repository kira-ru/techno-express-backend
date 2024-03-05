import {UserDTO} from '@/controllers/user/user.types.ts';
import {BaseErrorService} from '@/service/base-error.service.ts';
import TokenService from '@/service/token/token.service.ts';
import {HttpStatus} from '@/types/http-statuses.ts';
import {NextFunction, Request, Response} from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction): unknown {
  try {
    const accessToken = req.headers?.authorization;
    const result = accessToken && TokenService.tokenVerify<UserDTO>(accessToken, false);
    if (!accessToken || result.error) {
      return next(BaseErrorService.unauthorized(result.error.message ?? ''));
    }
    req.user = result.decoded;
  } catch {
    res.status(HttpStatus.CODE401).json({ message: "Не авторизован" });
  }
}
