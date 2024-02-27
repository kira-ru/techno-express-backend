import jwt from "jsonwebtoken";
import process from "process";
import bcrypt from "bcrypt";
import {Token} from "@/models/db/token";
import {Model} from "sequelize";
import {Roles} from "@/controllers/user/user.types.ts";

export interface JsonWebToken {
    accessToken: string,
    refreshToken: string,
}

export interface TokenModel {
    refreshToken: string,
    userId: number,
}

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
            process.env.SECRET_KEY,
            {expiresIn: TokenService.REFRESH_TOKEN_EXPIRE_TIME}
        );
        const accessToken = jwt.sign(
            {
                id,
                email,
                role
            },
            process.env.SECRET_KEY,
            {expiresIn: TokenService.ACCESS_TOKEN_EXPIRE_TIME}
        );
        return {accessToken, refreshToken};
    }

    public async passwordHash(password: string): Promise<string> {
        return await bcrypt.hash(password, 5);
    }

    public async save(refreshToken: string, userId: number): Promise<void> {
        const tokenModel: Model<TokenModel> = await Token.findOne({where: {UserId: userId}});
        if (tokenModel) {
            tokenModel.dataValues.refreshToken = refreshToken;
            await tokenModel.save();
        } else {
            await Token.create({
                UserId: userId,
                refreshToken: refreshToken,
            });
        }
    }
}
