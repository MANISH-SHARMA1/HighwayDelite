import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { error } from "../utils/responseWrapper";

// Custom JWT payload type
interface TokenPayload {
  _id: string;
}

export const googleLoginController = async (req: Request, res: Response) => {
  passport.authenticate(
    "google",
    { session: false },
    async (err: any, user: any, info: any) => {
      if (err || !user) {
        return res.send(error(401, "Authentication failed."));
      }

      const accessToken = generateAccessToken({ _id: user._id });
      const refreshToken = generateRefreshToken({ _id: user._id });

      res.clearCookie("googleRedirect");

      return res.redirect(
        `${process.env.ORIGIN}/auth/google/success?accessToken=${accessToken}&refreshToken=${refreshToken}&redirect=/`
      );
    }
  )(req, res);
};

// Internal utility functions
const generateAccessToken = (data: TokenPayload): string => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY as string, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (data: TokenPayload): string => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY as string, {
    expiresIn: "30d",
  });
};
