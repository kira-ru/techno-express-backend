import {AuthController} from '@/controllers/auth.ts'
import {Router} from 'express'

enum Routes {
  REGISTRATION = '/registration',
  LOGIN = '/login',
  AUTH = '/auth',
}

export const AuthRouter = Router();
AuthRouter.post(Routes.REGISTRATION)
AuthRouter.post(Routes.LOGIN)
AuthRouter.get(Routes.AUTH, AuthController.authentication)
