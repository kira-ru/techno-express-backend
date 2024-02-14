import {User} from '@/models/db';
import {BaseErrorService} from '@/service/base-error.service.ts';
import UserService from '@/service/user.service.ts';
import bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';

export type UserDTO = {
  id: string,
  email: string,
  password: string,
  role: Roles,
}

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

class UserController {
  static generateUserToken(id: string, email: string, role: Roles): string {
    return jwt.sign(
        {
          id,
          email,
          role
        },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
  }

  async registration(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    const {
      email,
      password,
      role
    } = req.body as UserDTO;
    const {token, model: candidate} = await UserService.registration(email, password, role);
    if (candidate) return next(BaseErrorService.badRequest('Пользователь с таким email уже существует'));
    res.json({token});
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    const {
      email,
      password
    } = req.body as Omit<UserDTO, 'id' | 'role'>;
    const user = await User.findOne({ where: { email } }) as unknown as UserDTO;
    if (!user) return next(BaseErrorService.badRequest('Пользователь не найден'));
    if (!bcrypt.compareSync(password, user.password)) next(BaseErrorService.badRequest('Неверный логин или пароль')); // блефуем
    const token = UserController.generateUserToken.call(this, user.id, user.email, user.role);
    return res.json({ token });
  }

}

export default new UserController();

