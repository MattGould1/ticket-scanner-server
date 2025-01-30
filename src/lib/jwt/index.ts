import jwt from "jsonwebtoken";
import { UserModelType } from "src/database/models/user";
import environment from "../environment";

export const JWT_SECRET = environment().JWT_SECRET;

type TokenPayload = UserModelType;
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export type VerifiedUserToken = TokenPayload & {
  iat: number; // 1737974276;
  exp: number; // 1737977876;
};
export const verifyToken = (token: string): VerifiedUserToken => {
  return jwt.verify(token, JWT_SECRET) as VerifiedUserToken;
};
