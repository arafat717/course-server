import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (
  payload: { userId: Types.ObjectId; role: string; email: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
