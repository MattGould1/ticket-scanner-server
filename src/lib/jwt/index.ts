import jwt from "jsonwebtoken";
import { UserModelType } from "src/database/models/user";

// @TODO make this secret a env variable
export const JWT_SECRET = "your_secret_key";

// @TODO make better types for the payload
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
