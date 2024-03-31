const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const categoryRouter = require("./routers/categoryRouter");
const itemRouter = require("./routers/itemRouters");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

dotenv.config("./.env");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/item", itemRouter);
// app.use("/posts", postsRouter);
app.get("/", (req, res) => {
  res.status(200).send("OK from Server");
});

const PORT = process.env.PORT || 4001;

dbConnect();
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
