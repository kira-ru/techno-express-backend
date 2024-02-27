import {BaseErrorService} from '@/service/base-error.service.ts';
import UserService from '@/service/user.service.ts';
import bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';
import {TokenService} from "@/service/token.service.ts";
import {UserDTO} from "@/controllers/user/user.types.ts";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {
            email,
            password,
        } = req.body;
        const userData = await UserService.registration(email, password);
        if (!userData) return next(BaseErrorService.internal('Что то пошло не так...'));
        if (userData.user && !userData.tokens) return next(BaseErrorService.badRequest('Пользователь с таким email уже существует'));
        res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: TokenService.REFRESH_TOKEN_EXPIRE_TIME, httpOnly: true});
        res.json({user: new UserDTO(userData.user.dataValues), tokens: userData.tokens});
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {
            email,
            password
        } = req.body;
        const userData = await UserService.login(email);
        if (!userData) return next(BaseErrorService.internal('Что то пошло не так...'));
        if (!userData.user) return next(BaseErrorService.badRequest('Пользователь не найден'));
        if (!bcrypt.compareSync(password, userData.user.dataValues.password))
            return next(BaseErrorService.badRequest('Неверный логин или пароль'));
        res.json({user: new UserDTO(userData.user.dataValues), token: userData.tokens});
    }

    // async auth(req: Request, res: Response, next: NextFunction): Promise<void> {}
}

export default new UserController();

