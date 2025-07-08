import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import dbConnect from "./dbConnect";
import passport from "passport";

// Load environment variables
dotenv.config();

// Passport config
import "./passport-setup";

// Routes
const app = express();
import authRouters from "./routers/authRouters";
import googleRouters from "./routers/googleRouters";
import userRouter from "./routers/userRouter";
import notesRouter from "./routers/notesRouter";

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://highway-delite-eight.vercel.app",
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/jwtAuth", authRouters);
app.use("/auth", googleRouters);
app.use("/user", userRouter);
app.use("/notes", notesRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("ok from server");
});

const PORT = process.env.PORT || 4000;

dbConnect();

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
