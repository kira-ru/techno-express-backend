import {UserDTO} from "@/controllers/user/user.types.ts";
import {BaseErrorService} from '@/service/base-error.service.ts';
import {TokenService} from "@/service/token.service.ts";
import UserService from '@/service/user.service.ts';
import bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';

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
        res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: TokenService.REFRESH_TOKEN_EXPIRE_TIME, httpOnly: true});
        res.json({user: new UserDTO(userData.user.dataValues), token: userData.tokens});
    }

    async logout(req: Request, res: Response): Promise<void> {
        const {refreshToken} = req.cookies;
        res.clearCookie('refreshToken');
        await UserService.logout(refreshToken);
        res.json({message: 'logout success'});
    }
}

export default new UserController();

