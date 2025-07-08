import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { error } from "../utils/responseWrapper";
import User from "../models/User";

interface AuthenticatedRequest extends Request {
  _id?: string;
}

const requireUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.send(error(401, "Authorization header is required."));
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY as string
    ) as JwtPayload;

    req._id = decoded._id;

    const user = await User.findById(req._id);
    if (!user) {
      return res.send(error(404, "User not found."));
    }

    next();
  } catch (e) {
    return res.send(error(401, "Invalid access key."));
  }
};

export default requireUser;
