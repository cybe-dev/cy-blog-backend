"use strict";

const postController = require("../controller/post"),
  express = require("express"),
  jwtVerify = require("../middleware/jwtVerify"),
  router = express.Router();

router.use(jwtVerify);

router.get("/", postController.index);
router.get("/count", postController.getCount);
router.get("/:slug", postController.get);
router.post("/", postController.insert);
router.put("/:id", postController.update);
router.delete("/:id", postController.destroy);

module.exports = router;
