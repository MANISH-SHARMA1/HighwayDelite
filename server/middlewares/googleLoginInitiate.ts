import { Request, Response, NextFunction } from "express";

const setGoogleRedirect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const redirectPath = (req.query.redirect as string) || "/";

  res.cookie("googleRedirect", redirectPath, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 5 * 60 * 1000,
  });

  next();
};

export default setGoogleRedirect;
