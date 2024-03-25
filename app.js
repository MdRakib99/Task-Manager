const express = require("express");
const app = new express();
const router = require("./src/routes/api");
require("dotenv").config();
const morgan = require("morgan");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const cors = require("cors");
const hpp = require("hpp");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

//Middleware implement
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(hpp());

app.use(mongoSanitize());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);
//Databage

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.eq5zxrj.mongodb.net/ConceptualProject`
  );
  console.log("Database Connected");
}

main().catch((err) => console.log(err));

// let URI =
//   "mongodb+srv://<username>:<password>@cluster0.eq5zxrj.mongodb.net/TaskManagerRabbil";
// let OPTION = { user: "rakib", pass: "rakib1122", autoIndex: true };
// mongoose
//   .connect(URI, OPTION)
//   .then((res) => {
//     console.log("database connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//Route

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(200).json({ status: "success", data: "Backend Running" });
});

module.exports = app;
