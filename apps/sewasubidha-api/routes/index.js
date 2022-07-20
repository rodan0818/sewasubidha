var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/health", function (req, res, next) {
  return res.status(200).send("healthy :)");
});

module.exports = router;
