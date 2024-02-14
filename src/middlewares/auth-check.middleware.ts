import {UserDTO} from '@/controllers/user/user.controller.ts';
import {HttpStatus} from '@/types/http-statuses.ts';
import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';

export type RequestWithUser = Request & {
  user: UserDTO | string;
}

export function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction): unknown {
  if (![ "GET", "POST", "PUT", "DELETE" ].includes(req.method)) next();

  try {
    const token = req.headers?.authorization?.split(" ")[1]; // bearer
    if (!token) return res.status(HttpStatus.CODE401).json({ message: "Не авторизован" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch {
    res.status(HttpStatus.CODE401).json({ message: "Не авторизован" });
  }
}
