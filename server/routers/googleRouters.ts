import { Request, Response, Router } from "express";
import passport from "passport";
import { googleLoginController } from "../controllers/authGoogleController";
import googleLoginInitiate from "../middlewares/googleLoginInitiate";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  googleLoginInitiate,
  googleLoginController
);

router.get("/signout", (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect(`${process.env.ORIGIN}/signin`);
  });
});

router.get("/current_user", (req: Request, res: Response) => {
  res.send(req.user);
});

export default router;
