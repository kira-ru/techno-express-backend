import {Roles, UserDTO, UserModel} from "@/controllers/user/user.types";
import {User} from '@/models/db';
import {JsonWebToken} from '@/service/token/token.interfaces';
import TokenService from '@/service/token/token.service';
import {Nullable} from "@/types/helpers";
import {Model} from 'sequelize';

export type UserData = {
  user?: Model<UserModel>,
  tokens?: JsonWebToken,
}

class UserService {
    private tokenService: typeof TokenService;

    constructor(tokenService: typeof TokenService) {
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
            void this.tokenService.save(tokens.refreshToken, +user.dataValues.id);
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
        void this.tokenService.save(tokens.refreshToken, +user.dataValues.id);
        return {user, tokens};
      } catch (e) {
        console.error(e);
        return null;
      }
    }

  public async logout(refreshToken: string): Promise<void> {
      await this.tokenService.delete(refreshToken);
  }

  public async refresh(refreshToken: string): Promise<UserData> {
   const userPayload =  await this.tokenService.verify<UserDTO>(refreshToken);
   if (!userPayload) return {tokens: undefined};

   const user: Model<UserModel> = await User.findByPk(userPayload.id);
   const tokens = this.tokenService.generateUserToken(
       user.dataValues.id,
       user.dataValues.email,
       user.dataValues.role,
   );
   void this.tokenService.save(tokens.refreshToken, +userPayload.id);
   return {user, tokens};
  }

  public async getUser(id: number): Promise<Model<UserModel> | null> {
      return User.findByPk(id);
  }
}

export default new UserService(
    TokenService
);
