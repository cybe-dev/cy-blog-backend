"use strict";

const publicController = require("../controller/public"),
  express = require("express"),
  router = express.Router();

router.get("/blog-info", publicController.blogInfo);
router.get("/post", publicController.allPost);
router.get("/post/:slug", publicController.getPost);
router.get("/category", publicController.allCategory);
router.get("/category/:slug", publicController.categoryBySlug);

module.exports = router;
