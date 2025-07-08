import { Request, Response } from "express";
import User from "../models/User";
import { success, error } from "../utils/responseWrapper";

// Extend the Request interface to include _id
interface AuthenticatedRequest extends Request {
  _id?: string;
}

export const getUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const user = await User.findById(req._id);

    return res.send(success(200, user));
  } catch (err) {
    return res.send(
      error(500, "Something went wrong while fetching user info")
    );
  }
};
