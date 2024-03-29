import UserController from '@/controllers/user/user.controller';
import {authMiddleware} from '@/middlewares/auth-check.middleware';
import {Router} from 'express';

enum Routes {
  REGISTRATION = '/registration',
  LOGIN = '/login',
  LOGOUT = '/logout',
  REFRESH = '/refresh',
  AUTH = '/auth',
}

export const UserRouter = Router();
UserRouter.get('/:id', authMiddleware, UserController.getUser);
UserRouter.post(Routes.REGISTRATION, UserController.registration);
UserRouter.post(Routes.LOGIN, UserController.login);
UserRouter.post(Routes.LOGOUT, UserController.logout);
UserRouter.post(Routes.REFRESH, UserController.refresh);
