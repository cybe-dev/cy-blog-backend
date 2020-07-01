"use strict";

const commentController = require("../controller/comment"),
  express = require("express"),
  jwtVerify = require("../middleware/jwtVerify"),
  router = express.Router();

router.get("/", jwtVerify, commentController.index);
router.get("/count", jwtVerify, commentController.getCount);
router.get("/:id", jwtVerify, commentController.get);
router.post("/", commentController.insert);
router.delete("/:id", jwtVerify, commentController.destroy);

module.exports = router;
