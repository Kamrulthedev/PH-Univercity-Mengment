import config from "../../config";
import jwt from "jsonwebtoken";

export const createToken = (
  JwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string
) => {
  jwt.sign(JwtPayload, secret, {
    expiresIn,
  });
};
