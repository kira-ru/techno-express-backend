import {Roles, UserModel} from "@/controllers/user/user.types.ts";
import {User} from '@/models/db';
import {JsonWebToken, TokenService} from "@/service/token.service.ts";
import {Nullable} from "@/types/helpers.ts";
import {Model} from 'sequelize';

export type UserData = {
  user?: Model<UserModel>,
  tokens?: JsonWebToken,
}

class UserService {
    private tokenService: TokenService;

    constructor(tokenService: TokenService) {
        this.tokenService = tokenService;
    }

    public async registration(email: string, password: string, role?: Roles): Promise<Nullable<UserData>> {
        try {
            const candidate = await User.findOne({where: {email}});
            if (candidate) return ({user: candidate});
            const hashPassword = await this.tokenService.passwordHash(password);
            const user = await User.create({
                email,
                role,
                password: hashPassword
            }) as Model<UserModel>;
            const tokens = this.tokenService.generateUserToken(
                user.dataValues.id,
                user.dataValues.email,
                user.dataValues.role
            );
            await this.tokenService.save(tokens.refreshToken, +user.dataValues.id);
            return {user, tokens};
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async login(email: string): Promise<Nullable<UserData>> {
      try {
        const user: Model<UserModel> = await User.findOne({ where: { email } });
        if (!user) return {user: undefined};
        const tokens = this.tokenService.generateUserToken(user.dataValues.id, user.dataValues.email, user.dataValues.role);
        return {user, tokens};
      } catch (e) {
        console.error(e);
        return null;
      }
    }

  public async logout(refreshToken: string): Promise<void> {
      await this.tokenService.delete(refreshToken);
  }
}

export default new UserService(
    new TokenService()
);
