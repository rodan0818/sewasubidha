var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./services/mongoDB");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const serviceListRouter = require("./routes/serviceList");

var app = express();
connectDB()
  .then((db) => {
    console.log("Succefully connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to the MongoDB");
  });
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/service-list", serviceListRouter);

module.exports = app;
