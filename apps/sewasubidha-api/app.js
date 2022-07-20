var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./services/mongoDB");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const serviceListRouter = require("./routes/serviceList");
const serviceRouter = require("./routes/service");

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
app.use("/services-list", serviceListRouter);
app.use("/services", serviceRouter);

module.exports = app;
