import jwt from 'jsonwebtoken';

export interface JsonWebToken {
  accessToken: string,
  refreshToken: string,
}

export interface TokenModel {
  refreshToken: string,
  userId: number,
  createAt: Date,
  updateAt: Date,
  id: number
}

export type JWTPayload<T> = jwt.JwtPayload & T;

export interface VerifyResult<T> {
  error: jwt.VerifyErrors,
  decoded: JWTPayload<T>
}
