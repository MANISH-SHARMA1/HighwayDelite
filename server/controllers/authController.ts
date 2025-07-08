import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { error, success } from "../utils/responseWrapper";

// Signup Controller
export const signUpController = async (
  req: Request,
  res: Response
): Promise<any | undefined> => {
  try {
    const { formData } = req.body;

    if (!formData.name || !formData.email || !formData.otp || !formData.dob) {
      return res.send(error(400, "All fields are required."));
    }

    const oldUser = await User.findOne({ email: formData.email });

    if (oldUser && oldUser.googleId) {
      return res.send(
        error(
          409,
          "This email is already registered with Google. Please log in with Google."
        )
      );
    }

    if (oldUser && !oldUser.googleId) {
      return res.send(error(409, "User is already registered."));
    }

    const hashedOTP = await bcrypt.hash(formData.otp, 10);

    await User.create({
      name: formData.name,
      email: formData.email,
      otp: hashedOTP,
      dob: formData.dob,
    });

    return res.send(success(201, "User created successfully"));
  } catch (e) {
    return res.send(
      error(500, "An error occurred while processing your request.")
    );
  }
};

// Login Controller
export const signInController = async (
  req: Request,
  res: Response
): Promise<any | undefined> => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.send(error(400, "All fields are required."));
    }

    const user = await User.findOne({ email }).select("+otp");

    if (user?.googleId) {
      return res.send(
        error(
          409,

          "This email is logged in with Google. Please log in with Google."
        )
      );
    }

    if (!user) {
      return res.send(error(404, "User is not registered."));
    }

    const matched = await bcrypt.compare(otp, user.otp!);

    if (!matched) {
      return res.send(error(403, "Incorrect OTP."));
    }

    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(201, accessToken));
  } catch (e) {
    return res.send(error(401, "Something went wrong while login."));
  }
};

// Refresh Access Token
export const refreshAccessTokenController = async (
  req: Request,
  res: Response
): Promise<any | undefined> => {
  let refreshToken: string;

  refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    return res.send(error(401, "Refresh token in cookie is required."));
  }

  try {
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY!
    );
    const accessToken = generateAccessToken({ _id: decoded._id });

    return res.send(success(201, accessToken));
  } catch (e) {
    return res.send(error(401, "Invalid refresh token."));
  }
};

// Logout
export const signOutController = async (
  req: Request,
  res: Response
): Promise<any | undefined> => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "User Logged Out."));
  } catch (e) {
    res.send(error(500, "Something went wrong while logging out."));
  }
};

// Utility: Generate Tokens
const generateAccessToken = (data: any): string => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY!, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (data: any): string => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY!, {
    expiresIn: "30d",
  });
};
