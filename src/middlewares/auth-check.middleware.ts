import {HttpStatus} from '@/types/http-statuses.ts';
import {NextFunction, Request, Response} from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction): unknown {
  if (![ "GET", "POST", "PUT", "DELETE" ].includes(req.method)) next();
  try {
    const token = req.headers?.authorization?.split(" ")[1]; // bearer
    if (!token) return res.status(HttpStatus.CODE401).json({ message: "Не авторизован" });
    console.log('auth check middleware work!');
    //todo check user token
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    res.status(HttpStatus.CODE401).json({ message: "Не авторизован" });
  }
}
