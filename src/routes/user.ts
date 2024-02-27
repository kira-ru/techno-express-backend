import UserController from '@/controllers/user/user.controller.ts';
import {authMiddleware} from '@/middlewares/auth-check.middleware.ts';
import {Router} from 'express';

enum Routes {
  REGISTRATION = '/registration',
  LOGIN = '/login',
  AUTH = '/auth',
}

export const UserRouter = Router();
UserRouter.post(Routes.REGISTRATION, UserController.registration);
UserRouter.post(Routes.LOGIN, UserController.login);
UserRouter.get(Routes.AUTH, authMiddleware);
