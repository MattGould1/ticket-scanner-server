import jwt from "jsonwebtoken";

// @TODO make this secret a env variable
export const JWT_SECRET = "your_secret_key";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): object | string => {
  return jwt.verify(token, JWT_SECRET);
};
