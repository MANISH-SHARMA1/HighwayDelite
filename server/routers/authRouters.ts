import { Router } from "express";
import {
  refreshAccessTokenController,
  signInController,
  signOutController,
  signUpController,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/refresh", refreshAccessTokenController);
router.get("/logout", signOutController);

export default router;
