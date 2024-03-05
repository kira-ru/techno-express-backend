import {Roles} from "@/controllers/user/user.types.ts";
import {Token} from "@/models/db/token.ts";
import {JsonWebToken, JWTPayload, VerifyResult} from '@/service/token/token.interfaces.ts';
import {Nullable} from '@/types/helpers.ts';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";

export class TokenService {
  public static readonly REFRESH_TOKEN_EXPIRE_TIME = 24 * 60 * 60 * 1000;
  private static readonly ACCESS_TOKEN_EXPIRE_TIME = 60 * 5;

  public generateUserToken(id: string, email: string, role: Roles): JsonWebToken {
    const refreshToken = jwt.sign(
        {
          id,
          email,
          role
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: TokenService.REFRESH_TOKEN_EXPIRE_TIME }
    );
    const accessToken = jwt.sign(
        {
          id,
          email,
          role
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: TokenService.ACCESS_TOKEN_EXPIRE_TIME }
    );
    return {
      accessToken,
      refreshToken
    };
  }

  public async passwordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 5);
  }

  public async save(refreshToken: string, userId: number): Promise<void> {
    const tokenModel = await Token.findOne({ where: { UserId: userId } });
    if (tokenModel) {
      tokenModel['refreshToken'] = refreshToken;
      await tokenModel.save();
    } else {
      await Token.create({
        UserId: userId,
        refreshToken: refreshToken,
      });
    }
  }

  public async delete(refreshToken: string): Promise<Nullable<number>> {
    try {
      return Token.destroy({ where: { refreshToken } });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async verify<T>(refreshToken: string): Promise<Nullable<JWTPayload<T>>> {
    try {
      const token = await Token.findOne({where: {refreshToken}});
      const payload = this.tokenVerify<T>(refreshToken);
      if (payload.error || !token) return null;
      return payload.decoded;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public tokenVerify<T>(token: string, isRefresh=true): VerifyResult<T> {
      let jwtPayload!: VerifyResult<T>;
      jwt.verify(
          token,
          isRefresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_ACCESS_SECRET,
          (error, decoded) => {
        jwtPayload = {error, decoded: decoded as JWTPayload<T>};
      });
      return jwtPayload;
  }
}

export default new TokenService();
