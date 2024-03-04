import UserController from '@/controllers/user/user.controller.ts';
import {authMiddleware} from '@/middlewares/auth-check.middleware.ts';
import {Router} from 'express';

enum Routes {
  REGISTRATION = '/registration',
  LOGIN = '/login',
  LOGOUT = '/logout',
  AUTH = '/auth',
}

export const UserRouter = Router();
UserRouter.post(Routes.REGISTRATION, UserController.registration);
UserRouter.post(Routes.LOGIN, UserController.login);
UserRouter.post(Routes.LOGOUT, UserController.logout);
UserRouter.get(Routes.AUTH, authMiddleware);