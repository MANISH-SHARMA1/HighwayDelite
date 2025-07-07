const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const session = require("express-session");

// Routes

const app = express();

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

app.get("/", ({ req, res }: any) => {
  res.status(200).send("ok from server");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
