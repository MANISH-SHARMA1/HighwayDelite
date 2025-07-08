import { Router } from "express";
import { getUser } from "../controllers/userController";
import requireUser from "../middlewares/requireUser";

const router = Router();

router.get("/getUser", requireUser, getUser);

export default router;
